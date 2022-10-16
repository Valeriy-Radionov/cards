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
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Question</TableCell>
                        <TableCell align="center" className={style.row}>Answer</TableCell>
                        <TableCell align="left" className={style.row}>Last Updated</TableCell>
                        <TableCell align="left" onClick={addParamsGrade} className={style.row}>
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
                <TableFooter style={disabledPaginate ? {pointerEvents: 'none', opacity: '0.5'} : {}}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={+stateItems.cardsTotalCount}
                            rowsPerPage={+stateItems.pageCount}
                            page={+stateItems.page - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
