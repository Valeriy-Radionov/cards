import React from 'react';
import {useAppSelector} from "../../../bll/store";
import s from "../../cards/table/actionsCardTable/ActionsCardTable.module.scss";
import learn from "../../../assets/image/teacherlearn.svg"
import {DeletePackModal} from "../modalsPacks/deletePackModal/DeletePackModal";
import {AddPackModal} from "../modalsPacks/addEditPackModal/AddPackModal";

type ActionsCardTablePropsType = {
    updateItem: (id: string) => void
    learnItem: (id: string) => void
    packId: string
    userId: string
    packName: string
    packImg: string
}
export const ActionsPacks: React.FC<ActionsCardTablePropsType> = ({
                                                                      packId,
                                                                      updateItem,
                                                                      learnItem,
                                                                      userId,
                                                                      packName,
                                                                      packImg
                                                                  }) => {

    const userProfileId = useAppSelector(state => state.profile.user?._id)
    const status = useAppSelector(state => state.app.status)
    const disabled = status === "loading"
    const styleDisable = status === "loading" ? {opacity: "0.5"} : {}

    return (
        userProfileId === userId ?
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn} disabled={disabled}>
                    <img src={learn} alt={''} style={styleDisable}/>
                </button>
                <AddPackModal isAddEditPack={"edit"} id={packId} packImg={packImg}/>
                <DeletePackModal packId={packId} packName={packName}/>
            </div> :
            <div className={s.block}>
                <button onClick={() => learnItem(packId)} className={s.btn}
                        disabled={disabled}>
                    <img src={learn} alt={''} style={styleDisable}/>
                </button>
            </div>
    );
};
