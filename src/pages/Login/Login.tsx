/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useLoginMutation } from '../../store/user/user.api';
import { setToken } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

interface IFormState {
  email: string;
  password: string;
}

function Login() {

	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const [login, { data, isLoading }] = useLoginMutation();
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
  	password: ''
	});

	const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
  	setFormState({
  		...formState,
  		[e.target.name]: e.target.value
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
  			{!isLoading && 
        <>
        	<header>
        		<Heading>Вход</Heading>
        	</header>
        	<form className={styles['form']} onSubmit={submitHandler}>
        		<div className={styles['form__input-wrapper']}>
        			<Label htmlFor='email'>Ваш email</Label>
        			<Input required id='email' type='email' placeholder='Email' name='email' onChange={changeHandler} value={formState.email} />
        		</div>
        		<div className={styles['form__input-wrapper']}>
        			<Label htmlFor='password'>Ваш пароль</Label>
        			<Input required id="password" type='password' placeholder='Пароль' name='password' onChange={changeHandler} value={formState.password} />
        		</div>
        		<Button large>Вход</Button>
        	</form>
        	<Footer question='Нет акканута?' linkText='Зарегистрироваться' linkPath='/auth/register' />
        </>}
  		</div>
  	</section>
	);
}

export default Login;