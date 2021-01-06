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

    test("getHouseTasks", async () => {
        mocked.firestore().mocker.loadCollection('houses/testHouse/tasks', {
            doc1: {
                title: 'content of the first document in collection',
            },
            doc2: {
                title: 'content of the second document in collection',
                value: 2,
            }
        })


        const tasksRef = mocked.firestore().collection('houses').doc("testHouse").collection("tasks");
        const doc = await tasksRef.get();
        const tasksArr = [];
        doc.forEach(doc => tasksArr.push(doc.data()))
        console.log(tasksArr);



        const res = await API.getHouseTasks("testHouse");

        expect(res).toStrictEqual([{
            name: "testTask1"
        }])
    })
})