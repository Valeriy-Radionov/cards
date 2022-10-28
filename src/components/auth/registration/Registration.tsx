import React, {useState} from 'react';
import {useFormik} from "formik";
import style from "../login/Login.module.scss";
import SuperInputText from "../../../common/components/superInput/SuperInputText";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../common/routes/Routs";
import SuperButton from "../../../common/components/button/SuperButton";
import {Login} from "../login/Login";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {registrationTC} from "../../../bll/authReducer";
import {validatorPassword} from "../../../common/utils/errors-utils";


export type FormikErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}

export type FormikInitialValues = {
    email: string
    password: string
    confirmedPassword: string
}
export const Registration = () => {

    let errorMessage = useAppSelector(state => state.app.error)
    let isRegistrationSuccessful = useAppSelector(state => state.auth.isRegistrationSuccessful)
    let dispatch = useAppDispatch

    const [togglePassword, setTogglePassword] = useState<boolean>(false)
    const classNameBtn = togglePassword ? style.passwordHidden : style.password

    const onClickShowPassword = () => {
        setTogglePassword(!togglePassword)
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmedPassword: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            validatorPassword(values, errors)
            if (!values.confirmedPassword) {
                errors.confirmedPassword = "required"
            } else if (values.confirmedPassword.length < 8) {
                errors.confirmedPassword = "Password must be more 8 symbols"
            } else if (values.password !== values.confirmedPassword) {
                errors.confirmedPassword = "password does not match"
            }
            return errors;
        },
        onSubmit: values => {
            let newRegistration = {
                email: values.email,
                password: values.password
            }
            dispatch(registrationTC(newRegistration))
            formik.resetForm()
        },
    });

    return (
        !isRegistrationSuccessful ?
            <div className={style.container}>
                <div className={style.blockAuth}>
                    <h1>Sign Up</h1>
                    <form className={style.form} onSubmit={formik.handleSubmit}>
                        {/*email*/}
                        <div className={style.inputForm}>
                            <label>email</label>
                            <SuperInputText
                                {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>
                                {formik.errors.email}</div>}
                        </div>
                        {/*password*/}
                        <div className={style.inputForm}>
                            <label>password</label>
                            <div className={style.wrapperBtn}>
                                <input
                                    type={togglePassword ? "text" : "password"} {...formik.getFieldProps("password")}/>
                                <button type={"button"} className={classNameBtn} onClick={onClickShowPassword}></button>
                            </div>
                            {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>
                                {formik.errors.password}</div>}
                        </div>
                        {/*confirm password*/}
                        <div className={style.inputForm}>
                            <label>confirm password</label>
                            <div className={style.wrapperBtn}>
                                <input
                                    type={togglePassword ? "text" : "password"} {...formik.getFieldProps("confirmedPassword")}/>
                                <button type={"button"} className={classNameBtn} onClick={onClickShowPassword}></button>
                            </div>
                            {formik.touched.confirmedPassword && formik.errors.confirmedPassword &&
                                <div style={{color: 'red'}}>
                                    {formik.errors.confirmedPassword}</div>}
                        </div>
                        <SuperButton type={'submit'}>Sign Up</SuperButton>
                        <label className={style.descriptionInfo}>Already have an account?</label>
                        <NavLink to={PATH.LOGIN} className={style.signUpLink}>Sign in</NavLink>
                        <div style={{color: 'red'}}>{errorMessage}</div>
                    </form>
                </div>
            </div>
            :
            <Login/>
    );
};

