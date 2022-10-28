import {Dispatch} from "redux";
import {AppRootActionsType} from "../../bll/store";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../bll/appReducer";
import {FormikConfig, FormikErrors} from "formik";
import {FormikErrorType, FormikInitialValues} from "../../components/auth/registration/Registration";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch<AppRootActionsType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response?.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
        console.log(error)
    }
    dispatch((setAppStatusAC('failed')))
}

export const validatorPassword = (values: any, errors: any) => {
    if (!values.email) {
        errors.email = "required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = "required"
    } else if (values.password.length < 8) {
        errors.password = "Password must be more 8 symbols"
    }
}