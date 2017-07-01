import { hashHistory } from 'dva/router'
import LocalStore from '../utils/localStore'
import { ACCESSTOKEN } from '../utils/config'
import { loginByAccesstoken } from '../services'

export default {

    namespace: 'login',

    state: {
        accesstoken: "",
        loginname: "",
        avatar_url: "",
        score: 0,
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            const accesstoken = LocalStore.getItem(ACCESSTOKEN)
            accesstoken && dispatch({type: 'login',payload: {accesstoken}})
        },
    },

    effects: {
        *login({ payload }, { call, put }) {  // eslint-disable-line
            const { accesstoken } = payload
            const result = yield call(loginByAccesstoken,{accesstoken})
            yield put({ type: 'save', payload: {accesstoken,...result.data}});
            hashHistory.push('/')
        },
        *logout({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save', payload: { accesstoken: "", }});
        },
    },

    reducers: {
        save(state, action) {
            LocalStore.setItem(ACCESSTOKEN,action.payload.accesstoken)
            return { ...state, ...action.payload };
        },
    },
};