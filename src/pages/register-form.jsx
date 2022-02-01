import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import BDFormInput from '../components/form/input.jsx';
import ImgAvatar from '../components/form/img-avatar.jsx';

import { apiStartCall } from '../store/actions.js';
import { testAvatarSaved } from '../store/slices/user.js';
import { register } from '../store/end-points/user.js';
import RegisterSchema from '../validations/register-schema.js';

const RegisterForm = ({setCurrentPage}) => {
    const imgAvatar = useRef()
    const dispatch = useDispatch();
    const registerForm = useFormik({
        validateOnBlur: true,
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate:(values) => {
            let errors = {};
            const result = RegisterSchema.validate(values,{abortEarly: false});
            if(result.error) {
                result.error.details.forEach(errorItem => {
                    errors[errorItem.context.label] = errorItem.message;
                });
            }
            return errors;
        },
        onSubmit: values => {
            let registerData = {};
            const didNotPick = imgAvatar.current.getUserAvatar().current.props.image.includes('https://');
            if(didNotPick) {
                registerData = { ...values };
            } else {
                const avatar = imgAvatar.current.getUserAvatar().current.getImage().toDataURL();
                registerData = {
                    ...values,
                    avatar
                };

                //for testing only save avatar in memory (redux)
                dispatch({ type: testAvatarSaved.type, payload: {avatar} });
            }

            dispatch({type: apiStartCall.type, payload: register(null, null, null, registerData)});
        },
    });
    return <>
        <ImgAvatar mode="register" ref={imgAvatar} />
        <form onSubmit={registerForm.handleSubmit}>
            <BDFormInput id="firstName" name="firstName" type="text" label="first name" value={registerForm.values.firstName} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} errors={registerForm.errors} touched={registerForm.touched} />
            <BDFormInput id="lastName" name="lastName" type="text" label="last name" value={registerForm.values.lastName} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} errors={registerForm.errors} touched={registerForm.touched} />
            <BDFormInput id="email" name="email" type="text" label="email" value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} errors={registerForm.errors} touched={registerForm.touched} />
            <BDFormInput id="password" name="password" type="password" label="password" value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} errors={registerForm.errors} touched={registerForm.touched} />
            <BDFormInput id="password_confirm" name="passwordConfirm" type="password" label="confirm password" value={registerForm.values.passwordConfirm} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} errors={registerForm.errors} touched={registerForm.touched} />
            <button type='submit' className='font-ssp font-regular text-4xl bg-primary shadow-secondary text-white px-8 py-4 rounded-[0.4rem] uppercase w-full' disabled={!registerForm.isValid}>sign up</button>
        </form>
        <button className='font-ssp font-regular text-4xl mb-12 mt-14' onClick={()=>setCurrentPage('user')}>have account - sign in</button>
    </>
};

export default RegisterForm;