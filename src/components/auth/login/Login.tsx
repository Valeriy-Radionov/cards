import React, {useState} from 'react';
import style from "./Login.module.scss"
import SuperInputText from "../../../common/components/superInput/SuperInputText";
import {useFormik} from "formik";
import SuperButton from "../../../common/components/button/SuperButton";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../../common/routes/Routs";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {loginTC} from "../../../bll/authReducer";
import {Checkbox} from "@mui/material";
import {validatorPassword} from "../../../common/utils/errors-utils";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [togglePassword, setTogglePassword] = useState<boolean>(false)

    const onClickShowPassword = () => {
        setTogglePassword(!togglePassword)
    }
    const classNameBtn = togglePassword ? style.passwordHidden : style.password

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            validatorPassword(values, errors)
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={style.container}>
            <div className={style.blockAuth}>
                <h1>Sign in</h1>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    {/*email*/}
                    <div className={style.inputForm}>
                        <label>email</label>
                        <SuperInputText {...formik.getFieldProps("email")}/>
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}
                    </div>
                    {/*password*/}
                    <div className={style.inputForm}>
                        <label>password</label>
                        <div className={style.wrapperBtn}>
                            <input
                                type={togglePassword ? "text" : "password"} {...formik.getFieldProps("password")}/>
                            <button type={"button"} className={classNameBtn} onClick={onClickShowPassword}></button>
                        </div>
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                    </div>
                    {/*remember me*/}
                    <div className={style.containerCheckBox}>
                        <Checkbox
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps("rememberMe")}
                            inputProps={{'aria-label': 'controlled'}}
                        />Remember me
                    </div>
                    <NavLink to={PATH.RECOVERY} className={style.forgotLink}>Forgot Password</NavLink>
                    <SuperButton type={'submit'}>Sign In</SuperButton>
                    <label className={style.descriptionInfo}>Already have an account?</label>
                    <NavLink to={PATH.REGISTR} className={style.signUpLink}>Sign Up</NavLink>
                </form>
            </div>
        </div>
    );
};