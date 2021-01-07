import firebase from 'firebase'
import * as admin from 'firebase-admin';
//import { mockFirebaseAdmin, exposeMockFirebaseAdminApp } from 'ts-mock-firebase';
const { mockFirebaseAdmin, exposeMockFirebaseAdminApp } = require('ts-mock-firebase')

import * as API from '../src/firebase/firebaseAPI'


const firebaseAdmin = mockFirebaseAdmin();

let firebaseApp;

// if (!firebaseAdmin.apps.length) {
//     firebaseApp = firebaseAdmin.initializeApp({});
// } else {
firebaseApp = firebaseAdmin.app(); // if already initialized, use that one
// }

const mocked = exposeMockFirebaseAdminApp(firebaseApp);


describe('Api Functions', () => {
    afterEach(() => {
        mocked.firestore().mocker.reset();
    });
    afterAll(() => {
        firebaseApp.app().delete();
    });
    describe("GET - once tested, can be used to test others", () => {
        test("getHouseTasks", async () => {
            mocked.firestore().mocker.loadCollection('houses/testHouse/tasks', {
                task1: {
                    name: 'testTask1',
                    points: 1,
                    completed: false,
                    userId: "testUser1"
                }
            })

            const res = await API.getHouseTasks("testHouse");

            expect(res).toStrictEqual([{
                name: 'testTask1',
                points: 1,
                completed: false,
                userId: "testUser1"
            }])
        })

        test("getHouseFields", async () => {
            mocked.firestore().mocker.loadDocument('houses/testHouse', {
                lastStart: 1234,
                tasksAssigned: false,
                name: "testHouse"
            })

            const res = await API.getHouseFields("testHouse");

            expect(res).toStrictEqual({
                lastStart: 1234,
                tasksAssigned: false,
                name: "testHouse"
            })
        })

        test("getUserTasks", async () => {
            mocked.firestore().mocker.loadCollection('houses/testHouse/tasks', {
                task1: {
                    name: 'testTask1',
                    points: 1,
                    completed: false,
                    userId: "testUser1"
                },
                task1: {
                    name: 'testTask2',
                    points: 1,
                    completed: false,
                    userId: "testUser2"
                }
            })

            const res = await API.getUserTasks("testHouse", "testUser2");

            expect(res).toStrictEqual([{
                name: 'testTask2',
                points: 1,
                completed: false,
                userId: "testUser2"
            }])
        })

        test("getHouseUsers", async () => {
            mocked.firestore().mocker.loadCollection('users', {
                user1: {
                    id: "1a",
                    houseId: "testHouse1"
                },
                user2: {
                    id: "2b",
                    houseId: "testHouse2"
                }
            })

            const res = await API.getHouseUsers("testHouse2");

            expect(res).toStrictEqual([{
                id: "2b",
                houseId: "testHouse2"
            }])
        })

        test("getHouseData", async () => {
            mocked.firestore().mocker.loadCollection('houses/testHouse/tasks', {
                task1: {
                    name: 'testTask1',
                    points: 1,
                    completed: false,
                    userId: "testUser1"
                }
            })
            mocked.firestore().mocker.loadCollection('users', {
                user1: {
                    id: "1a",
                    houseId: "testHouse1"
                },
                user2: {
                    id: "2b",
                    houseId: "testHouse"
                }
            })
            mocked.firestore().mocker.loadDocument('houses/testHouse', {
                lastStart: 1234,
                tasksAssigned: false,
                name: "testHouse"
            })


            const res = await API.getHouseData("testHouse");

            expect(res).toStrictEqual({
                lastStart: 1234,
                tasksAssigned: false,
                house: "testHouse",
                tasks: [{
                    name: 'testTask1',
                    points: 1,
                    completed: false,
                    userId: "testUser1"
                }],
                usersInHouse: [{
                    id: "2b",
                    houseId: "testHouse"
                }]
            })
        })


    })

    describe("SET - adding new users, tasks, houses", () => {
        test("createHouse", async () => {
            const testHouse = await API.createHouse("house1", "user1");

            const storedHouse = await API.getHouseFields("house1");

            expect(storedHouse).toStrictEqual(testHouse);
        })

        test("addUserToHouse", async () => {
            const newUser = await API.createUser("user2");
            const testHouse = await API.createHouse("house1", "user1");
            const userId = await API.addUserToHouse("house1", "user2")

            const storedUser = await API.getUserFields("user2");
            newUser.houseId = "house1";

            expect(storedUser).toStrictEqual(newUser);
        })

        test("createTask, assignTask, completeTask, removeTask", async () => {
            const newTask = await API.createTask("house1", "task1", 5);

            const storedTask = await API.getHouseTasks("house1");

            // creates task
            expect(newTask).toStrictEqual(storedTask[0]);

            // assigns task
            await API.assignTask("house1", "task1", "user1");
            const storedTaskAssigned = await API.getHouseTasks("house1");
            expect(storedTaskAssigned[0].userId).toBe("user1")

            // marks task as completed
            const user = await API.createUser("user1");
            await API.completeTask("house1", "task1");
            const storedTaskCompleted = await API.getHouseTasks("house1");
            expect(storedTaskCompleted[0].completed).toBe(true)

            // awards points
            const updatedUser = await API.getUserFields("user1");
            expect(updatedUser.points).toBe(5)

            // resets task
            await API.resetTask("house1", "task1");
            const storedTaskReset = await API.getHouseTasks("house1");
            expect(storedTaskReset[0].completed).toBe(false)
            expect(storedTaskReset[0].userId).toBe("")
        })

        test("addWildcardToUser", async () => {
            mocked.firestore().mocker.loadCollection('wildCards', {
                wildCard1: {
                    name: 'testTask1'
                }
            })

            const wildCard = await API.addWildcardToUser("wildCard1", "user1");
            const userWildcards = await API.getUserWildcards("user1")

            expect(userWildcards[0]).toStrictEqual(wildCard)
        })

        test("setAssignTime", async () => {
            const testHouse = await API.createHouse("testHouse", "user1")

            const newTime = await API.setAssignTime("testHouse");
            const storedHouse = await API.getHouseFields("testHouse");
            expect(storedHouse.lastStart).toStrictEqual(newTime)
        })
    })

    describe("UPDATE - updating values", () => {

    })
})