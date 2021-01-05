import {
    firebase
} from './config.js'


export const createHouse = (name) => {
    const newHouse = {
        lastStart: null,
        tasksAssigned: false,
        name: name
    }
    //todo add check for exist
    firebase.firestore().collection('houses').doc(name).set(newHouse)
        .then(() => {
            console.log(name + " house created");
        })
        .catch(console.log);
}

export const addUserToHouse = (house, userId) => {
    // find user by userId, edit houseId
}

export const createTask = (house, taskName, points) => {
    // create new doc in collection "tasks" in house, with completed, name, points, userId
}

export const assignTask = (taskId, userId) => {
    // find task doc and edit userId
}

export const completeTask = (taskId) => {
    // find task, change completed to true, and add points to user points
}

export const resetTask = (taskId) => {
    // find task, set completed to false, remove userId
}

export const addWildcardToUser = (wildCardId, userId) => {
    // add wildcard to "wildcards" collection on user doc
}