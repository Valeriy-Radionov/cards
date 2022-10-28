import React from 'react';
import {
    createTheme,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    ThemeProvider
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
    const theme = createTheme({
        typography: {
            fontFamily: "Montserrat",
            fontSize: 14
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{height: 432}}>
                    <Table sx={{minWidth: 650}} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{fontFamily: "Montserrat"}}>
                                <TableCell align="center" className={style.headerCell}>Question</TableCell>
                                <TableCell align="center" className={style.headerCell}>Answer</TableCell>
                                <TableCell align="left" className={style.headerCell}>Last Updated</TableCell>
                                <TableCell align="left" onClick={addParamsGrade}
                                           className={`${style.headerCell} ${style.filterRow}`}>
                                    Grade
                                    <img src={arrow}
                                         style={grade ? {
                                             transform: "rotate(180deg)"
                                         } : {}}
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
        </ThemeProvider>
    );
}
