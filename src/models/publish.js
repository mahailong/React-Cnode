import { hashHistory } from 'dva/router'
import { postTopics, updateTopics } from '../services'

export default {

    namespace: 'publish',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *postTopics({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call( postTopics, payload )
            hashHistory.push(`/article/${result.data.topic_id}`)
        },
        *updateTopics({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call( updateTopics, payload )
            hashHistory.push(`/article/${result.data.topic_id}`)
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
