import React, {ChangeEvent, useState} from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import styleModal from "./AddPackModal.module.scss";
import {AppRootActionsType, AppRootStateType, useAppDispatch, useAppSelector} from "../../../../bll/store";
import {addNewPackTC, updatePackTC} from "../../../../bll/packsReducer";
import stroke from "../../../../assets/image/Edit.svg"
import style from "../../../../components/packs/modalsPacks/addEditPackModal/AddPackModal.module.scss";
import styleBtn from "../../../../common/components/button/SuperButton.module.scss"
import {convertFileToBase64, uploadHandler} from "../../../../common/utils/workWithImages/uploadImageFileHandler";
import packDefCover from "../../../../assets/image/defaultCover.svg";
import {ThunkDispatch} from "redux-thunk";
import {updateUserTC} from "../../../../bll/profileReducer";
import {setAppErrorAC} from "../../../../bll/appReducer";

type AddPackModalPropsType = {
    id?: string
    isAddEditPack: "edit" | "add"
    packImg?: string
}

export const AddPackModal: React.FC<AddPackModalPropsType> = ({id, isAddEditPack, packImg}) => {

    const namePack = useAppSelector(state => state.packs.cardPacks).filter(pack => id ? pack._id === id : pack)[0]?.name
    const dispatch = useAppDispatch
    const [titlePack, setTitlePack] = useState<string>(namePack || "")
    const [privatePack, setPrivatePack] = useState<boolean>(false)
    const [image, setImage] = useState<string>("")
    const editImagePack = packImg ? (image ? image : packImg) : (image ? image : packDefCover)

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
        dispatch(updatePackTC(id!, titlePack, privatePack, image))
    }
    const editImg = () => {
        return <img src={stroke} alt={""}/>
    }

    return (
        <div>

            <ModalWindow setTitlePack={setTitlePack}
                         namePreviousBtn={isAddEditPack === "add" ? "Add new pack" : editImg()}
                         titleModal={isAddEditPack === "add" ? "Add new pack" : "Edit Pack"}
                         actionSaveDeleteBtn={isAddEditPack === "add" ? addNewPacks : editPack}
                         isSaveDeleteModal={"Save"}
                         isEdit={isAddEditPack}
            >
                <div className={styleModal.bodyBlock}>
                    <span className={styleModal.titleBlock}>Name pack</span>
                    <input value={titlePack} className={styleModal.InputBlock} onChange={changeTitlePackHandler}/>
                    {isAddEditPack === "add" ? <img src={image ? image : packDefCover} alt={"X_X"}
                                                    style={{
                                                        width: "150px",
                                                        height: "100px",
                                                        margin: "0 auto",
                                                        padding: "5px"
                                                    }}/> : <img src={editImagePack} style={{
                        width: "150px",
                        height: "100px",
                        margin: "0 auto",
                        padding: "5px"
                    }}/>}
                    <div className={style.updatePhotoBlock}>
                        <label htmlFor={"choseImg"}
                               className={`${style.updatePhoto} ${styleBtn.buttonDef}`}>Add
                            image</label>
                        <input id={"choseImg"} type={"file"} style={{display: "none"}} accept={"image/*"}
                               onChange={e => uploadHandler(e, dispatch, setImage, false)}></input>
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

