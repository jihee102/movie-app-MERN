import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';

function LoginReactForm(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser(userData))
      .then((response) => {
        if (response.payload.loginSuccess) {
          window.localStorage.setItem('userId', response.payload.userId);
          if (rememberMe === true) {
            window.localStorage.setItem('rememberMe', data.email);
          } else {
            localStorage.removeItem('rememberMe');
          }
          props.history.push('/');
        } else {
          alert('Check out your Account or Password again');
        }
      })
      .catch((err) => {
        alert('Check out your Account or Password again');
      });
  }; // your form submit function which will invoke after successful validation
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <label>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Enter your email'
          value={initialEmail != '' ? initialEmail : watch('email')}
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>Email field is required</p>}
        {errors.email && errors.email.type === 'pattern' && (
          <p>Email is not valid</p>
        )}
        <label>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Enter your password'
          ref={register({ required: true, mimLength: 6 })}
        />
        {errors.passwsnord && errors.password.type === 'required' && (
          <p>Password field is required</p>
        )}
        {errors.password && errors.password.type === 'mimLength' && (
          <p>Password must have at least 6 characters </p>
        )}
        <div className='login-form'>
          <div>
            <input
              type='checkbox'
              name='checkbox'
              onChange={handleRememberMe}
              checked={rememberMe}
            />
            <label for='checkbox'>Remember me</label>
          </div>
          <a className='login-form-forgot' href='/reset_user'>
            forgot password
          </a>
        </div>
        <input type='submit' />
        Or <a href='/register'>register now!</a>
      </form>
    </>
  );
}

export default LoginReactForm;
