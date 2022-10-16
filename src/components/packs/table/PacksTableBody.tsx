import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../common/utils/formatDate";
import {CardPackType} from "../../../api/packs/packs-api";
import {ActionsPacks} from "./ActionsPacks";
import {useNavigate} from 'react-router-dom'
import style from "./PackTableBody.module.scss"
import defImg from "../../../assets/image/defaultCover.svg"

type MapTableBodyPropsType = {
    items: CardPackType[]
    learnPack: (id: string) => void
    updatePack: (id: string) => void
}

export const PacksTableBody: React.FC<MapTableBodyPropsType> = ({
                                                                    items,
                                                                    updatePack,
                                                                    learnPack
                                                                }) => {
    const navigate = useNavigate()
    const [isAvaBroken, setIsAvaBroken] = useState<boolean>(false)

    const errorImgHandler = () => {
        setIsAvaBroken(true)
    }
    return (
        <TableBody>
            {items.map(item => {
                return (
                    <TableRow key={item._id} sx={{
                        "&:hover": {bgcolor: "rgba(1, 112, 161, 0.52)"}
                    }}>
                        <TableCell align="left">

                            <img className={style.packImage}
                                 src={!item.deckCover || isAvaBroken || (item.deckCover === "url or base64") ? defImg : item.deckCover}
                                 onError={errorImgHandler}
                            />
                        </TableCell>
                        <TableCell className={style.row} align="left"
                                   onClick={() => navigate(`/cards/${item._id}`, {state: item._id})}
                                   sx={{
                                       "&:hover": {color: "rgb(0,161,39)", cursor: "pointer"}
                                   }}
                        >{item.name}</TableCell>
                        <TableCell align="left" className={style.row}>
                            {item.cardsCount}
                        </TableCell>
                        <TableCell align="left" className={style.row}>
                            {formatDate(item.updated)}
                        </TableCell>
                        <TableCell align="left" className={style.row}>{item.user_name}</TableCell>
                        <TableCell align="left">
                            <ActionsPacks
                                learnItem={learnPack}
                                updateItem={updatePack}
                                packId={item._id}
                                userId={item.user_id}
                                packName={item.name}
                            />
                        </TableCell>
                    </TableRow>)
            })}
        </TableBody>
    );
};

