import {
    GET_CLIENTS,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAILURE,

    CREATE_CLIENT,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_FAILURE,

    REMOVE_CLIENT,
    REMOVE_CLIENT_SUCCESS,
    REMOVE_CLIENT_FAILURE,

    EDIT_CLIENT,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAILURE,
} from '../constants/clients';

import { listenClientsPromise, editClientPromise, addClientPromise, removeClientPromise } from '../firebase/client';


export const getClientsAction = () => ({
    type: GET_CLIENTS
});

export const getClientsActionSuccess = (payload) => ({
    type: GET_CLIENTS_SUCCESS,
    payload,
});

export const getClientsActionFailure = (error) => ({
    type: GET_CLIENTS_FAILURE,
    payload: error,
});

export const getClients = () => (dispatch) => {
    dispatch(getClientsAction());
    return listenClientsPromise(
        ({ type, payload }) => {
            if (type === 'Success') {
                dispatch(getClientsActionSuccess(payload))
                return Promise.resolve();
            }
            else if (type === 'Error') {
                dispatch(getClientsActionFailure(error))
                return Promise.reject();
            }

        });
};

export const createClientAction = () => ({
    type: CREATE_CLIENT
});

export const createClientActionSuccess = (payload) => ({
    type: CREATE_CLIENT_SUCCESS,
    payload,
});

export const createClientActionFailure = (error) => ({
    type: CREATE_CLIENT_FAILURE,
    payload: error,
});

export const createClient = (client) => (dispatch) => {
    dispatch(createClientAction());
    return addClientPromise(client)
        .then((payload) => {
            dispatch(createClientActionSuccess(client))
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch(createClientActionFailure(error))
            return Promise.reject();
        })
};

export const editClientAction = () => ({
    type: EDIT_CLIENT
});

export const editClientActionSuccess = (payload) => ({
    type: EDIT_CLIENT_SUCCESS,
    payload,
});

export const editClientActionFailure = (error) => ({
    type: EDIT_CLIENT_FAILURE,
    payload: error,
});

export const editClient = (client) => (dispatch) => {
    dispatch(editClientAction());
    return editClientPromise(client)
        .then(() => {
            dispatch(editClientActionSuccess(client))
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch(editClientActionFailure(error))
            return Promise.reject();
        })
};

export const removeClientAction = () => ({
    type: REMOVE_CLIENT
});

export const removeClientActionSuccess = () => ({
    type: REMOVE_CLIENT_SUCCESS,
});

export const removeClientActionFailure = (error) => ({
    type: REMOVE_CLIENT_FAILURE,
    payload: error,
});

export const removeClient = (id) => (dispatch) => {
    dispatch(removeClientAction());
    return removeClientPromise(id)
        .then(() => {
            dispatch(removeClientActionSuccess())
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch(removeClientActionFailure(error))
            return Promise.reject();
        })
};