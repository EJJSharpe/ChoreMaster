import { firebase } from './config'

export const createHouse = async (name, userId) => {
    const newHouse = {
        lastStart: null,
        tasksAssigned: false,
        name: name
    }
    //todo add check for exist, prevent
    await firebase.firestore().collection('houses').doc(name).set(newHouse)
    console.log(name + " house created");
    //add creator, as in logged in user
    addUserToHouse(name, userId);
    return name;
}

export const addUserToHouse = (house, userId) => {
    // find user by userId, edit houseId
    firebase.firestore().collection('users').doc(userId).update({ houseId, house });
}

export const createTask = (house, taskName, points) => {
    // create new doc in collection "tasks" in house, with completed, name, points, userId
    const newTask = {
        name: taskName,
        points: points,
        completed: false,
        userId: null
    }
    firebase.firestore().collection('houses').doc(house).collection("tasks")
        .set(newTask);

}

export const assignTask = (house, taskId, userId) => {
    // find task doc and edit userId
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ userId });
}

export const completeTask = async (taskId) => {
    // find task, change completed to true, and add points to user points
    firebase.firestore().collection('houses').doc(house).collection("tasks")
        .update({ completed: true });
    const task = await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
    const taskData = task.get().data();
    const { points, userId } = taskData;
    //update points
    const userRef = await firebase.firestore().collection("users").doc(taskData.userId);
    const res = await userRef.update({ points: firebase.firestore.FieldValue.increment(points) });
}

export const resetTask = (house, taskId) => {
    // find task, set completed to false, remove userId
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ completed: false, userId: "" });
}

export const addWildcardToUser = async (wildCardId, userId) => {
    // add wildcard to "wildcards" collection on user doc
    const wildCard = await firebase.firestore().collection('wildCards').doc(wildCardId).data();
    wildCard.used = false;
    firebase.firestore().collection('users').doc(userId).collection('wildCards').doc(wildCardId).set(wildCard);
}

export const setAssignTime = (house) => {
    //set house lastStart date to now
    firebase.firestore().collection('houses').doc(house).update({ lastStart: new Date() })
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
    test.testSpeak();
    return data;
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

// todo send array of tasks