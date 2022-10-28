import React, {ChangeEvent, useState} from 'react';
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import styleModal from "./AddPackModal.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {addNewPackTC, updatePackTC} from "../../../../bll/packsReducer";
import stroke from "../../../../assets/image/Edit.svg"
import {uploadHandler} from "../../../../common/utils/workWithImages/uploadImageFileHandler";
import packDefCover from "../../../../assets/image/defaultCover.svg";
import {Button} from "@mui/material";


type AddPackModalPropsType = {
    id?: string
    isAddEditPack: "edit" | "add"
    packImg?: string
}

export const AddPackModal: React.FC<AddPackModalPropsType> = ({id, isAddEditPack, packImg}) => {

    const namePack = useAppSelector(state => state.packs.cardPacks).filter(pack => id ? pack._id === id : pack)[0]?.name
    const dispatch = useAppDispatch

    const packInputTitle = namePack ? namePack : ""
    const [titlePack, setTitlePack] = useState<string>(packInputTitle)
    const [privatePack, setPrivatePack] = useState<boolean>(false)

    const editImagePack = packImg ? packImg : packDefCover
    const [image, setImage] = useState(editImagePack)

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

            <ModalWindow namePreviousBtn={isAddEditPack === "add" ? "Add new pack" : editImg()}
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
                                                    }}/> : <img src={image} style={{
                        width: "150px",
                        height: "100px",
                        margin: "0 auto",
                        padding: "5px"
                    }}/>}
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept="image/*" type="file"
                               onChange={e => uploadHandler(e, dispatch, setImage, false)}/>
                    </Button>
                    <div className={styleModal.selectionBlock}>
                        <input type={"checkbox"} className={styleModal.checkbox} onChange={privatePackHandler}/>
                        <label className={styleModal.description}>Private pack</label>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

