import React from 'react';
import style from './EmailSentPage.module.scss'
import emailImg from "../../../../assets/image/email.png";
import SuperButton from "../../../../common/components/button/SuperButton";
import {useNavigate} from 'react-router-dom';
import {PATH} from "../../../../common/routes/Routs";

export const EmailSentPage = () => {
    const navigate = useNavigate()
    const redirectHandler = () => {
        navigate(PATH.LOGIN)
    }

    return (
        <>
            <h1 style={{margin: "0 0 29px"}}>Check Email</h1>
            <img className={style.emailImg} src={emailImg} alt="email img"/>
            <p className={style.mainDescription}>We’ve sent an Email with instructions to
                example@mail.com</p>
            <SuperButton style={{width: "100%"}} onClick={redirectHandler}>Back to login</SuperButton>
        </>
    );
};