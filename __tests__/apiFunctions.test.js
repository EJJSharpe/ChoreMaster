import firebase from 'firebase'
import { exposeMockFirebaseAdminApp } from 'ts-mock-firebase';

import * as API from '../src/firebase/firebaseAPI'

const firebaseApp = firebase.initializeApp({});
const mocked = exposeMockFirebaseAdminApp(firebaseApp);

describe('Api Functions', () => {
    afterEach(() => {
        mocked.firestore().mocker.reset();
    });

    test("getHouseTasks", async () => {
        mocked.firestore().mocker.loadCollection('houses/testHouse/tasks', {
            task1: {
                name: "testTask1"
            }
        })

        const res = await API.getHouseTasks("testHouse");

        expect(res).toStrictEqual(["testTask1"])
    })
})