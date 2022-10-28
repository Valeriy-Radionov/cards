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
import {PacksType} from "../../bll/packsReducer";
import arrow from "../../assets/image/sortingArrow.svg";
import style from "./PackTableContainer.module.scss"

type BasicTablePropsType = {
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
    children: React.ReactNode
    statePacks: PacksType
    addParamsUpdate: () => void
    sorting: boolean
}

export const PacksTableContainer: React.FC<BasicTablePropsType> = ({
                                                                       handleChangePage,
                                                                       handleChangeRowsPerPage,
                                                                       children,
                                                                       statePacks,
                                                                       addParamsUpdate,
                                                                       sorting
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
                            <TableRow>
                                <TableCell align="left" className={style.header}>Cover</TableCell>
                                <TableCell align="left" className={style.header}>Name</TableCell>
                                <TableCell align="left" className={style.header}>Cards</TableCell>
                                <TableCell align="left" className={style.header}>Last Updated</TableCell>
                                <TableCell align="left" className={style.header}
                                           onClick={addParamsUpdate} sx={{
                                    "&:hover": {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Created by
                                    <img src={arrow}
                                         style={sorting ? {
                                             transform: "rotate(180deg)",
                                         } : {}}
                                         alt='arrow'/>
                                </TableCell>
                                <TableCell align="left" className={style.header}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {children}
                    </Table>
                </TableContainer>
                {statePacks &&
                    <TablePagination component={"div"}
                                     rowsPerPageOptions={[5, 10, 25]}
                                     count={+statePacks.cardPacksTotalCount}
                                     rowsPerPage={+statePacks.pageCount}
                                     page={+statePacks.page - 1}
                                     onPageChange={handleChangePage}
                                     onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                }
            </Paper>
        </ThemeProvider>
    );
}
