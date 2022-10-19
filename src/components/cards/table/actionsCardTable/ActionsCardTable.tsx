import React from 'react';
import s from './ActionsCardTable.module.scss'
import {DeleteCardModal} from "../../cardModals/deleteCardModal/DeleteCardModal";
import AddCardModal from "../../cardModals/addCardModal/AddCardModal";

type ActionsCardTablePropsType = {
    id: string
    isMy: boolean
    isDisabled: boolean
    questionTxt: string
    answerTxt: string
    questionImg: string
    answerImg: string
}
export const ActionsCardTable: React.FC<ActionsCardTablePropsType> = ({
                                                                          id,
                                                                          isMy,
                                                                          isDisabled,
                                                                          questionTxt,
                                                                          answerTxt,
                                                                          answerImg,
                                                                          questionImg
                                                                      }) => {
    return (
        isMy
            ?
            <div className={s.block} style={isDisabled ? {opacity: '0.5'} : {}}>
                <AddCardModal addEditModal={"edit"} _id={id} questionTxt={questionTxt} answerTxt={answerTxt}
                              questionImg={questionImg} answerImg={answerImg}/>
                <DeleteCardModal cardId={id} isDisabled={isDisabled}/>
            </div>
            :
            null
    );
};

