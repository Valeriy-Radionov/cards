import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../../bll/store";
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {addNewCardTC, updateCardTC} from "../../../../bll/cardsReducer";
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    FormHelperText,
    TextField,
    IconButton,
    Button
} from "@mui/material";
import s from './AddCardModal.module.scss'
import stroke from "../../../../assets/image/Edit.svg";

type AddCardModalPropsType = {
    addEditModal: 'add' | 'edit'
    _id?: string
}
export const AddCardModal: React.FC<AddCardModalPropsType> = ({addEditModal, _id}) => {
    const dispatch = useAppDispatch

    const [select, setSelectInput] = useState("text")
    const [questionInput, setQuestionInput] = useState("")
    const [answerInput, setAnswerInput] = useState("")

    const clearInputs = () => {
        setSelectInput("")
        setQuestionInput("")
        setAnswerInput("")
    }

    const addNewCard = () => {
        dispatch(addNewCardTC(questionInput, answerInput))
        clearInputs()
    }

    const editCard = () => {
        _id && dispatch(updateCardTC({question: questionInput, answer: answerInput, _id}))
        clearInputs()
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSelectInput(event.target.value as string);
        console.log(select)
    }

    const handleChangeQuestionInput = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionInput(e.currentTarget.value)
    }

    const handleChangeAnswerInput = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerInput(e.currentTarget.value)
    }

    const editImg = () => {
        return <img src={stroke} alt={""}/>
    }

    return (
        <div style={{display: "inline-block"}}>
            <ModalWindow namePreviousBtn={addEditModal === "add" ? "Add new cart" : editImg()}
                         titleModal={addEditModal === "add" ? "Add new cart" : "Edit cart"}
                         actionSaveDeleteBtn={addEditModal === "add" ? addNewCard : editCard}
                         isSaveDeleteModal={"Save"}
                         isEdit={addEditModal}
            >
                <div className={s.blockForm}>
                    <FormControl sx={{m: 1, width: 347}}>
                        <FormHelperText>Choose a question format</FormHelperText>
                        <Select
                            value={select}
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value={"text"}>Text</MenuItem>
                            <MenuItem value={"image"}>Image</MenuItem>
                        </Select>
                        {select === "text" ?
                            <>
                                < FormHelperText> Question </FormHelperText>
                                <TextField value={questionInput}
                                           onChange={handleChangeQuestionInput}
                                           variant="standard"/>
                                <FormHelperText>Answer</FormHelperText>
                                <TextField value={answerInput}
                                           onChange={handleChangeAnswerInput}
                                           variant="standard"/>
                            </> : <>
                                <FormHelperText> Question </FormHelperText>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" multiple type="file"/>
                                </Button>
                                <FormHelperText>Answer</FormHelperText>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" multiple type="file"/>
                                </Button>
                            </>
                        }
                    </FormControl>
                </div>
            </ModalWindow>
        </div>
    );
};

export default AddCardModal;