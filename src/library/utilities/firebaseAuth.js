import firebase from "library/api/firebaseConfig";

export const createUserWithEmailAndPassword = async (email, password) => {
    return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUserOut = async () => {
    await firebase.auth().signOut();
};
