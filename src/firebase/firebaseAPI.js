import { apisAreAvailable } from 'expo'
import { firebase } from './config'

const wildcards = ["shuffle", "swap", "skip"];

export const setHost = async (userId) => {
    await firebase.firestore().collection('users').doc(userId)
        .update({ host: true })
}

export const createHouse = async (name, userId, usersFullName) => {
    const newHouse = {
        lastStart: "",
        tasksAssigned: false,
        name: name,
        finishedUsers: ["placeholder"],
        users: [usersFullName],
        houseStage: "lobby",
        currentTurnUser: usersFullName,
    }
    //todo add check for exist, prevent
    await firebase.firestore().collection('houses').doc(name)
        .set(newHouse)

    //add creator, as in logged in user
    addUserToHouse(name, userId, usersFullName, true);

    //set the users host value to be true
    setHost(userId)

    return newHouse;
}

export const setUserFinished = async (house, userName) => {
    console.log(house, " house, Setting finished ", userName);
    await firebase.firestore().collection('houses').doc(house)
        .update({ finishedUsers: firebase.firestore.FieldValue.arrayUnion(userName) })
}

export const incrementTurnUser = async (house) => {
    const houseData = await getHouseFields(house);
    const { finishedUsers, users, currentTurnUser } = houseData;

    const currTurnUserIndex = users.indexOf(currentTurnUser);

    // if current user is last of array, set to 0, if not, increment
    let newTurnUserIndex = currTurnUserIndex === users.length - 1 ? 0 : currTurnUserIndex + 1;
    let newTurnUser = users[newTurnUserIndex];

    if (finishedUsers.length - 1 === users.length) {
        // if all users are in finished array, return
        //  false, so it doesnt get stuck in loop
        console.log("No users left unfinished")
        return false;
    }

    // if user has already finished, moves to next
    if (finishedUsers.includes(newTurnUser)) {
        console.log("User already in finished, getting next user")
        newTurnUserIndex = currTurnUserIndex === users.length - 1 ? 0 : currTurnUserIndex + 1;
        newTurnUser = users[newTurnUserIndex];
    }

    await firebase.firestore().collection('houses').doc(house)
        .update({ currentTurnUser: newTurnUser })

    return true;
}

export const createUser = async (userId) => {
    const newUser = {
        avatar: "",
        email: "",
        fullName: "",
        houseId: "",
        id: userId,
        points: 0,
        host: false,
        wildcards: ["None"]
    }
    await firebase.firestore().collection('users').doc(userId)
        .set(newUser);
    console.log(newUser);
    return newUser;
}

export const setHouseStage = async (houseId, newState) => {
    await firebase.firestore().collection('houses').doc(houseId)
        .update({ houseStage: newState })
}


export const addUserToHouse = async (house, userId, fullName, host = false) => {
    // find user by userId, edit houseId
    await firebase.firestore().collection('users').doc(userId)
        .update({ houseId: house, host: host });
    if (!host) {
        await firebase.firestore().collection('houses').doc(house)
            .update({ users: firebase.firestore.FieldValue.arrayUnion(fullName) })
    }
    return userId
}

export const incrementUserPoints = async (userId, increment) => {
    await firebase.firestore().collection('users').doc(userId)
        .update({ points: firebase.firestore.FieldValue.increment(increment) });
    return increment;
}

export const createTask = async (house, taskName, points) => {
    // create new doc in collection "tasks" in house, with completed, name, points, userId
    console.log(house, taskName, points)
    const newTask = {
        name: taskName,
        points: points,
        completed: false,
        userId: ""
    }
    await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskName)
        .set(newTask);
    return newTask;
}

export const assignTask = async (house, taskId, userId) => {
    // find task doc and edit userId
    await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ userId });
    return taskId;
}

