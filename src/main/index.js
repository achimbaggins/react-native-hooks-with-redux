import React,  {useEffect, useState, } from 'react'
import {
    TouchableOpacity, View, Text, Modal,
    TextInput, Alert, ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()
import DropDownPicker  from 'react-native-dropdown-picker'
import uuid from 'react-native-uuid'
import {useDispatch,useSelector} from 'react-redux'

import {add_data, remove_data, update_data} from '../_redux/actions/utility'

export default function Main(props) {
    const dispatch = useDispatch()
    const {offlineData} = useSelector(state => state.utility)

    const [modalEdit, setModalEdit] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [allow, setAllow] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [state, setState] = useState({value:''})
    const [question, setQuestion] = useState('')
    const [answerOption, setAnswerOption] = useState('')
    const [selectedID, setSelectedID] = useState('')

    
    const selectForEdit = (origin) => {
        setAnswerOption(origin.answerOption)
        setAllow(origin.allowNone)
        setShuffle(origin.shuffle)
        setQuestion(origin.question)
        setState(origin.respondentOptions)
        setSelectedID(origin.id)
        setModalEdit(true)
    }

    const addItem = () => {
        let data = {
            id : uuid.v1(),
            allowNone: allow,
            shuffle,
            respondentOptions: state,
            question,
            answerOption
        }
        dispatch(add_data(data))
        setModalAdd(false)
    }

    const removeItem = (id) => {
        dispatch(remove_data(id))
    }

    const updateItem = (id) => {
        let data = {
            id,
            allowNone: allow,
            shuffle,
            respondentOptions: state,
            question,
            answerOption
        }
        dispatch(update_data(data))
        setModalEdit(false)
        setAnswerOption('')
        setAllow(false)
        setShuffle(false)
        setQuestion('')
        setState({value: ''})
    }

    useEffect(()=>{
        console.log(JSON.stringify(offlineData))
    },[])

    return(
        <>
            <View style={{flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'flex-start', padding: 20, paddingTop: 50,}}>
                <ScrollView>

                    {
                        offlineData.length > 0 &&
                        offlineData.map((item, i) => {
                            return(
                                <View key={i} style={{backgroundColor: 'white', padding: 15, marginVertical: 5, borderRadius: 8,}}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                        <View style={{padding: 10, paddingVertical: 3, borderRadius: 25, backgroundColor: '#4a4a4a', justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{color: 'white'}}>Question #{i+1}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',}}>
                                            <TouchableOpacity onPress={() => selectForEdit(item)} style={{padding: 10, paddingVertical: 3, borderRadius: 25, backgroundColor: 'orange', justifyContent:'center', alignItems:'center'}}>
                                                <Text style={{color: 'white'}}>Edit</Text>
                                            </TouchableOpacity>
                                            <View style={{height: 5, width: 10,}}/>
                                            <TouchableOpacity onPress={()=>{
                                                Alert.alert(
                                                    'Please Confirm',
                                                    'Are you sure to delete this item?',
                                                    [
                                                        {text: 'Cancel', onPress: () => null},
                                                        {text: 'Delete', onPress: () => removeItem(item.id)},
                                                    ]
                                                )
                                            }} style={{padding: 10, paddingVertical: 3, borderRadius: 25, backgroundColor: '#f72c25', justifyContent:'center', alignItems:'center'}}>
                                                <Text style={{color: 'white'}}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{height: 10, width: 10,}}/>
                                    <Text style={{color: '#4a4a4a', fontSize: 18}}>{item.question}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <TouchableOpacity onPress={()=>setModalAdd(true)} style={{backgroundColor: '#50BD58', alignSelf:'stretch', height: 62, justifyContent:'center', alignItems: 'center', borderRadius: 0,}}>
                <Text style={{color: 'white', fontSize: 16,}}>Add Question</Text>
            </TouchableOpacity>
            <Modal transparent animationType='slide' visible={modalAdd}>
                <View style={{flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'flex-start', padding: 20, paddingTop: 50,}}>
                    <Text style={{color: '#666370', fontSize: 16, marginBottom: 10,}}>Question</Text>
                    <TextInput onChangeText={v => setQuestion(v)} style={{padding: 10, justifyContent:'flex-start', width: '100%', height: 100, backgroundColor: '#ffffff', borderRadius: 8}} placeholder={'type your question here'}/>
                    <View style={{height: 20,}}/>
                    <Text style={{color: '#666370', fontSize: 16, marginBottom: 10,}}>Respondent Options</Text>
                    <DropDownPicker
                        items={[
                            {label: 'May Select', value: 'mas',  },
                            {label: 'Must Select', value: 'mus',  },
                            {label: 'Terminate if Select', value: 'tis', },
                        ]}
                        defaultValue={state.value}
                        containerStyle={{height: 40}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        onChangeItem={item => setState(item)}
                    />
                    <View style={{height: 10,}}/>
                    <TextInput onChangeText={v => setAnswerOption(v)} style={{padding: 10, justifyContent:'flex-start', width: '100%', height: 70, backgroundColor: '#ffffff', borderRadius: 8}} placeholder={'Enter answer option'}/>
                    <View style={{height: 20,}}/>
                    <TouchableOpacity onPress={()=>setAllow(!allow)} style={{flexDirection: 'row', alignItems:'center'}}>
                        <Icon name={ allow ? 'check-box' : 'check-box-outline-blank'} color={allow ? '#50BD58' : '#d5d5d5' } size={25}/>
                        <Text style={{color: '#666370', fontSize: 16,}}>Allow "None of the above"</Text>
                    </TouchableOpacity>
                    <View style={{height: 20,}}/>
                    <TouchableOpacity onPress={()=>setShuffle(!shuffle)} style={{flexDirection: 'row', alignItems:'center'}}>
                        <Icon name={shuffle ? 'check-box' : 'check-box-outline-blank'} color={shuffle ? '#50BD58' : '#d5d5d5'} size={25}/>
                        <Text style={{color: '#666370', fontSize: 16,}}>Shuffle the order</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>setModalAdd(false)} style={{flex: 1, backgroundColor: '#f72c25', height: 62, justifyContent:'center', alignItems: 'center', borderRadius: 0,}}>
                        <Text style={{color: 'white', fontSize: 16,}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addItem} style={{flex: 1, backgroundColor: '#50BD58', height: 62, justifyContent:'center', alignItems: 'center', borderRadius: 0,}}>
                        <Text style={{color: 'white', fontSize: 16,}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal transparent animationType='slide' visible={modalEdit}>
                <View style={{flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'flex-start', padding: 20, paddingTop: 50,}}>
                    <Text style={{color: '#666370', fontSize: 16, marginBottom: 10,}}>Question</Text>
                    <TextInput value={question} onChangeText={v => setQuestion(v)} style={{padding: 10, justifyContent:'flex-start', width: '100%', height: 100, backgroundColor: '#ffffff', borderRadius: 8}} placeholder={'type your question here'}/>
                    <View style={{height: 20,}}/>
                    <Text style={{color: '#666370', fontSize: 16, marginBottom: 10,}}>Respondent Options</Text>
                    <DropDownPicker
                        items={[
                            {label: 'May Select', value: 'mas',  },
                            {label: 'Must Select', value: 'mus',  },
                            {label: 'Terminate if Select', value: 'tis', },
                        ]}
                        defaultValue={state.value}
                        containerStyle={{height: 40}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        onChangeItem={item => setState(item)}
                    />
                    <View style={{height: 10,}}/>
                    <TextInput value={answerOption} onChangeText={v => setAnswerOption(v)} style={{padding: 10, justifyContent:'flex-start', width: '100%', height: 70, backgroundColor: '#ffffff', borderRadius: 8}} placeholder={'Enter answer option'}/>
                    <View style={{height: 20,}}/>
                    <TouchableOpacity onPress={()=>setAllow(!allow)} style={{flexDirection: 'row', alignItems:'center'}}>
                        <Icon name={ allow ? 'check-box' : 'check-box-outline-blank'} color={allow ? '#50BD58' : '#d5d5d5' } size={25}/>
                        <Text style={{color: '#666370', fontSize: 16,}}>Allow "None of the above"</Text>
                    </TouchableOpacity>
                    <View style={{height: 20,}}/>
                    <TouchableOpacity onPress={()=>setShuffle(!shuffle)} style={{flexDirection: 'row', alignItems:'center'}}>
                        <Icon name={shuffle ? 'check-box' : 'check-box-outline-blank'} color={shuffle ? '#50BD58' : '#d5d5d5'} size={25}/>
                        <Text style={{color: '#666370', fontSize: 16,}}>Shuffle the order</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>setModalEdit(false)} style={{flex: 1, backgroundColor: '#f72c25', height: 62, justifyContent:'center', alignItems: 'center', borderRadius: 0,}}>
                        <Text style={{color: 'white', fontSize: 16,}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateItem(selectedID)} style={{flex: 1, backgroundColor: '#50BD58', height: 62, justifyContent:'center', alignItems: 'center', borderRadius: 0,}}>
                        <Text style={{color: 'white', fontSize: 16,}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )

}