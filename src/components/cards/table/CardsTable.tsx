import React from 'react';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination
} from '@mui/material'
import {CardsType} from "../../../bll/cardsReducer";
import arrow from '../../../assets/image/sortingArrow.svg'
import style from "./CardsTable.module.scss";

type BasicTablePropsType = {
    addParamsGrade: () => void
    grade: boolean
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
    stateItems: CardsType
    disabledPaginate: boolean
}
export const BasicTable: React.FC<BasicTablePropsType> = ({
                                                              addParamsGrade,
                                                              grade,
                                                              handleChangePage,
                                                              handleChangeRowsPerPage,
                                                              children,
                                                              stateItems,
                                                              disabledPaginate
                                                          }) => {

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={style.headerCell}>Question</TableCell>
                            <TableCell align="center" className={style.headerCell}>Answer</TableCell>
                            <TableCell align="left" className={style.headerCell}>Last Updated</TableCell>
                            <TableCell align="left" onClick={addParamsGrade}
                                       className={`${style.headerCell} ${style.filterRow}`}>
                                Grade
                                <img src={arrow}
                                     style={grade ? {
                                         transform: "rotate(180deg)",
                                         paddingLeft: "2px",
                                     } : {
                                         paddingLeft: "2px",
                                     }}
                                     alt='arrow'/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {children}
                </Table>
            </TableContainer>
            <TablePagination
                component={"div"}
                rowsPerPageOptions={[5, 10, 25]}
                count={+stateItems.cardsTotalCount}
                rowsPerPage={+stateItems.pageCount}
                page={+stateItems.page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
