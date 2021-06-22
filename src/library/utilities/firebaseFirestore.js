import firebase from "library/api/firebaseConfig";

export const createDataWithoutDocumentID = async ({ collectionName, data }) =>
    await firebase.firestore().collection(collectionName).add(data);

export const createDataWithDocumentID = async ({
    collectionName,
    documentID,
    data,
}) => firebase.firestore().collection(collectionName).doc(documentID).set(data);

export const updateDataWithDocumentID = async ({
    collectionName,
    documentID,
    data,
}) =>
    firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .update(data);

export const getDataOfDocument = async ({ collectionName, documentID }) => {
    const getDoc = await firebase
        .firestore()
        .collection(collectionName)
        .doc(documentID)
        .get();
    return getDoc.data();
};

export const deleteDocumentWithDocumentID = async ({
    collectionName,
    documentID,
}) => firebase.firestore().collection(collectionName).doc(documentID).delete();

//User Collection
export const createUserData = async ({ id, data }) =>
    await createDataWithDocumentID({
        collectionName: "users",
        documentID: id,
        data: data,
    });

export const updateUserData = async ({ id, data }) =>
    await updateDataWithDocumentID({
        collectionName: "users",
        documentID: id,
        data: data,
    });

export const getUserData = async (id) =>
    await getDataOfDocument({
        collectionName: "users",
        documentID: id,
    });

//Group Collection
export const createGroupData = async ({ data }) => {
    return await createDataWithoutDocumentID({
        collectionName: "groups",
        data: data,
    });
};

export const addUserToGroupData = async ({ documentID, data }) =>
    await updateDataWithDocumentID({
        collectionName: "groups",
        documentID: documentID,
        data: {
            userList: firebase.firestore.FieldValue.arrayUnion(data),
        },
    });

export const removeUserToGroupData = async ({ documentID, data }) =>
    await updateDataWithDocumentID({
        collectionName: "groups",
        documentID: documentID,
        data: {
            userList: firebase.firestore.FieldValue.arrayRemove(data),
        },
    });

export const getGroupData = async ({ documentID }) =>
    await getDataOfDocument({
        collectionName: "groups",
        documentID: documentID,
    });

export const updateFirestoreGroupData = async ({ documentID, data }) =>
    await updateDataWithDocumentID({
        collectionName: "groups",
        documentID: documentID,
        data: data,
    });

export const deleteGroupData = async ({ documentID }) =>
    await deleteDocumentWithDocumentID({
        collectionName: "groups",
        documentID: documentID,
    });
