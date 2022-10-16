import React from 'react';
import s from './ActionsCardTable.module.scss'
import {DeleteCardModal} from "../../cardModals/deleteCardModal/DeleteCardModal";
import AddCardModal from "../../cardModals/addCardModal/AddCardModal";

type ActionsCardTablePropsType = {
    id: string
    isMy: boolean
    isDisabled: boolean
}
export const ActionsCardTable: React.FC<ActionsCardTablePropsType> = ({id, isMy, isDisabled}) => {
    return (
        isMy
            ?
            <div className={s.block} style={isDisabled ? {opacity: '0.5'} : {}}>
                <AddCardModal addEditModal={"edit"} _id={id}/>
                <DeleteCardModal cardId={id} isDisabled={isDisabled}/>
            </div>
            :
            null
    );
};

