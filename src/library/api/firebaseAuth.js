import firebase from "library/api/firebaseConfig";

const createUserWithEmailAndPassword = async (email, password) => {
    return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
};

const signInWithEmailAndPassword = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
};

const signUserOut = async () => {
    await firebase.auth().signOut();
};

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signUserOut,
};
