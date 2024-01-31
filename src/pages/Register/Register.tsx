/* eslint-disable no-mixed-spaces-and-tabs */
import styles from './Register.module.css';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useRegisterMutation } from '../../store/user/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setToken } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

interface IFormState {
  email: string;
  password: string | number;
  name: string;
}

function Register() {

	const [register, { data, isLoading }] = useRegisterMutation();
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const navigate = useNavigate();

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
		name: ''
	});

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
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
				{!isLoading && 
        <>
        	<header>
        		<Heading>Регистрация</Heading>
        	</header>
        	<form className={styles['form']} onSubmit={submitHandler}>
        		<div className={styles['form__input-wrapper']}>
        			<Label htmlFor='email'>Ваш email</Label>
        			<Input id='email' type='email' placeholder='Email' name='email' onChange={changeHandler} value={formState?.email} />
        		</div>
        		<div className={styles['form__input-wrapper']}>
        			<Label htmlFor='password'>Ваш пароль</Label>
        			<Input id="password" type='password' placeholder='Пароль' name='password' onChange={changeHandler} value={formState?.password} />
        		</div>
        		<div className={styles['form__input-wrapper']}>
        			<Label htmlFor='name'>Ваше имя</Label>
        			<Input id="name" type='text' placeholder='Имя' name='name' onChange={changeHandler} value={formState?.name} />
        		</div>
        		<Button large>Зарегистрироваться</Button>
        	</form>
        	<Footer question='Есть акканут?' linkText='Войти' linkPath='/auth/login' />
        </>}
			</div>
		</section>
	);
}

export default Register;