import { useActionState, useEffect, useRef } from 'react';
import * as z from 'zod';
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
import { isErrorWithMessage, isFetchBaseQueryError } from '@/helpers/errorsTypeGuards';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { IActionState } from './LoginPage.interface';
import { ROUTE_PATHS } from '@/router/routes';

const loginSchema = z.object({
  email: z.email('Неверный адрес электронной почты'),
  password: z.string().min(5, 'Слишком короткий размер: пароль должен содержать не менее 5 символов.'),
});

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

  const initialState: IActionState = { error: null, success: false };

  const submitForm = async (_prevState: IActionState, formData: FormData): Promise<IActionState> => {
    const formFields = Object.fromEntries(formData);
    const parsedformFields = loginSchema.safeParse(formFields);

    if (!parsedformFields.success) {
      const tree = z.treeifyError(parsedformFields.error);
      return {
        error: '',
        fieldErrors: {
          email: tree.properties?.email?.errors?.[0],
          password: tree.properties?.password?.errors?.[0],
        },
        fields: formFields,
        success: false,
      };
    } else {
      try {
        const result = await login(parsedformFields.data).unwrap();
        dispatch(setToken(result));
        return { error: null, fields: formFields, success: true };
      } catch (err: unknown) {
        if (isFetchBaseQueryError(err)) {
          if (isErrorWithMessage(err)) {
            return { error: err.message, fields: formFields, success: false };
          }
          return { error: `Ошибка сервера ${err.status}`, fields: formFields, success: false };
        }

        if (err instanceof Error) {
          return { error: err.message, fields: formFields, success: false };
        }
        return { error: 'Неизвестная ошибка', fields: formFields, success: false };
      }
    }
  };

  const [loginFormState, loginFormAction, isPending] = useActionState(submitForm, initialState);

  useEffect(() => {
    if (!isPending && loginFormState.fieldErrors) {
      if (loginFormState.fieldErrors.email) {
        emailRef.current?.focus();
      } else if (loginFormState.fieldErrors.password) {
        passwordRef.current?.focus();
      }
    }
  }, [loginFormState.fieldErrors?.email, loginFormState.fieldErrors?.password, isPending]);

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
                defaultValue={loginFormState.fields?.email as string}
                hasError={!!loginFormState.fieldErrors?.email}
                disabled={isPending}
              />
              {loginFormState.fieldErrors?.email && <ErrorMessage>{loginFormState.fieldErrors?.email}</ErrorMessage>}
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
                defaultValue={loginFormState.fields?.password as string}
                hasError={!!loginFormState.fieldErrors?.password}
                disabled={isPending}
              />
              {loginFormState.fieldErrors?.password && (
                <ErrorMessage>{loginFormState.fieldErrors.password}</ErrorMessage>
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