export const completeTask = async (house, taskId) => {
    // find task, change completed to true, and add points to user points
    firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ completed: true });
    const task = await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
    const taskData = await task.get()
    let { points, userId } = taskData.data();
    points = parseInt(points)
    console.log(points)
    //update points
    const userData = await getUserFields(userId);

    const userRef = await firebase.firestore().collection("users").doc(userData.id);

    const res = await userRef.update({ points: userData.points + points })

    return taskData;
}

export const resetTask = async (house, taskId) => {
    // find task, set completed to false, remove userId
    await firebase.firestore().collection('houses').doc(house).collection("tasks").doc(taskId)
        .update({ completed: false, userId: "" });
    return taskId;
}

export const addWildcardToUser = async (wildcardStr, userId) => {
    // add wildcard to "wildcards" collection on user doc
    const userData = await getUserFields(userId);
    const arr = userData.wildcards || [];
    arr.push(wildcardStr);
    firebase.firestore().collection('users').doc(userId)
        .update({ wildcards: arr })
    return wildcardStr;
}

export const removeWildcardFromUser = async (wildcardStr, userId) => {
    console.log(wildcardStr, userId, 'check')
    // remove wildcard to "wildcards" collection on user doc
    const user = await getUserFields(userId);
    const wildcardsArr = user.wildcards;
    wildcardsArr.splice(wildcardsArr.indexOf(wildcardStr), 1);
    firebase.firestore().collection('users').doc(userId)
        .update({ wildcards: wildcardsArr })

    return wildcardsArr;
}

export const setAssignTime = async (house) => {
    //set house lastStart date to now
    const currTime = new Date();
    await firebase.firestore().collection('houses').doc(house)
        .update({ lastStart: currTime })
    return currTime;
}

export const setTasksAssignedBool = async (house, bool) => {
    await firebase.firestore().collection('houses').doc(house)
        .update({ tasksAssigned: bool })
    return bool;
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
    const wildcardsRef = await firebase.firestore().collection('users').doc(userId)
    //removed .collection('wildcards') from the end of this one
    const doc = await wildcardsRef.get();
    const wildcardsArr = doc.data().wildcards
    // doc.forEach(doc => wildcardsArr.push(doc.data()))
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

export const createMultipleTasks = async (house, taskArr) => {
    for (let task of taskArr) {
        createTask(house, task.task, task.points)
    }
    return true;
}

export const shareOutTasks = async (house) => {
    const users = await getHouseUsers(house);
    const tasks = await getHouseTasks(house);
    shuffleArray(users);
    shuffleArray(tasks);
    for (let i = 0; i < tasks.length; i++) {
        // iterates through tasks, giving to users in a loop
        const task = tasks[i]
        const user = users[i % users.length]
        assignTask(house, task.name, user.id);
    }
}

export const shareOutWildcards = async (house) => {
    const users = await getHouseUsers(house);
    shuffleArray(wildcards);
    for (let i = 0; i < users.length; i++) {
        // gives 3 wildcards to each user
        for (let j = 0; j < 3; j++) {
            const randWildCard = wildcards[Math.floor(Math.random() * wildcards.length)];
            await addWildcardToUser(randWildCard, users[i].id);
        }
    }
}


export const shuffleWildcard = async (house) => {
    //shuffle all players tasks (redeal basically)
    shareOutTasks(house)
}

export const swapWildcard = async (house, taskId, userId) => {
    //swap a task with another player
    const users = await getHouseUsers(house);
    console.log(users)
    const otherUsers = users.filter(user => user.id !== userId);

    // selects victim at random, and one of their tasks randomly
    const victim = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    const victimTasks = await getUserTasks(house, victim.id);
    const targetTask = victimTasks[Math.floor(Math.random() * victimTasks.length)];

    //assigns target task to self, and user task to victim
    await assignTask(house, targetTask.name, userId)
    await assignTask(house, taskId, victim.id)

    return targetTask;
}

export const skipTurnWildcard = async () => {
    // skip your turn
    return;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}