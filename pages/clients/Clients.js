import { useCallback, useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { connect } from 'react-redux';


import DataTable from '../../components/DataTable';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import { getClients, editClient, createClient, removeClient } from '../../actions/clients';


import styles from './Clients.style';

const useStyles = makeStyles(styles);


const DEFAULT_CLIENT = {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    city: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    floor: '',
};


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellidos', width: 130 },
    { field: 'phone', headerName: 'Teléfono', width: 130 },
    { field: 'country', headerName: 'País', width: 130 },
    { field: 'city', headerName: 'Ciudad', width: 130 },
    { field: 'postalCode', headerName: 'Código Postal', width: 130 },
    {
        field: 'address',
        headerName: 'Dirección',
        width: 240,
    },
    { field: 'addressNumber', headerName: 'Portal', width: 80 },
    { field: 'floor', headerName: 'Piso', width: 130 },
];

// const rows = [
//     {
//         id: 1, firstName: 'Pablo', lastName: 'Montiel López',
//         phone: '601187437', country: 'España', city: 'Madrid', postalCode: '28041', address: 'Calle Canción del Olvido',
//         addressNumber: 40, floor: '1º Derecha'
//     },
//     {
//         id: 2, firstName: 'Pablo', lastName: 'Montiel López',
//         phone: '601187437', country: 'España', city: 'Madrid', postalCode: '28041', address: 'Calle Canción del Olvido',
//         addressNumber: 40, floor: '1º Derecha'
//     }
// ];


const Orders = ({
    fetchClients,
    changeClient,
    addClient,
    deleteClient,
    clients,
}) => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [selectedRows, setSelectedRows] = useState([]);
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [newClient, setNewClient] = useState(DEFAULT_CLIENT);
    const [updatedClient, setUpdatedClient] = useState(DEFAULT_CLIENT);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(
        () => {
            let unsuscribe = fetchClients();
            return () => unsuscribe && unsuscribe();
        }, []
    );

    useEffect(
        () => {
            if (selectedRows.length > 1 || !selectedRows.length) {
                setUpdatedClient(DEFAULT_CLIENT)
            }
            else if (selectedRows.length === 1) {
                setUpdatedClient(selectedRows[0])
            }
        }, [selectedRows]
    );

    useEffect(
        () => setIsRowSelected(selectedRows.length === 1)
        , [selectedRows, setIsRowSelected]
    );

    const handleSelect = useCallback(
        (newRow) => {
            if (newRow.isSelected) {
                setSelectedRows(prevState => [...prevState, newRow.data]);
            }
            if (!newRow.isSelected) {
                setSelectedRows(prevState => prevState.filter(row => row.id !== newRow.data.id))
            }
        }, [setSelectedRows]
    );

    const isValidForm = useMemo(
        () => {
            const { id, ...restNewClient } = newClient;
            return !Object.values(restNewClient).includes("")
        },
        [newClient]
    );

    const formFields = useMemo(
        () => {
            if (columns[0].field === 'id') {
                columns.shift();
            }
            return columns;
        }, []
    );

    const handleChange = useCallback(
        (event) => {
            const { target: { value, id } } = event;
            if (isRowSelected) {
                setUpdatedClient(prevState => ({
                    ...prevState,
                    [id]: value,
                }));
            }
            else {
                setNewClient(prevState => ({
                    ...prevState,
                    [id]: value,
                }))
            }
        }, [isRowSelected, selectedRows, setNewClient, setUpdatedClient]
    );

    const handleCreateClient = useCallback(
        () => {
            setIsLoading(true);
            const { id, ...restNewClient } = newClient;
            addClient(restNewClient)
                .then(() => {
                    setIsLoading(false)
                    enqueueSnackbar('Cliente creado satisfactoriamente', {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                })
                .catch(() => {
                    enqueueSnackbar('Error al crear cliente', {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                    setIsLoading(false);
                });
            setNewClient(DEFAULT_CLIENT)
        }, [newClient, setIsLoading, setNewClient]
    );

    const handleEditClient = useCallback(
        () => {
            changeClient(updatedClient)
                .then(() => {
                    setIsLoading(false)
                    enqueueSnackbar('Cliente editado satisfactoriamente', {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                })
                .catch(() => {
                    enqueueSnackbar('Error al editar cliente', {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                    setIsLoading(false)
                });
        }, [updatedClient, setIsLoading]
    );

    const handleRemoveClient = useCallback(
        () => {
            deleteClient(updatedClient.id)
                .then(() => {
                    enqueueSnackbar('Cliente borrado satisfactoriamente', {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                    setIsLoading(false)
                })
                .catch((error) => {
                    enqueueSnackbar(`Error al borrar cliente: ${error}`, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                    setIsLoading(false)
                });
            setUpdatedClient(DEFAULT_CLIENT)
            setIsRowSelected(false);
            setSelectedRows([]);
        }, [updatedClient, setUpdatedClient, setIsRowSelected, setSelectedRows]
    );

    return (
        <Grid
            className={classes.container}
            container
            spacing={1}
        >
            <Grid
                container
                item
                xs={12}
            >
                {formFields
                    ? (<DataTable
                        onRowSelected={handleSelect}
                        rows={clients}
                        columns={formFields}
                        pageSize={5}
                    />)
                    : (<CircularProgress />)}

            </Grid>
            <Grid
                container
                item
                spacing={3}
                xs={12}
                className={classes.formController}
            >
                {formFields.map(({
                    field,
                    headerName,
                    type,
                }, index) => {
                    return (
                        <Grid
                            key={index}
                            item
                        >
                            <TextField
                                key={index}
                                id={field}
                                type={type}
                                label={headerName}
                                value={isRowSelected ? updatedClient[field] : newClient[field]}
                                variant="outlined"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.actionButtonsContainer}
            >

                <Button
                    variant="contained"
                    color="primary"
                    onClick={isRowSelected ? handleEditClient : handleCreateClient}
                    disabled={!isValidForm && !isRowSelected}
                    className={classes.actionButton}
                >{isRowSelected ? 'Editar' : 'Crear'}
                </Button>

                {isRowSelected ? (
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
                }
            </Grid>
        </Grid>
    );
}

const mapStateToProps = ({
    clients,
}) => ({
    clients,
});

const mapDispatchToProps = {
    fetchClients: getClients,
    changeClient: editClient,
    addClient: createClient,
    deleteClient: removeClient,
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);