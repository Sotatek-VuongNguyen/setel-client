const FETCH_DATA = 'fetch-data';
const CHANGE_PAGE_SIZE = 'change-page-size';
const CHANGE_PAGE = 'change-page';
const TOTAL_ORDER = 'total-order';
const SET_TAB = 'set-tab';
const SET_TOAST_SUCCESS = 'set-toast-successs';
const SET_TOAST_FAIL = 'set-toast-fail';
const SET_ORDER = 'set-order';

const INITIAL_STATE = {
    page: 0,
    pageSize: 5,
    total: 0,
    orders: [],
    tab: "0",
    toastSuccess: false,
    toastFail: false,
    toastMessage: '',
    order: {}
};
 
export const fetchData = (items) => ({
    type: FETCH_DATA,
    payload: items
});

export const changePageSize = (number) => ({
    type: CHANGE_PAGE_SIZE,
    payload: number
});

export const changePage = (number) => ({
    type: CHANGE_PAGE,
    payload: number
});

export const totalOrder = (number) => ({
    type: TOTAL_ORDER,
    payload: number
});

export const setTab = (string) => ({
    type: SET_TAB,
    payload: string
});

export const setToastSuccess = (obj) => ({
    type: SET_TOAST_SUCCESS,
    payload: obj
});

export const setToastFail = (obj) => ({
    type: SET_TOAST_FAIL,
    payload: obj
});

export const setOrder = (obj) => ({
    type: SET_ORDER,
    payload: obj
});

export function reducer(state = INITIAL_STATE, action) {
    console.log('action', action)
    switch (action.type) {
        case FETCH_DATA:
            return {...state, orders: action.payload};
        case CHANGE_PAGE_SIZE:
            return {...state, pageSize: action.payload};
        case CHANGE_PAGE:
            return {...state, page: action.payload};
        case TOTAL_ORDER:
            return {...state, total: action.payload};
        case SET_TAB:
            return {...state, tab: action.payload};
        case SET_TOAST_SUCCESS: 
            return {...state, toastMessage: action.payload.message, toastSuccess: action.payload.value};
        case SET_TOAST_FAIL: 
            return {...state, toastMessage: action.payload.message, toastFail: action.payload.value};
        case SET_ORDER:
            return {...state, order: action.payload};
        default:
            return state
    }
}