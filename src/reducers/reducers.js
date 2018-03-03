import { combineReducers } from 'redux';
import {
    SELECT_ITEM,
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    INVALIDATE_ITEMTYPE
} from '../actions/actions';
import IceAndFireUtils from '../utils/IceAndFireUtils';

const items = (
    state = {
        idFetching: false,
        didInvalidate: false,
        items: []
    }, action) => {
    switch (action.type) {
        case INVALIDATE_ITEMTYPE:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_ITEMS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ITEMS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

const itemsByType = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ITEMS:
        case RECEIVE_ITEMS:
        case INVALIDATE_ITEMTYPE:
            return Object.assign({}, state, {
                [action.itemType]: items(state[action.itemType], action)
            })

        default:
            return state;
    }
}

const selectedItem = (state = {}, action) => {
    switch (action.type) {
        case SELECT_ITEM:
            let temp = action.list[action.itemType].items.filter(item => action.id.toString() === IceAndFireUtils.getIdFromUrl(item.url));
            temp = temp.length > 0 ? temp[0] : {}
            const test = Object.assign({}, state, {
                [action.itemType]: temp
            })
            console.log(test)
            return test

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    itemsByType,
    selectedItem
})

export default rootReducer