import { REHYDRATE } from 'redux-persist/lib/constants'
import constants from '../../_configs/constants'

const initialState = {
  offlineData: []
}

const add_item = (state,payload) => {
    let newState = {...state}
    newState.offlineData.unshift(payload)
    return newState
}

const remove_item = (state,id) => {
    let newState = {...state}
    let filtered = newState.offlineData.filter(item => item.id !== id)
    return {...newState, offlineData: filtered}
}

const update_item = (state,payload) => {
    let newState = {...state}
    let modified = newState.offlineData.map(item =>{
      if(item.id == payload.id) {
        console.log('masuk')
        item = {...item,...payload}
      }
      return item
    })
    return {...newState, offlineData: modified}
}

const utilityReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REHYDRATE: return state
    case constants.ADD_ITEM: return add_item(state,payload)
    case constants.REMOVE_ITEM: return remove_item(state,payload)
    case constants.UPDATE_ITEM: return update_item(state,payload)
    default: return state
  }
}

export default utilityReducer
