import {

    GET_ORDERS,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,

    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from '../constants/orders';

import {
    listenOrdersPromise,
    addOrderPromise,
} from '../firebase/order';


export const getOrdersAction = () => ({
    type: GET_ORDERS
});

export const getOrdersActionSuccess = (payload) => ({
    type: GET_ORDERS_SUCCESS,
    payload,
});

export const getOrdersActionFailure = (error) => ({
    type: GET_ORDERS_FAILURE,
    payload: error,
});


export const getOrders = () => (dispatch) => {
    dispatch(getOrdersAction());
    return listenOrdersPromise(
        ({ type, payload }) => {
            if (type === 'Success') {
                dispatch(getOrdersActionSuccess(payload))
                return Promise.resolve();
            }
            else if (type === 'Error') {
                dispatch(getOrdersActionFailure(error))
                return Promise.reject();
            }
        });
};

export const createOrderAction = () => ({
    type: CREATE_ORDER
});

export const createOrderActionSuccess = (payload) => ({
    type: CREATE_ORDER_SUCCESS,
    payload,
});

export const createOrderActionFailure = (error) => ({
    type: CREATE_ORDER_FAILURE,
    payload: error,
});

export const createOrder = (order) => (dispatch) => {
    dispatch(createOrderAction());
    return addOrderPromise(order)
        .then(() => {
            dispatch(createOrderActionSuccess(order))
            return Promise.resolve();
        })
        .catch((error) => {
            dispatch(createOrderActionFailure(error))
            return Promise.reject();
        })
};