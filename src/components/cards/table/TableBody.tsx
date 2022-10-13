import React from 'react';
import {
    TableBody,
    TableCell,
    TableRow,
    Rating
} from '@mui/material'
import {formatDate} from "../../../common/utils/formatDate";
import {ActionsCardTable} from "./actionsCartTable/ActionsCardTable";
import s from './TableBody.module.scss'
import {FullCardType} from "../../../bll/cardsReducer";

type MapTableBodyPropsType = {
    items: FullCardType[]
    isMy: boolean
}

export const TableBodyCart: React.FC<MapTableBodyPropsType> = ({items, isMy}) => {

    return (<>
            <TableBody>
                {items.map(item => {
                    return (
                        <TableRow key={item._id} hover>
                            <TableCell align="left" component="th" scope="row">
                                {/*!!!!!!*/}
                                {/*1!!!!!! Проверить условие*/}
                                {!item.question ? item.questionImg : item.question}
                            </TableCell>
                            <TableCell align="left">
                                {item.answer}
                            </TableCell>
                            <TableCell align="left">
                                {formatDate(item.updated)}
                            </TableCell>
                            <TableCell align="center">
                                <div className={s.rating}>
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

