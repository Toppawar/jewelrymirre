
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';
export const GET_ORDERS_CANCELLED = 'GET_ORDERS_CANCELLED';

export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const CREATE_ORDER_CANCELLED = 'CREATE_ORDER_CANCELLED';

export const TABLE_PRIMARY_COLUMNS = {
    order: 'Número de pedido',
    date: 'Fecha de pedido',
    email: 'Correo del cliente',
    name: 'Nombre del cliente',
};

export const TABLE_SECONDARY_COLUMNS = {
    name: 'Nombre',
    lastName: 'Apellidos',
    email: 'Email',
    phone: 'Teléfono',
    country: 'País',
    city: 'Ciudad',
    postalCode: 'Código Postal',
    address: 'Dirección',
    addressNumber: 'Portal',
    cost: 'Coste del pedido',
    products: ' Artículos'
};

export const DEFAULT_ORDER = {
    cost: '',
    client: undefined,
    products: ''
};