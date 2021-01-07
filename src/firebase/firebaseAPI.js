import { firebase } from './config'

export const createHouse = async (name, userId) => {
    const newHouse = {
        lastStart: "",
        tasksAssigned: false,
        name: name
    }
    //todo add check for exist, prevent
    await firebase.firestore().collection('houses').doc(name).set(newHouse)

    //add creator, as in logged in user
    addUserToHouse(name, userId);
    return newHouse;
}

export const createUser = async (userId) => {
    const newUser = {
        avatar: "",
        email: "",
        fullName: "",
        houseId: "",
        id: userId,
        points: 0
    }
    await firebase.firestore().collection('users').doc(userId).set(newUser);
    return newUser;
}

export const addUserToHouse = (house, userId) => {
    // find user by userId, edit houseId
    firebase.firestore().collection('users').doc(userId).update({ houseId: house });
    return userId
}

export const createTask = (house, taskName, points) => {
    // create new doc in collection "tasks" in house, with completed, name, points, userId
    const newTask = {
        name: taskName,
        points: points,
        completed: false,
        userId: ""
    }
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskName)
        .set(newTask);
    return newTask;
}

export const assignTask = (house, taskId, userId) => {
    // find task doc and edit userId
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ userId });
    return taskId;
}

export const completeTask = async (house, taskId) => {
    // find task, change completed to true, and add points to user points
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ completed: true });
    const task = await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
    const taskData = await task.get()
    const { points, userId } = taskData.data();

    //update points
    const userData = await getUserFields(userId);

    const userRef = await firebase.firestore().collection("users").doc(userData.id);

    const res = await userRef.update({ points: userData.points + points })

    return taskData;
}

export const resetTask = (house, taskId) => {
    // find task, set completed to false, remove userId
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ completed: false, userId: "" });
    return taskId;
}

export const addWildcardToUser = async (wildCardId, userId) => {
    // add wildcard to "wildcards" collection on user doc
    const wildCardRef = await firebase.firestore().collection('wildCards').doc(wildCardId);
    const doc = await wildCardRef.get();
    const wildCard = doc.data();
    wildCard.used = false;
    firebase.firestore().collection('users').doc(userId).collection('wildCards').doc(wildCardId).set(wildCard);
    return wildCard;
}

export const setAssignTime = async (house) => {
    //set house lastStart date to now
    const currTime = new Date();
    await firebase.firestore().collection('houses').doc(house).update({ lastStart: currTime })
    return currTime;
}

export const getHouseTasks = async (house) => {
    const tasksRef = firebase.firestore().collection('houses').doc(house).collection("tasks");
    const doc = await tasksRef.get();
    const tasksArr = [];
    doc.forEach(doc => tasksArr.push(doc.data()))
    return tasksArr;
}

export const getHouseFields = async (house) => {
    const fieldsRef = await firebase.firestore().collection('houses').doc(house);
    const doc = await fieldsRef.get();
    const data = await doc.data()

    return data;
}

export const getUserFields = async (userId) => {
    const fieldsRef = await firebase.firestore().collection('users').doc(userId);
    const doc = await fieldsRef.get();
    const data = await doc.data()

    return data;
}

export const getUserWildcards = async (userId) => {
    const wildcardsRef = await firebase.firestore().collection('users').doc(userId).collection("wildCards");
    const doc = await wildcardsRef.get();
    const wildcardsArr = [];
    doc.forEach(doc => wildcardsArr.push(doc.data()))

    return wildcardsArr;
}

export const getUserTasks = async (house, userId) => {
    const tasksRef = firebase.firestore().collection('houses').doc(house).collection("tasks");
    const doc = await tasksRef.where('userId', '==', userId).get();
    const tasksArr = [];
    doc.forEach(doc => tasksArr.push(doc.data()));
    return tasksArr;
}

export const getHouseUsers = async (house) => {
    const usersRef = firebase.firestore().collection('users');
    const doc = await usersRef.where('houseId', '==', house).get();
    const usersArr = [];
    doc.forEach(doc => usersArr.push(doc.data()))
    return usersArr;
};

export const getHouseData = async (house) => {
    const usersInHouse = await getHouseUsers(house);

    const tasks = await getHouseTasks(house);

    const { lastStart, tasksAssigned } = await getHouseFields(house);

    const data = {
        house,
        usersInHouse,
        tasks,
        tasksAssigned,
        lastStart
    }
    return data;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}