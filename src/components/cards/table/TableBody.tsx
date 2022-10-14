import React from 'react';
import {
    TableBody,
    TableCell,
    TableRow,
    Rating
} from '@mui/material'
import {formatDate} from "../../../common/utils/formatDate";
import {ActionsCardTable} from "./actionsCartTable/ActionsCardTable";
import styleTableRow from './TableBody.module.scss'
import {FullCardType} from "../../../bll/cardsReducer";

type MapTableBodyPropsType = {
    items: FullCardType[]
    isMy: boolean
}

export const TableBodyCart: React.FC<MapTableBodyPropsType> = ({items, isMy}) => {

    return (<>
            <TableBody className={styleTableRow.container}>
                {items.map(item => {
                    return (
                        <TableRow key={item._id} hover>
                            <TableCell align="center" component="th" scope="row">
                                {/*!!!!!!*/}
                                {/*1!!!!!! Проверить условие*/}
                                {!item.questionImg ? item.question :
                                    <img src={item.questionImg} className={styleTableRow.imgRow}/>}
                            </TableCell>
                            <TableCell align="center">
                                {!item.answerImg ? item.answer :
                                    <img src={item.answerImg} className={styleTableRow.imgRow}/>}
                            </TableCell>
                            <TableCell align="left">
                                {formatDate(item.updated)}
                            </TableCell>
                            <TableCell align="center">
                                <div className={styleTableRow.rating}>
                                    <Rating name="read-only" value={Number(item.grade)}
                                            onChange={(event, newValue) => {
                                            }}
                                    />
                                    <ActionsCardTable isDisabled={item.entityStatusCard === 'loading'} id={item._id}
                                                      isMy={isMy}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </>
    );
};

