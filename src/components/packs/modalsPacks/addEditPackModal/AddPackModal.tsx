import React, {ChangeEvent, useState} from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import styleModal from "./AddPackModal.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {addNewPackTC, updatePackTC} from "../../../../bll/packsReducer";
import stroke from "../../../../assets/image/Edit.svg"
import {convertFileToBase64} from "../../../../common/utils/convertFileTobase64";
import {updateUserTC} from "../../../../bll/profileReducer";
import style from "../../../../common/components/button/SuperButton.module.scss";
import {backgroundImg} from "../../../../common/utils/utilitsBg";

type AddPackModalPropsType = {
    id?: string
    isAddEditPack: "edit" | "add"
}

export const AddPackModal: React.FC<AddPackModalPropsType> = ({id, isAddEditPack}) => {
    const namePack = useAppSelector(state => state.packs.cardPacks).filter(pack => id ? pack._id === id : pack)[0]?.name
    const dispatch = useAppDispatch
    const [titlePack, setTitlePack] = useState<string>(namePack || "")
    const [privatePack, setPrivatePack] = useState<boolean>(false)
    const [image, setImage] = useState<string>("")

    const addNewPacks = () => {
        dispatch(addNewPackTC(titlePack, privatePack, image))
        setTitlePack("")
    }

    const changeTitlePackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTitlePack(value)
    }

    const privatePackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const privatePack = e.currentTarget.checked
        setPrivatePack(privatePack)
    }
    const editPack = () => {
        dispatch(updatePackTC(id!, titlePack, privatePack))
    }
    const editImg = () => {
        return <img src={stroke} alt={''}/>
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    // dispatch(updateUserTC({avatar: file64}))
                    setImage(file64)
                })
            } else {
                alert("Big file")
            }
        }
    }

    return (
        <div>

            <ModalWindow namePreviousBtn={isAddEditPack === "add" ? "Add new pack" : editImg()}
                         titleModal={isAddEditPack === "add" ? "Add new pack" : "Edit Pack"}
                         actionSaveDeleteBtn={isAddEditPack === "add" ? addNewPacks : editPack}
                         isSaveDeleteModal={"Save"}
                         isEdit={isAddEditPack}
            >
                <div className={styleModal.bodyBlock}>
                    <span className={styleModal.titleBlock}>Name pack</span>
                    <input value={titlePack} className={styleModal.InputBlock} onChange={changeTitlePackHandler}/>
                    {image && <img src={image} alt={"X_X"}/>}
                    <div className={styleModal.blockUpdatePhoto}>
                        <label htmlFor={"choseImg"} className={`${style.buttonDef} ${styleModal.updatePhoto}`}>Add
                            image</label>
                        <input id={"choseImg"} type={"file"} style={{display: "none"}} accept={"image/*"}
                               onChange={uploadHandler}></input>
                    </div>
                    <div className={styleModal.selectionBlock}>
                        <input type={"checkbox"} className={styleModal.checkbox} onChange={privatePackHandler}/>
                        <label className={styleModal.description}>Private pack</label>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

