import React, {ChangeEvent} from "react";
import {AppRootActionsType} from "../../../bll/store";
import {Dispatch} from "redux";
import {setAppErrorAC} from "../../../bll/appReducer";

export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}

export const uploadHandler = (e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<AppRootActionsType>, setState?: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]
        if (file.size < 4000000) {
            convertFileToBase64(file, (file64: string) => {
                setState && setState(file64)
            })
        } else {
            dispatch(setAppErrorAC("Image must be < 4Mb"))
        }
    }
}

