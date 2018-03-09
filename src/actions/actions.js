import IceAndFireApiService from "../services/IceAndFireApiService";
import IceAndFireUtils from "../utils/IceAndFireUtils";

export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const INVALIDATE_ITEMTYPE = 'INVALIDATE_ITEMTYPE'
export const SELECT_ITEM = 'SELECT_ITEM'

function fetchItems(itemType, id, page) {
    return dispatch => {
        dispatch(requestItems(itemType))
        return IceAndFireApiService.getFireAndIceDetail(itemType, id, page)
            .then(items => {
                console.log(items)

                items.first = IceAndFireUtils.getQueryParamAsObject(items.first).get('page') || 1
                items.last = IceAndFireUtils.getQueryParamAsObject(items.last).get('page') || 1
                items.prev = IceAndFireUtils.getQueryParamAsObject(items.prev).get('page') || 1
                items.next = IceAndFireUtils.getQueryParamAsObject(items.next).get('page') || 1
                items.current = (parseInt(items.next) > 1) ? parseInt(items.next) - 1 : 1
                dispatch(receiveItems(itemType, items))
            }
            )
    }
}

const requestItems = (itemType) => ({
    type: REQUEST_ITEMS,
    itemType
})

const receiveItems = (itemType, items) => ({
    type: RECEIVE_ITEMS,
    itemType,
    items: items['items'],
    next: items['next'],
    last: items['last'],
    prev: items['prev'],
    first: items['first'],
    current: items.current,
    receivedAt: Date.now()
})

const shouldFetchItems = (state, itemType, page) => {
    console.log(state)
    console.log(itemType)
    const items = state.itemsByType[itemType]
    if (!items || items.current !== page) {
        return true
    } else if (items.isFetching) {
        return false
    } else {
        return items.didInvalidate
    }
}

export function fetchItemsIfNeeded(itemType, page) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), itemType, page)) {
            return dispatch(fetchItems(itemType, "", page))
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

const shouldFetchItem = (state, itemType, id) => {
    console.log(state)
    console.log(itemType)
    const items = state.itemsByType[itemType]
    if (!items || items.filter(item=>IceAndFireUtils.getIdFromUrl(item.url) === id)) {
        return true
    } else if (items.isFetching) {
        return false
    } else {
        return items.didInvalidate
    }
}

export function fetchItemIfNeeded(itemType, id) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), itemType, id)) {
            return dispatch(fetchItems(itemType, id,""))
        } else {
            return Promise.resolve({})
        }
    }
}


export const selectedItem = (itemType, id) => {
    return (dispatch, getState) => {
        dispatch(selectItem(getState().itemsByType, itemType, id))
    }
}