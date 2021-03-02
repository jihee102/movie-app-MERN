import Axios from 'axios';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { USER_SERVER } from '../../Config';

import './ReactForm.css';

function ReactForm(props) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      lastname: data.lastname,
    };
    Axios.post(`${USER_SERVER}/register`, userData).then((response) => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        alert('Fail to register');
      }
    });
  }; // your form submit function which will invoke after successful validation

  console.log(watch('email')); // you can watch individual input by pass the name of the input
  const password = useRef();
  password.current = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        name='email'
        type='email'
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <p>Email field is required</p>}
      {errors.email && errors.email.type === 'pattern' && (
        <p>Email is not valid</p>
      )}
      <label>Name</label>
      <input name='name' ref={register({ required: true, maxLength: 10 })} />
      {errors.name && errors.name.type === 'required' && (
        <p>Name field is required</p>
      )}
      {errors.name && errors.name.type === 'maxLenghth' && (
        <p>Name exceed maximun length. Maximun is 10 letters </p>
      )}

      <label>Last Name</label>
      <input
        name='lastname'
        ref={register({ required: true, maxLength: 15 })}
      />
      {errors.lastname && errors.lastname.type === 'required' && (
        <p>Last Name field is required</p>
      )}
      {errors.lastname && errors.lastname.type === 'maxLenghth' && (
        <p>Last Name exceed maximun length. Maximun is 15 letters </p>
      )}
      <label>Password</label>
      <input
        name='password'
        type='password'
        ref={register({ required: true, mimLength: 6 })}
      />
      {errors.password && errors.password.type === 'required' && (
        <p>Password field is required</p>
      )}
      {errors.password && errors.password.type === 'mimLength' && (
        <p>Password must have at least 6 characters </p>
      )}

      <label>Password Confirm</label>
      <input
        name='password_confirm'
        type='password'
        ref={register({
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      {errors.password_confirm &&
        errors.password_confirm.type === 'required' && (
          <p>Password field is required</p>
        )}
      {errors.password_confirm &&
        errors.password_confirm.type === 'validate' && (
          <p>Password do not match</p>
        )}
      <input type='submit' />
    </form>
  );
}

export default ReactForm;
