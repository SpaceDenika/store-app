import { useActionState, useEffect, useRef } from 'react';
import styles from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store/store';
import { useLoginMutation } from '@/store/user/user.api';
import { setToken } from '@/store/user/user.slice';
import Heading from '@/components/Heading/Heading';
import Label from '@/components/Label/Label';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Footer from '@/components/Footer/Footer';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { ILoginFormState, loginSchema } from './LoginPage.interface';
import { ROUTE_PATHS } from '@/router/routes';
import { handleErrorAction } from '@/helpers/handleErrorAction';
import { validateSchema } from '@/helpers/validateSchema';

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const initialState: ILoginFormState = { error: null, success: false };

  const submitForm = async (_prevState: ILoginFormState, formData: FormData): Promise<ILoginFormState> => {
    const validatedFormData = validateSchema(loginSchema, formData);

    if (!validatedFormData.success) {
      return validatedFormData.errorResponse;
    } else {
      try {
        const result = await login(validatedFormData.data).unwrap();
        dispatch(setToken(result));
        return validatedFormData.successResponse;
      } catch (err: unknown) {
        return handleErrorAction(err, validatedFormData.successResponse.fields);
      }
    }
  };

  const [loginFormState, loginFormAction, isPending] = useActionState(submitForm, initialState);

  useEffect(() => {
    if (!isPending && loginFormState.errorFields) {
      if (loginFormState.errorFields.email) {
        emailRef.current?.focus();
      } else if (loginFormState.errorFields.password) {
        passwordRef.current?.focus();
      }
    }
  }, [loginFormState.errorFields?.email, loginFormState.errorFields?.password, isPending]);

  return (
    <section className={styles['login']}>
      <div className={styles['login__container']}>
        <>
          <header>
            <Heading>Вход</Heading>
          </header>
          <form className={styles['form']} action={loginFormAction}>
            <div className={styles['form__input-wrapper']}>
              <Label htmlFor="email">Ваш email</Label>
              <Input
                required
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={typeof loginFormState.fields?.email === 'string' ? loginFormState.fields?.email : ''}
                hasError={!!loginFormState.errorFields?.email}
                disabled={isPending}
              />
              {loginFormState.errorFields?.email && <ErrorMessage>{loginFormState.errorFields?.email}</ErrorMessage>}
            </div>
            <div className={styles['form__input-wrapper']}>
              <Label htmlFor="password">Ваш пароль</Label>
              <Input
                required
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="Пароль"
                name="password"
                defaultValue={
                  typeof loginFormState.fields?.password === 'string' ? loginFormState.fields?.password : ''
                }
                hasError={!!loginFormState.errorFields?.password}
                disabled={isPending}
              />
              {loginFormState.errorFields?.password && (
                <ErrorMessage>{loginFormState.errorFields.password}</ErrorMessage>
              )}
            </div>
            {loginFormState.error && <ErrorMessage>{loginFormState.error}</ErrorMessage>}
            <Button isLoading={isPending} large>
              Вход
            </Button>
          </form>
          <Footer question="Нет акканута?" linkText="Зарегистрироваться" linkPath={ROUTE_PATHS.AUTH.REGISTER} />
        </>
      </div>
    </section>
  );
}

export default LoginPage;
