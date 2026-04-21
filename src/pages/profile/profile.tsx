import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';
import { ChangeEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };

  isFormChanged: boolean;

  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;

  handleLogout: () => void;

  activeField: string | null;
  setActiveField: (value: string | null) => void;

  updateUserError?: string | null;
  success?: boolean;
};

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const user = useSelector((state) => state.user.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorField, setErrorField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    !!user &&
    (formValue.name !== user.name ||
      formValue.email !== user.email ||
      formValue.password !== '');

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!validateEmail(formValue.email)) {
      setError('Ой, произошла ошибка!');

      if (formValue.email !== user?.email) {
        setErrorField('email');
      }

      return;
    }

    const data: any = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password) {
      data.password = formValue.password;
    }

    dispatch(updateUser(data)).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSuccess(true);

        if (formValue.name !== user?.name) {
          setErrorField('name');
        } else if (formValue.email !== user?.email) {
          setErrorField('email');
        } else if (formValue.password) {
          setErrorField('password');
        }

        setFormValue((prev) => ({
          ...prev,
          password: ''
        }));
      } else {
        setError('Ой, произошла ошибка!');
      }
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleLogout={handleLogout}
      activeField={activeField}
      setActiveField={setActiveField}
      updateUserError={error || undefined}
      success={success}
      errorField={errorField}
    />
  );
};
