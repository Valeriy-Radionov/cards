import React from 'react';
import style from "./Header.module.scss"
import {AppRootStateType, useAppSelector} from "../../bll/store";
import {LinearProgress} from "@mui/material";
import {ProfileBar} from "./profileBar/ProfileBar";

export const Header = () => {
    const status = useAppSelector((state: AppRootStateType) => state.app.status)

    return (
        <div className={style.container}>
            <div className={style.blockLink}>
                <ProfileBar/>
            </div>
            {status === "loading" && <LinearProgress/>}
        </div>
    )
}
