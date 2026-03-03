/* eslint-disable no-mixed-spaces-and-tabs */
import { useRegisterMutation } from '@/store/user/user.api';
import styles from './Register.module.css';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store/store';
import { setToken } from '@/store/user/user.slice';
import Loader from '@/components/Loader/Loader';
import Heading from '@/components/Heading/Heading';
import Label from '@/components/Label/Label';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Footer from '@/components/Footer/Footer';
import { ROUTE_PATHS } from '@/router/routes';

interface IFormState {
  email: string;
  password: string | number;
  name: string;
}

interface IError {
  error: string;
  message: string;
  statusCode: number;
}

function Register() {
  const [register, { data, isLoading, error, isError }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage((error.data as IError).message);
    }
  }, [error]);

  useEffect(() => {
    dispatch(setToken(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const [formState, setFormState] = useState<IFormState>({
    email: '',
    password: '',
    name: '',
  });

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await register(formState);
  };

  return (
    <section className={styles['login']}>
      <div className={styles['login__container']}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <header>
              <Heading>Регистрация</Heading>
            </header>
            <form className={styles['form']} onSubmit={submitHandler}>
              <div className={styles['form__input-wrapper']}>
                <Label htmlFor="email">Ваш email</Label>
                <Input
                  className={isError ? styles['form__input_error'] : ''}
                  required
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={changeHandler}
                  value={formState?.email}
                />
              </div>
              <div className={styles['form__input-wrapper']}>
                <Label htmlFor="password">Ваш пароль</Label>
                <Input
                  className={isError ? styles['form__input_error'] : ''}
                  required
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  onChange={changeHandler}
                  value={formState?.password}
                />
              </div>
              <div className={styles['form__input-wrapper']}>
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  className={isError ? styles['form__input_error'] : ''}
                  required
                  id="name"
                  type="text"
                  placeholder="Имя"
                  name="name"
                  onChange={changeHandler}
                  value={formState?.name}
                />
              </div>
              {isError && <p className={styles['form__error']}>{errorMessage}</p>}
              <Button large>Зарегистрироваться</Button>
            </form>
            <Footer question="Есть акканут?" linkText="Войти" linkPath={ROUTE_PATHS.AUTH.LOGIN} />
          </>
        )}
      </div>
    </section>
  );
}

export default Register;
