import firebase from "library/api/firebaseConfig";

const createDataWithoutDocumentID = async ({ collectionName, data }) => {
    return firebase.firestore.collection(collectionName).doc().set(data);
};

const createDataWithDocumentID = async ({
    collectionName,
    documentID,
    data,
}) => {
    return firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .set(data);
};

const getDataOfDocument = async ({ collectionName, documentID }) => {
    const getDoc = await firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .get();
    return getDoc.data();
};

const getUserData = async (id) =>
    await getDataOfDocument({
        collectionName: "users",
        documentID: id,
    });

export {
    createDataWithoutDocumentID,
    createDataWithDocumentID,
    getDataOfDocument,
    getUserData,
};
