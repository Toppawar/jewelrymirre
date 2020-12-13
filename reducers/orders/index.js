import {
    GET_ORDERS_SUCCESS,
} from '../../constants/orders';

const initialState = [];

const ordersReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_ORDERS_SUCCESS:
            console.log(payload);
            return [
                ...payload
            ]
        default:
            return state;
    }
}

export default ordersReducer