import { fetchUserInfo, fetchUserCollect } from '../services'

export default {

    namespace: 'user',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(fetchUserInfo, payload)
            const collect = yield call(fetchUserCollect, payload)
            yield put({ type: 'save', payload: {...result.data.data,collect:collect.data.data}});
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
