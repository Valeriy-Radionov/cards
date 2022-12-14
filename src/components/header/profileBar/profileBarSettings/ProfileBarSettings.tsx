import React from 'react';
import style from "./ProfileBarSettings.module.scss"
import {backgroundImg} from "../../../../common/utils/utilitsBg";
import imgProfile from "../../../../assets/image/headerImg/userprofileIcon.svg"
import imgLogOut from "../../../../assets/image/headerImg/logoutprofileLogOut.svg"
import {NavLink} from "react-router-dom";
import {logoutTC} from "../../../../bll/authReducer";
import {useAppDispatch} from "../../../../bll/store";

type ProfileBarSettingsType = {
    onClickHandler: () => void
}
export const ProfileBarSettings: React.FC<ProfileBarSettingsType> = ({onClickHandler}) => {

    const dispatch = useAppDispatch
    const logout = () => {
        onClickHandler()
        dispatch(logoutTC())
    }

    return (
        <div className={style.container}>
            <div className={style.settings}>
                <div className={style.items} style={backgroundImg(imgProfile)}></div>
                <NavLink onClick={onClickHandler} style={{color: "white"}} to={'/profile'}>Profile</NavLink>
            </div>
            <div className={style.settings}>
                <div className={style.items} style={backgroundImg(imgLogOut)}></div>
                <span onClick={logout}>Lof out</span>
            </div>
        </div>
    );
};

