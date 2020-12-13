import firebase, { database } from './firebase';


export const listenOrdersPromise = (callback) => {
    return database.collection("orders")
        .onSnapshot(snapshot => {
            const orders = snapshot.docs.map(
                doc => {
                    const data = doc.data();
                    const id = doc.id;

                    return {
                        id,
                        ...data,
                    }
                }
            );

            if (callback) {
                callback({
                    type: 'Success',
                    payload: orders
                })
            }
        },
            error => {
                callback({
                    type: 'Error',
                    payload: error,
                })
            });
}

export const addOrderPromise = (order) => {
    const { products, cost, client: { id, ...restClient } } = order;
    return database.collection('orders').add({
        products,
        cost,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        ...restClient,
    });
}

