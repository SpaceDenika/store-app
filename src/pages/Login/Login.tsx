/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import styles from './Login.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

	const navigate = useNavigate();

  interface IFormState {
    email: string;
    password: string;
  }

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

  	// const jwt = localStorage.getItem('token');
  	// console.log(jwt);

  	// const loginData = {
  	// 	email: formState.email,
  	// 	password: formState.password
  	// };

  	// const response = await fetch('https://purpleschool.ru/pizza-api-demo/auth/login', {
  	// 	method: 'POST',
  	// 	headers: {
  	// 		'Content-Type': 'application/json'
  	// 	},
  	// 	body: JSON.stringify(loginData)
  	// });

  	// const data = await response.json();

  	// if (jwt) {
  	// 	navigate('/');
  	// }
  	// console.log(data);
  };

  return (
  	<section className={styles['login']}>
  		<div className={styles['login__container']}>
  			<header>
  				<Heading>Вход</Heading>
  			</header>
  			<form className={styles['form']} onSubmit={submitHandler}>
  				<div className={styles['form__input-wrapper']}>
  					<Label htmlFor='email'>Ваш email</Label>
  					<Input id='email' type='email' placeholder='Email' name='email' onChange={changeHandler} value={formState.email} />
  				</div>
  				<div className={styles['form__input-wrapper']}>
  					<Label htmlFor='password'>Ваш пароль</Label>
  					<Input id="password" type='password' placeholder='Пароль' name='password' onChange={changeHandler} value={formState.password} />
  				</div>
  				<Button large>Вход</Button>
  			</form>
  			<Footer question='Нет акканута?' linkText='Зарегистрироваться' linkPath='/auth/registr' />
  		</div>
  	</section>
  );
}

export default Login;