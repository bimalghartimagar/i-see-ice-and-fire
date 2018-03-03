import IceAndFireApiService from "../services/IceAndFireApiService";

export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const INVALIDATE_ITEMTYPE = 'INVALIDATE_ITEMTYPE'
export const SELECT_ITEM = 'SELECT_ITEM'

function fetchItems(itemType) {
    return dispatch => {
        dispatch(requestItems(itemType))
        return IceAndFireApiService.getFireAndIceDetail(itemType)
            .then(items => dispatch(receiveItems(itemType, items)))
    }
}

const requestItems = (itemType) => ({
    type: REQUEST_ITEMS,
    itemType
})

const receiveItems = (itemType, items) => ({
    type: RECEIVE_ITEMS,
    itemType,
    items,
    receivedAt: Date.now()
})

const shouldFetchItems = (state, itemType) => {
    console.log(state)
    console.log(itemType)
    const items = state.itemsByType[itemType]
    if (!items) {
        return true
    } else if (items.isFetching) {
        return false
    } else {
        return items.didInvalidate
    }
}

export function fetchItemsIfNeeded(itemType) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), itemType)) {
            return dispatch(fetchItems(itemType))
        } else {
            return Promise.resolve({})
        }
    }
}

export const invalidateItemType = (itemType) => ({
    type: INVALIDATE_ITEMTYPE,
    itemType
})

export const selectItem = (list, itemType, id) => ({
    type: SELECT_ITEM,
    id,
    list,
    itemType
})

export const selectedItem = (itemType, id) => {
    return (dispatch, getState) => {
        dispatch(selectItem(getState().itemsByType, itemType, id))
    }
}