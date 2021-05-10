import firebase from "library/api/firebaseConfig";

const createDataWithoutDocumentID = async ({ collectionName, data }) =>
    await firebase.firestore().collection(collectionName).add(data);

const createDataWithDocumentID = async ({ collectionName, documentID, data }) =>
    firebase.firestore().collection(collectionName).doc(documentID).set(data);

const updateDataWithDocumentID = async ({ collectionName, documentID, data }) =>
    firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .update(data);

const getDataOfDocument = async ({ collectionName, documentID }) => {
    const getDoc = await firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .get();
    return getDoc.data();
};

const createUserData = async ({ id, data }) =>
    await createDataWithDocumentID({
        collectionName: "users",
        documentID: id,
        data: data,
    });

const updateUserData = async ({ id, data }) =>
    await updateDataWithDocumentID({
        collectionName: "users",
        documentID: id,
        data: data,
    });

const getUserData = async (id) =>
    await getDataOfDocument({
        collectionName: "users",
        documentID: id,
    });

const createGroupData = async ({ data }) => {
    return await createDataWithoutDocumentID({
        collectionName: "groups",
        data: data,
    });
};

const joinGroupData = async ({ documentID, data }) =>
    await updateDataWithDocumentID({
        collectionName: "groups",
        documentID: documentID,
        data: {
            userSelectedCard: firebase.firestore.FieldValue.arrayUnion(data),
        },
    });

const getGroupData = async ({ documentID }) =>
    await getDataOfDocument({
        collectionName: "groups",
        documentID: documentID,
    });

// const updateGroupData = async ({ id }) =>
//     await updateDataWithDocumentID({
//         collectionName: "groups",
//         documentID: id,
//         data: data,
//     });

export {
    createDataWithoutDocumentID,
    createDataWithDocumentID,
    updateDataWithDocumentID,
    getDataOfDocument,
    createUserData,
    updateUserData,
    getUserData,
    createGroupData,
    joinGroupData,
    getGroupData,
};
