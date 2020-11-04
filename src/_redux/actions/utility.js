import constants from '../../_configs/constants'

export const add_data = data => ({
    type: constants.ADD_ITEM,
    payload: data
})

export const remove_data = id => ({
    type: constants.REMOVE_ITEM,
    payload: id
})