import { useRegisterMutation } from '@/store/user/user.api';
import styles from './RegisterPage.module.css';
import { useActionState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store/store';
import { setToken } from '@/store/user/user.slice';
import Heading from '@/components/Heading/Heading';
import Label from '@/components/Label/Label';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Footer from '@/components/Footer/Footer';
import { ROUTE_PATHS } from '@/router/routes';
import { IRegisterFormState, registerSchema } from './RegisterPage.interface';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { handleErrorAction } from '@/helpers/handleErrorAction';
import { validateSchema } from '@/helpers/validateSchema';

function RegisterPage() {
  const [register] = useRegisterMutation();
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const initialState: IRegisterFormState = {
    error: null,
    success: false,
  };

  const submitForm = async (_prevState: IRegisterFormState, formData: FormData): Promise<IRegisterFormState> => {
    const validatedFormData = validateSchema(registerSchema, formData);

    if (!validatedFormData.success) {
      return validatedFormData.errorResponse;
    } else {
      try {
        const result = await register(validatedFormData.data).unwrap();
        dispatch(setToken(result));
        return validatedFormData.successResponse;
      } catch (err: unknown) {
        return handleErrorAction(err, validatedFormData.successResponse.fields);
      }
    }
  };

  const [registerFormState, registerFormAction, isPending] = useActionState(submitForm, initialState);

  useEffect(() => {
    if (!isPending && registerFormState.errorFields) {
      if (registerFormState.errorFields.email) {
        emailRef.current?.focus();
      } else if (registerFormState.errorFields.password) {
        passwordRef.current?.focus();
      } else if (registerFormState.errorFields.name) {
        nameRef.current?.focus();
      }
    }
  }, [
    isPending,
    registerFormState.errorFields?.email,
    registerFormState.errorFields?.password,
    registerFormState.errorFields?.name,
  ]);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  return (
    <section className={styles['login']}>
      <div className={styles['login__container']}>
        <>
          <header>
            <Heading>Регистрация</Heading>
          </header>
          <form className={styles['form']} action={registerFormAction}>
            <div className={styles['form__input-wrapper']}>
              <Label htmlFor="email">Ваш email</Label>
              <Input
                required
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                hasError={!!registerFormState.errorFields?.email}
                defaultValue={typeof registerFormState.fields?.email === 'string' ? registerFormState.fields.email : ''}
              />
              {registerFormState.errorFields?.email && (
                <ErrorMessage>{registerFormState.errorFields?.email}</ErrorMessage>
              )}
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
                hasError={!!registerFormState.errorFields?.password}
                defaultValue={
                  typeof registerFormState.fields?.password === 'string' ? registerFormState.fields.password : ''
                }
              />
              {registerFormState.errorFields?.password && (
                <ErrorMessage>{registerFormState.errorFields?.password}</ErrorMessage>
              )}
            </div>
            <div className={styles['form__input-wrapper']}>
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                required
                ref={nameRef}
                id="name"
                type="text"
                placeholder="Имя"
                name="name"
                hasError={!!registerFormState.errorFields?.name}
                defaultValue={typeof registerFormState.fields?.name === 'string' ? registerFormState.fields.name : ''}
              />
              {registerFormState.errorFields?.name && (
                <ErrorMessage>{registerFormState.errorFields?.name}</ErrorMessage>
              )}
            </div>
            {registerFormState.error && <ErrorMessage>{registerFormState.error}</ErrorMessage>}
            <Button isLoading={isPending} large>
              Зарегистрироваться
            </Button>
          </form>
          <Footer question="Есть аккаунт?" linkText="Войти" linkPath={ROUTE_PATHS.AUTH.LOGIN} />
        </>
      </div>
    </section>
  );
}

export default RegisterPage;
