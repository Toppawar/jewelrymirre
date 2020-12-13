import { useCallback, useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Row from '../../components/Row';


import SearchClientBar from '../../components/SearchClientBar';


import { TABLE_PRIMARY_COLUMNS, DEFAULT_ORDER } from '../../constants/orders';


import {
    createOrder as createOrderAction,
    getOrders as getOrdersAction
} from '../../actions/orders';


import styles from '../../styles/Orders.style';

const useStyles = makeStyles(styles);

const Orders = ({
    fetchOrders,
    createOrder,

    orders,
}) => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [canClearValue, setCanClearValue] = useState(false)

    useEffect(
        () => {
            let unsuscribe = fetchOrders();
            return () => unsuscribe && unsuscribe();
        }, []
    );

    const isValidForm = useMemo(
        () => {
            const objectValues = Object.values(order);
            return !objectValues.includes("")
                && !objectValues.includes(undefined)
                && !objectValues.includes(null)
        },
        [order]
    );

    const handleChange = useCallback(
        (event) => {
            const { target: { value, id } } = event;
            setOrder(prevState => ({
                ...prevState,
                [id]: value
            }))
        }, [setOrder]
    )

    const handleSelectClient = useCallback(
        (value) => {
            setCanClearValue(false);
            setOrder(prevState => ({
                ...prevState,
                client: value,
            }));
        }, [setOrder]
    );

    const handleModalOpen = useCallback(
        () => {
            setCanClearValue(false);
        }, [setCanClearValue]
    )

    const handleCreateOrder = useCallback(
        () => {
            if (isValidForm) {
                createOrder(order)
                    .then(() => {
                        enqueueSnackbar('Pedido creado satisfactoriamente', {
                            variant: 'success',
                            autoHideDuration: 3000,
                        });
                        setOrder(DEFAULT_ORDER);
                        setCanClearValue(true);
                    })
                    .catch((error) => {
                        enqueueSnackbar(`Error al crear pedido: ${error || 'desconocido'}`, {
                            variant: 'error',
                            autoHideDuration: 3000,
                        });
                    })
            }
        }, [order, isValidForm, setOrder]
    );

    return (
        <div className={classes.orders}>
            <div className={classes.tableContainer} >
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>{TABLE_PRIMARY_COLUMNS.order}</TableCell>
                                <TableCell>{TABLE_PRIMARY_COLUMNS.date}</TableCell>
                                <TableCell>{TABLE_PRIMARY_COLUMNS.email}</TableCell>
                                <TableCell>{TABLE_PRIMARY_COLUMNS.name}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row, index) => (
                                <Row
                                    key={index}
                                    row={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Grid
                container
                item
                spacing={3}
                xs={12}
                className={classes.form}
            >
                <Grid
                    item
                >
                    <TextField
                        id="cost"
                        label="Precio"
                        value={order.cost}
                        variant="outlined"
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid
                    item
                >
                    <TextField
                        id="products"
                        label="Artículos"
                        value={order.products}
                        variant="outlined"
                        onChange={handleChange}
                        rows={4}
                        multiline
                        required
                    />
                </Grid>
                <Grid
                    item
                >
                    <SearchClientBar
                        clearValue={canClearValue}
                        onModalOpen={handleModalOpen}
                        onSelect={handleSelectClient}
                    />
                </Grid>
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.actionButtonsContainer}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateOrder}
                    // onClick={isRowSelected ? handleEditClient : handleCreateClient}
                    disabled={!isValidForm}
                    className={classes.actionButton}
                >Crear
                </Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={isRowSelected ? handleEditClient : handleCreateClient}
                    disabled={!isValidForm && !isRowSelected}
                    className={classes.actionButton}
                >{isRowSelected ? 'Editar' : 'Crear'}
                </Button> */}

                {/* {isRowSelected ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveClient}
                        disabled={!isValidForm && !isRowSelected}
                        className={classes.actionButton}
                    >Borrar
                    </Button>

                )
                    : null}
                {isLoading ?
                    (<div className={classes.spinner}>
                        <CircularProgress />
                    </div>)
                    : null
                } */}
            </Grid>
        </div>)
}

const mapStateToProps = ({
    orders,
}) => ({
    orders,
});

const mapDispatchToProps = {
    fetchOrders: getOrdersAction,
    createOrder: createOrderAction
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
