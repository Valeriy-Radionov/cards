import React, {ChangeEvent, useRef } from 'react';
import s from './Profile.module.scss'
import ProfileRename from "./profileRename/ProfileRename";
import {  updateUserTC} from "../../bll/profileReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {UpdateUserType} from "../../api/auth/auth-api";
import updateAva from '../../assets/image/Union.svg'
import {backgroundImg} from "../../common/utils/utilitsBg";
import {logoutTC} from "../../bll/authReducer";
import {LinkArrow} from "../../common/components/link/LinkArrow";

export const Profile = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user = useAppSelector(state => state.profile.user)

    const inputRef = useRef<HTMLInputElement>(null)
    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)
        }
    }

    const logout = () => {
        dispatch(logoutTC())
    }
    const updateUsers = (model: UpdateUserType) => {
        dispatch(updateUserTC(model))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.container}>
            <LinkArrow className={s.link} to={'/packs'} name={'Back to Packs List'}/>
            <div className={s.block}>
                <h1>Personal information</h1>
                <div className={s.imgBlock}>
                    <div className={s.avatar} style={backgroundImg(user? user.avatar || updateAva : '')}></div>
                    {/*update avatar block*/}
                    <div className={s.blockUpdatePhoto}>
                        <button onClick={selectFileHandler} style={backgroundImg(updateAva)} className={s.updatePhoto}></button>
                        <input ref={inputRef} type={"file"} style={{display: "none"}} accept={"image/*"} onChange={uploadHandler}></input>
                    </div>
                </div>
                <ProfileRename name={user?  user.name : ''} changeTask={updateUsers}/>
                <div className={s.email}>
                    <span>{user? user.email : ''}</span>
                </div>
                <button onClick={logout} className={s.logoutBtn}>Log Out</button>
            </div>
        </div>
    )
}


