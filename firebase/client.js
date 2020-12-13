import firebase, { database } from './firebase';

export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const logOut = () => {
  return firebase.auth().signOut();
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(onChange)
}

export const addClientPromise = (client) => {
  return database.collection('clients').add(client);
}

export const editClientPromise = (client) => {
  const { id, ...restClient } = client;
  return database.collection('clients').doc(id).set(restClient);
};

export const removeClientPromise = (id) => {
  return database.collection('clients').doc(id).delete();
};

export const searchClientPromise = ({
  type = 'firstName',
  query,
}) => {
  return database.collection('clients')
    .where(type, ">=", query)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(
        doc => {
          const data = doc.data();
          const id = doc.id;

          return {
            id,
            ...data,
          }
        }
      )
    })
};


export const listenClientsPromise = (callback) => {
  return database.collection("clients")
    .onSnapshot(snapshot => {
      const clients = snapshot.docs.map(
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
          payload: clients
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

export const fetchClientsPromise = () => {
  return database.collection("clients")
    .get()
    .then(snapshot => {
      return snapshot.docs.map(
        doc => {
          const data = doc.data();
          const id = doc.id;

          return {
            id,
            ...data,
          }
        }
      )
    })
}
