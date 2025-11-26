import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------
export function UserView() {
    const table = useTable();
    const [filterName, setFilterName] = useState('');
    const dataFiltered = applyFilter({
        inputData: _users,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });
    const notFound = !dataFiltered.length && !!filterName;
    return (_jsxs(DashboardContent, { children: [_jsxs(Box, { sx: {
                    mb: 5,
                    display: 'flex',
                    alignItems: 'center',
                }, children: [_jsx(Typography, { variant: "h4", sx: { flexGrow: 1 }, children: "Users" }), _jsx(Button, { variant: "contained", color: "inherit", startIcon: _jsx(Iconify, { icon: "mingcute:add-line" }), children: "New userss" })] }), _jsxs(Card, { children: [_jsx(UserTableToolbar, { numSelected: table.selected.length, filterName: filterName, onFilterName: (event) => {
                            setFilterName(event.target.value);
                            table.onResetPage();
                        } }), _jsx(Scrollbar, { children: _jsx(TableContainer, { sx: { overflow: 'unset' }, children: _jsxs(Table, { sx: { minWidth: 800 }, children: [_jsx(UserTableHead, { order: table.order, orderBy: table.orderBy, rowCount: _users.length, numSelected: table.selected.length, onSort: table.onSort, onSelectAllRows: (checked) => table.onSelectAllRows(checked, _users.map((user) => user.id)), headLabel: [
                                            { id: 'name', label: 'Name' },
                                            { id: 'company', label: 'Company' },
                                            { id: 'role', label: 'Role' },
                                            { id: 'isVerified', label: 'Verified', align: 'center' },
                                            { id: 'status', label: 'Status' },
                                            { id: '' },
                                        ] }), _jsxs(TableBody, { children: [dataFiltered
                                                .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                                                .map((row) => (_jsx(UserTableRow, { row: row, selected: table.selected.includes(row.id), onSelectRow: () => table.onSelectRow(row.id) }, row.id))), _jsx(TableEmptyRows, { height: 68, emptyRows: emptyRows(table.page, table.rowsPerPage, _users.length) }), notFound && _jsx(TableNoData, { searchQuery: filterName })] })] }) }) }), _jsx(TablePagination, { component: "div", page: table.page, count: _users.length, rowsPerPage: table.rowsPerPage, onPageChange: table.onChangePage, rowsPerPageOptions: [5, 10, 25], onRowsPerPageChange: table.onChangeRowsPerPage })] })] }));
}
// ----------------------------------------------------------------------
export function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [order, setOrder] = useState('asc');
    const onSort = useCallback((id) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    }, [order, orderBy]);
    const onSelectAllRows = useCallback((checked, newSelecteds) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);
    const onSelectRow = useCallback((inputValue) => {
        const newSelected = selected.includes(inputValue)
            ? selected.filter((value) => value !== inputValue)
            : [...selected, inputValue];
        setSelected(newSelected);
    }, [selected]);
    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);
    const onChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const onChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onResetPage();
    }, [onResetPage]);
    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage,
    };
}
