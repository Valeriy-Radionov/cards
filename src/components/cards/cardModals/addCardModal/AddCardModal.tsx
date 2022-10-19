import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
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
import {convertFileToBase64, uploadHandler} from "../../../../common/utils/workWithImages/uploadImageFileHandler";
import defImg from "../../../../assets/image/defaultCover.svg"
import {setAppErrorAC} from "../../../../bll/appReducer";

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


    const valueQuestion = questionTxt ? questionTxt : ""
    const valueAnswer = answerTxt ? answerTxt : ""


    //state for images and input value
    const [questionInput, setQuestionInput] = useState(valueQuestion)
    const [answerInput, setAnswerInput] = useState(valueAnswer)

    const [questionImage, setQuestionImage] = useState("")
    const [answerImage, setAnswerImage] = useState("")

    const [isAvaBroken, setIsAvaBroken] = useState(false)

    //variables for cards modal window and table cards
    const imageAddQuestion = questionImage ? questionImage : (questionImg ? questionImg : defImg)
    const imageAddAnswer = answerImage ? answerImage : (answerImg ? answerImg : defImg)

    const imgEditQuestion = questionImage ? questionImage : questionImg
    const imgEditAnswer = answerImage ? answerImage : answerImg

    //default select value
    const selectFormat = (questionTxt !== "no question" && answerTxt !== "no answer") ? "text" : "image"
    const [select, setSelectInput] = useState<string>(selectFormat)

    const clearInputs = () => {
        setQuestionInput("")
        setAnswerInput("")
        setQuestionImage("")
        setAnswerImage("")
    }

    const errorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
        // e.currentTarget.src ? setIsAvaBroken(false) : setIsAvaBroken(true)
        e.currentTarget.src = defImg
        setQuestionImage(defImg)
    }

    const addNewCard = () => {
        if ((addEditModal === "add") && (select === "image")) {
            setAnswerImage(defImg)
            setQuestionImage(defImg)
        }
        questionInput || answerInput ? dispatch(addNewCardTC(questionInput.trim(), answerInput.trim())) : dispatch(addNewCardTC("", "", imageAddQuestion, imageAddAnswer))
        clearInputs()
    }

    const editCard = () => {
        if (_id) {
            if (select === "image") {

                console.log()
                dispatch(updateCardTC({
                    question: questionInput,
                    answer: answerInput,
                    _id
                }))
            } else {
                dispatch(updateCardTC({
                    question: questionInput,
                    answer: answerInput,
                    _id
                }))

            }
        }

        clearInputs()
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        let value = event.target.value as string
        setSelectInput(value);
        console.log(select)
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
                                     src={addEditModal === "add" ? imageAddQuestion : imgEditQuestion}
                                     onError={errorHandler}
                                     alt={"No image"}/>
                                <Button variant="contained" component="label">
                                    Upload
                                    <input hidden accept="image/*" type="file"
                                           onChange={e => uploadHandler(e, dispatch, setQuestionImage)}/>
                                </Button>
                                <FormHelperText>Answer</FormHelperText>
                                <img className={s.imageModal}
                                     src={addEditModal === "add" ? imageAddAnswer : imgEditAnswer}
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