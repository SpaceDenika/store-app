/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEventHandler, FormEventHandler, useActionState, useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store/store';
import { useLoginMutation } from '@/store/user/user.api';
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
  password: string;
}

interface IError {
  error: string;
  message: string;
  statusCode: number;
}

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const [login, { data, isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const doLogin = async (prevState: any, formData: FormData) => {
    try {
      const res = await login(Object.fromEntries(formData)).unwrap();
      dispatch(setToken(res));
      return { error: null };
    } catch (error: any) {
      return { error: error.data.message || 'Error' };
    }
  };

  const [state, loginAction, isPending] = useActionState(doLogin, { error: null });

  const [formState, setFormState] = useState<IFormState>({
    email: '',
    password: '',
  });

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login(formState);
  };

  return (
    <section className={styles['login']}>
      <div className={styles['login__container']}>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <header>
              <Heading>Вход</Heading>
            </header>
            <form className={styles['form']} action={loginAction}>
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
                  value={formState.email}
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
                  value={formState.password}
                />
              </div>
              {isError && <p className={styles['form__error']}>{errorMessage}</p>}
              <Button large>Вход</Button>
            </form>
            <Footer question="Нет акканута?" linkText="Зарегистрироваться" linkPath={ROUTE_PATHS.AUTH.REGISTER} />
          </>
        )}
      </div>
    </section>
  );
}

export default Login;
