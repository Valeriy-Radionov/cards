import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import style from "./ProfileBar.module.scss"
import {useAppSelector} from "../../../bll/store";
import {ProfileBarSettings} from "./profileBarSettings/ProfileBarSettings";
import defaultAva from "../../../assets/image/headerImg/userProfile.webp";

type ProfileBarPropsType = {}

export const ProfileBar: React.FC<ProfileBarPropsType> = () => {
    const nameUser = useAppSelector(state => state.profile.user?.name)
    const avatarUser = useAppSelector(state => state.profile?.user?.avatar)
    const isAuth = useAppSelector(state => state.auth.isLoggedIn)

    const [expand, setExpand] = useState<boolean>(false)
    const [isAvaBroken, setIsAvaBroken] = useState<boolean>(false)

    // const userAvatar = isAvaBroken ? defaultAva : avatarUser
    const userAvatar = avatarUser ? avatarUser : defaultAva


    const errorAvatarHandler = (e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src ? setIsAvaBroken(false) : setIsAvaBroken(true)
        e.currentTarget.src = defaultAva
    }

    const userSettingsHandler = () => {
        setExpand(prev => !prev)
    }

    const spanBarRef = useRef(null)

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (e.target !== spanBarRef.current) {
                return setExpand(false)
            }
        }
        document.body.addEventListener("click", closeDropdown)
        return () => document.body.removeEventListener("click", closeDropdown)
    }, [])

    return (
        isAuth ?
            <div className={style.wrapper}>
                <div className={style.container}>
            <span ref={spanBarRef} id={"nameUser"} className={style.nickName}
                  onClick={userSettingsHandler}>{nameUser}</span>
                    <img id={"nameUser"} className={style.avatar} src={userAvatar} alt={"X_X"}
                         onError={errorAvatarHandler}/>
                    {expand ? <ProfileBarSettings onClickHandler={userSettingsHandler}/> : null}
                </div>
            </div> : <span>You are not authorization</span>
    );
};

