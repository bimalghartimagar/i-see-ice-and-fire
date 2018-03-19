import IceAndFireApiService from "../services/IceAndFireApiService";
import IceAndFireUtils from "../utils/IceAndFireUtils";
export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const INVALIDATE_ITEMTYPE = 'INVALIDATE_ITEMTYPE'
export const SELECT_ITEM = 'SELECT_ITEM'

function fetchItems(state, itemType, id, page) {
    return dispatch => {
        dispatch(requestItems(itemType))
        return IceAndFireApiService.getFireAndIceDetail(itemType, id, page)
            .then(items => {
                console.log(items)

                items.first = IceAndFireUtils.getQueryParamAsObject(items.first).get('page') || "1";
                items.last = IceAndFireUtils.getQueryParamAsObject(items.last).get('page') || "1";
                items.prev = IceAndFireUtils.getQueryParamAsObject(items.prev).get('page') || items.first;
                items.next = IceAndFireUtils.getQueryParamAsObject(items.next).get('page') || items.last;
                items.current = (parseInt(items.next, 10) === parseInt(items.last, 10) && parseInt(items.next, 10) - 1 === parseInt(items.prev, 10))
                    ? (parseInt(items.last, 10)).toString()
                    : (parseInt(items.next, 10) - 1 < parseInt(items.last, 10))
                        ? (parseInt(items.next, 10) - 1).toString()
                        : "1"
                dispatch(receiveItems(state, itemType, items))
            }
            )
    }
}

const requestItems = (itemType) => ({
    type: REQUEST_ITEMS,
    itemType
})

const receiveItems = (state, itemType, items) => {
    return {
        type: RECEIVE_ITEMS,
        itemType,
        items: items['items'],
        next: items['next'],
        last: items['last'],
        prev: items['prev'],
        first: items['first'],
        current: items.current,
        receivedAt: Date.now()
    }
}

const shouldFetchItems = (state, itemType, page, id) => {
    console.log(state)
    console.log(itemType)
    const items = state.itemsByType[itemType]

    if (!items
        || items.items.length < 10
        || (id !== "" && items.items.filter(item => IceAndFireUtils.getIdFromUrl(item.url) === id).length === 0)
        || ((page !== null && page !== "") && items.current !== page)) {
        return true
    } else if (items.isFetching) {
        return false
    } else {
        return items.didInvalidate
    }
}

export function fetchItemsIfNeeded(itemType, page = "", id = "") {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), itemType, page, id)) {
            return dispatch(fetchItems(getState(), itemType, id, page))
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