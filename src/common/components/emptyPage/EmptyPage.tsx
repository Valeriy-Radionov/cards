import React from 'react';
import s from './Empty.module.scss'
import AddCardModal from "../../../components/cards/cardModals/addCardModal/AddCardModal";
import {AddPackModal} from "../../../components/packs/modalsPacks/addEditPackModal/AddPackModal";

type EmptyCardsPropsType = {
    packCard: 'packs' | 'cards'
    isMy: boolean
    name: string
}

export const EmptyPage: React.FC<EmptyCardsPropsType> = ({packCard, isMy, name}) => {
    return (
        <div className={s.block}>
            <span>There are no cards in this pack that satisfy the search</span>
            {isMy
                ? packCard === 'cards' ? <AddCardModal addEditModal={'add'}/> : <AddPackModal isAddEditPack={"add"}/>
                : null
            }

        </div>
    );
};

