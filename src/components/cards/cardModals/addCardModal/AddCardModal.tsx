import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useAppDispatch} from "../../../../bll/store";
import {ModalWindow} from "../../../../common/components/modalWindows/ModalWindow";
import {addNewCardTC, updateCardTC} from "../../../../bll/cardsReducer";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import s from './AddCardModal.module.scss'
import stroke from "../../../../assets/image/Edit.svg";
import {uploadHandler} from "../../../../common/utils/workWithImages/uploadImageFileHandler";
import defImg from "../../../../assets/image/defaultCover.svg"
import {setAppErrorAC} from "../../../../bll/appReducer";

type SelectType = "image" | "text"

type AddCardModalPropsType = {
    addEditModal: 'add' | 'edit'
    _id?: string
    questionTxt?: string
    answerTxt?: string
    questionImg?: string
    answerImg?: string
}
export const AddCardModal: React.FC<AddCardModalPropsType> = ({
                                                                  addEditModal,
                                                                  _id,
                                                                  questionTxt,
                                                                  answerTxt,
                                                                  questionImg,
                                                                  answerImg
                                                              }) => {
    const dispatch = useAppDispatch

//input state
    const valueQuestion = questionTxt ? questionTxt : ""
    const valueAnswer = answerTxt ? answerTxt : ""
    const [questionInput, setQuestionInput] = useState(valueQuestion)
    const [answerInput, setAnswerInput] = useState(valueAnswer)
//select state
    const selectFormat = ((questionTxt && answerTxt) && (questionTxt !== "no question" && answerTxt !== "no answer")) ? "text" : "image"
    const [select, setSelectInput] = useState<SelectType>(selectFormat)
//img state
    const imageQuestion = select === "image" ? (questionImg ? questionImg : defImg) : ""
    const imageAnswer = select === "image" ? (answerImg ? answerImg : defImg) : ""
    const [questionImage, setQuestionImage] = useState(imageQuestion)
    const [answerImage, setAnswerImage] = useState(imageAnswer)

    const clearInputs = () => {
        setQuestionInput("")
        setAnswerInput("")
        setAnswerImage(defImg)
        setQuestionImage(defImg)
    }

    const errorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = defImg
        setQuestionImage(defImg)
        dispatch(setAppErrorAC("Incorrect image"))
    }

    const addNewCard = () => {

        questionInput || answerInput ? dispatch(addNewCardTC(questionInput.trim(), answerInput.trim())) : dispatch(addNewCardTC("", "", questionImage, answerImage))
        clearInputs()
    }

    const editCard = () => {
        if (_id) {
            dispatch(updateCardTC({
                question: questionInput,
                answer: answerInput,
                _id,
                questionImg: answerImage,
                answerImg: questionImage
            }))
        }
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        let value = event.target.value as SelectType
        setSelectInput(value);
    }

    const handleChangeQuestionInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setQuestionInput(value)
    }

    const handleChangeAnswerInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setAnswerInput(value)

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
                    <FormControl sx={{m: 1, width: "91%"}}>
                        {addEditModal === "add" ?
                            <>
                                <FormHelperText>Choose a question format</FormHelperText>
                                <Select value={select}
                                        onChange={handleChangeSelect}
                                >
                                    <MenuItem value={"text"}>Text</MenuItem>
                                    <MenuItem value={"image"}>Image</MenuItem>
                                </Select>
                            </> :
                            <>
                                <FormHelperText>Format question:</FormHelperText>
                                <FormLabel sx={{color: "#5280f1"}}>{select.toUpperCase()}</FormLabel>
                            </>
                        }
                        {select === "text" ?
                            <>
                                <FormHelperText> Question </FormHelperText>
                                <TextField value={questionInput}
                                           onChange={handleChangeQuestionInput}
                                           variant="standard"/>
                                <FormHelperText>Answer</FormHelperText>
                                <TextField value={answerInput}
                                           onChange={handleChangeAnswerInput}
                                           variant="standard"/>
                            </> : <>
                                <FormHelperText> Question </FormHelperText>
                                <img className={s.imageModal}
                                     src={questionImage || defImg}
                                     onError={errorHandler}
                                     alt={"No image"}/>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" type="file"
                                           onChange={e => uploadHandler(e, dispatch, setQuestionImage)}/>
                                </Button>
                                <FormHelperText>Answer</FormHelperText>
                                <img className={s.imageModal}
                                     src={answerImage || defImg}
                                     onError={errorHandler}
                                     alt={"No image"}/>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" type="file"
                                           onChange={e => uploadHandler(e, dispatch, setAnswerImage)}/>
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