import {
    GET_CLIENTS_SUCCESS,

    EDIT_CLIENT_SUCCESS,
} from '../../constants/clients';

const initialState = [];

const clientReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case GET_CLIENTS_SUCCESS:
            return [
                ...payload
            ]
        case EDIT_CLIENT_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default clientReducer