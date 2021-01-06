import firebase from 'firebase'
import * as admin from 'firebase-admin';
//import { mockFirebaseAdmin, exposeMockFirebaseAdminApp } from 'ts-mock-firebase';
const { mockFirebaseAdmin, exposeMockFirebaseAdminApp } = require('ts-mock-firebase')

import * as API from '../src/firebase/firebaseAPI'


const firebaseAdmin = mockFirebaseAdmin();

// const mockedFirebase = mockFirebaseAdmin();
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

})