import React from 'react';
import {Rating, TableBody, TableCell, TableRow} from '@mui/material'
import {formatDate} from "../../../../common/utils/formatDate";
import {ActionsCardTable} from "../actionsCardTable/ActionsCardTable";
import styleTableRow from './TableBody.module.scss'
import {FullCardType} from "../../../../bll/cardsReducer";
import defImg from "../../../../assets/image/defaultCover.svg"

type MapTableBodyPropsType = {
    items: FullCardType[]
    isMy: boolean
}

export const TableBodyCart: React.FC<MapTableBodyPropsType> = ({items, isMy}) => {

    return (
        <TableBody className={styleTableRow.container}>
            {items.map(item => {
                return (
                    <TableRow key={item._id} sx={{
                        "&:hover": {bgcolor: "rgba(1, 112, 161, 0.52)"},
                    }}>
                        <TableCell align="center" component="th" scope="row" className={styleTableRow.row}>
                            {item.question && item.question !== "no question" ? item.question :
                                <img src={item.questionImg ? item.questionImg : defImg}
                                     className={styleTableRow.imgRow}/>}
                        </TableCell>
                        <TableCell align="center" className={styleTableRow.row}>
                            {item.answer && item.answer !== "no answer" ? item.answer :
                                <img src={item.answerImg ? item.answerImg : defImg}
                                     className={styleTableRow.imgRow}/>}
                        </TableCell>
                        <TableCell align="left" className={styleTableRow.row}>
                            {formatDate(item.updated)}
                        </TableCell>
                        <TableCell align="center">
                            <div className={styleTableRow.rating}>
                                <Rating name="read-only" value={Number(item.grade)} readOnly/>
                                <ActionsCardTable isDisabled={item.entityStatusCard === 'loading'} id={item._id}
                                                  isMy={isMy} questionTxt={item.question} answerTxt={item.answer}
                                                  questionImg={item.questionImg} answerImg={item.answerImg}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    );
};

