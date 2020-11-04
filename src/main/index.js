import React,  {useEffect, useState, } from 'react'
import {
    TouchableOpacity, View, Text, Modal,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont()
import DropDownPicker  from 'react-native-dropdown-picker'
import uuid from 'react-native-uuid'
import {useDispatch,useSelector} from 'react-redux'

import {add_data, remove_data} from '../_redux/actions/utility'

export default function Main(props) {
    const dispatch = useDispatch()
    const {offlineData} = useSelector(state => state.utility)

    const [modalAdd, setModalAdd] = useState(false)
    const [allow, setAllow] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [state, setState] = useState({value:''})
    const [question, setQuestion] = useState('')
    const [answerOption, setAnswerOption] = useState('')


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

    useEffect(()=>{
        console.log(JSON.stringify(offlineData))
    },[])

    return(
        <>
            <View style={{flex: 1, backgroundColor: '#f7f7f7', justifyContent: 'flex-start', padding: 20, paddingTop: 50,}}>
                {
                    offlineData.length > 0 &&
                    offlineData.map((item, i) => {
                        return(
                            <TouchableOpacity key={i} style={{backgroundColor: 'white', padding: 15, marginVertical: 5, borderRadius: 8,}}>
                                <Text>{item.id}</Text>
                                <Text>{item.question}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
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
                    {/* <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: 10, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 8,}}>
                        <Text style={{color: '#666370', fontSize: 12,}}>Must Select</Text>
                        <Icon name='arrow-drop-down' size={25} />
                    </TouchableOpacity> */}
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
        </>
    )

}