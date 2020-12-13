import { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';


import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


import { TABLE_SECONDARY_COLUMNS } from '../../constants/orders';

import styles from './Row.style';

const useStyles = makeStyles(styles);


const Row = ({
    row
}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const formatedDate = useMemo(
        () => {
            return new Date(row.date.seconds * 1000).toLocaleDateString()
        }, [row]
    );

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{formatedDate}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.firstName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Info.
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.name}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.lastName}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.email}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.phone}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.country}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.city}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.postalCode}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.address}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.addressNumber}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.cost}</TableCell>
                                        <TableCell>{TABLE_SECONDARY_COLUMNS.products}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.email}>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.country}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                        <TableCell>{row.postalCode}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{row.addressNumber}</TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                        <TableCell>
                                            <TextField
                                                id="products"
                                                disabled
                                                value={row.products}
                                                variant="outlined"
                                                // onChange={handleChange}
                                                rows={4}
                                                multiline
                                            // required
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );

}

export default Row;