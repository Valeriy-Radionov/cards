import React, {ChangeEvent, useRef, useState} from 'react';
import s from './Profile.module.scss'
import ProfileRename from "./profileRename/ProfileRename";
import {updateUserTC} from "../../bll/profileReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {UpdateUserType} from "../../api/auth/auth-api";
import updateAva from '../../assets/image/Union.svg'
import defaultAva from '../../assets/image/headerImg/userProfile.webp'
import {backgroundImg} from "../../common/utils/utilitsBg";
import {logoutTC} from "../../bll/authReducer";
import {LinkArrow} from "../../common/components/link/LinkArrow";
import {convertFileToBase64} from "../../common/utils/convertFileTobase64";

export const Profile = () => {
    const dispatch = useAppDispatch
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user = useAppSelector(state => state.profile.user)
    const appStatus = useAppSelector(state => state.app.status)
    const disable = appStatus === "loading"

    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const avatar = isAvaBroken ? defaultAva : user?.avatar!

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateUserTC({avatar: file64}))
                })
            } else {
                alert("Incorrect image format")
            }
        }
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
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
                    <img className={s.avatar} src={avatar} onError={errorHandler}/>
                    {/*update avatar block*/}
                    <div className={s.blockUpdatePhoto}>
                        <label htmlFor={"addPhoto"} style={backgroundImg(updateAva)} className={s.updatePhoto}></label>
                        <input id={"addPhoto"} type={"file"} style={{display: "none"}} accept={"image/*"}
                               onChange={uploadHandler} disabled={disable}></input>
                    </div>
                </div>
                <ProfileRename name={user ? user.name : ''} changeTask={updateUsers} disabled={disable}/>
                <div className={s.email}>
                    <span>{user ? user.email : ''}</span>
                </div>
                <button onClick={logout} className={s.logoutBtn} disabled={disable}>Log Out</button>
            </div>
        </div>
    )
}


