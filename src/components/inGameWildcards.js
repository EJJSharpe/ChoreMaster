import { set } from 'react-native-reanimated';
import * as api from '../firebase/firebaseAPI'


// TASKS DONT CURRENTLY REMOVE TASK FROM WILDCARDS ARRAY
export const Shuffle = (props) => {
    const [modal, setModal] = useState(false)
    const { index } = props;

    const onPress = () => {
        setModal(!modal)
        api.shuffleWildcard()
    }


    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>You used the Shuffle Wildcard!</Text>
                    <Button onPress={() => { setModal(!modal) }} title="OK" />
                </View>
            </Modal>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/shuffle.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

export const Swap = (props) => {
    const [modal, setModal] = useState(false)
    const [tasksList, setTasksList] = useState([])
    const [secondModal, setSecondModal] = useState('')

    const { index, houseName, userId } = props;

    const onPress = () => {
        api.getUserTasks(user.houseId, user.id)
            .then(tasks => {
                setTasksList(tasks)
                setModal(!shuffleModal)
            })
    }

    const onTaskSelect = (taskName) => {
        api.swapWildcard(houseName, taskName, userId)
        setModal(!modal)
    }

    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Select a task to swap</Text>
                    <ScrollView style={styles.tasksSectionContainer}>
                        {
                            tasksList.map(({ name, points, completed }, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.taskContainer} onPress={() => { onTaskSelect(name) }}>
                                        <Text style={styles.task}>{name}</Text>
                                        <Text style={styles.pointsValue}>{points}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </Modal>

            <Modal isVisible={secondModal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Wildcard used! Check your tasks!</Text>
                    <Button onPress={() => { setSecondModal(!secondModal) }} title="OK" />
                </View>
            </Modal>



            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/shuffle.png')}
                />
            </TouchableOpacity>
        </View >
    );
}

export const Skip = (props) => {
    const [modal, setModal] = useState(false)
    const { index } = props;

    const onPress = () => {

        // NEED LOGIC HERE TO SKIP THEIR TURN AND REMOVE WILDCARD FROM THEIR WILDCARDS ARRAY
        setModal(!modal)
    }


    return (
        <View>
            <Modal isVisible={modal}>
                <View style={styles.modalView}>
                    <Text style={styles.instructionsText}>Tap Ok to use the Skip Wildcard!</Text>
                    <Button onPress={() => { setModal(!modal) }} title="OK" />
                </View>
            </Modal>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{ height: 150, width: 100, resizeMode: 'contain', alignSelf: 'center', marginRight: 5, marginLeft: 5 }}
                    source={require('../images/skip.png')}
                />
            </TouchableOpacity>
        </View >
    );
}