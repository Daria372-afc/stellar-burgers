import { FC } from 'react';

import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileMenu } from '@components';
import { SyntheticEvent } from 'react';
import { ProfileUIProps } from './type';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  handleLogout,
  activeField,
  setActiveField,
  success,
  errorField
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            value={formValue.name}
            name={'name'}
            size={'default'}
            icon={activeField === 'name' ? 'CloseIcon' : 'EditIcon'}
            onFocus={() => setActiveField('name')}
            error={errorField === 'name'}
            errorText={
              errorField === 'name' && updateUserError ? updateUserError : ''
            }
            onIconClick={() =>
              handleInputChange({
                target: { name: 'name', value: '' }
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          {errorField === 'name' && success && (
            <p style={{ color: 'red' }}>Изменения сохранены!</p>
          )}
        </div>
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            size={'default'}
            icon={activeField === 'email' ? 'CloseIcon' : 'EditIcon'}
            onFocus={() => setActiveField('email')}
            error={errorField === 'email'}
            errorText={
              errorField === 'email' && updateUserError ? updateUserError : ''
            }
            onIconClick={() =>
              handleInputChange({
                target: { name: 'email', value: '' }
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          {errorField === 'email' && success && (
            <p style={{ color: 'red' }}>Изменения сохранены!</p>
          )}
        </div>
        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            size={'default'}
            icon={activeField === 'password' ? 'CloseIcon' : 'EditIcon'}
            onFocus={() => setActiveField('password')}
            error={errorField === 'password'}
            errorText={
              errorField === 'password' && updateUserError
                ? updateUserError
                : ''
            }
            onIconClick={() =>
              handleInputChange({
                target: { name: 'password', value: '' }
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />

          {errorField === 'password' && success && (
            <p style={{ color: 'red' }}>Изменения сохранены!</p>
          )}
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>
        )}
      </>
    </form>
  </main>
);
