import { hashHistory } from 'dva/router'
import { fetchTopics } from '../services'
import { PAGE_SIZE } from '../utils/config'

export default {

    namespace: 'home',

    state: {
        selectedTab: 'all',
        tabData:{
            all: { page: 0, scrollT: 0, hasMore: true, topics: [] },
            ask: { page: 0, scrollT: 0, hasMore: true, topics: [] },
            job: { page: 0, scrollT: 0, hasMore: true, topics: [] },
            good: { page: 0, scrollT: 0, hasMore: true, topics: [] },
            share: { page: 0, scrollT: 0, hasMore: true, topics: [] },
            dev: { page: 0, scrollT: 0, hasMore: true, topics: [] },
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call( fetchTopics, payload )
            yield put({ type: 'save', payload: { 
                selectedTab: payload.tab, 
                topics: result.data.data 
            }})
        },
    },

    reducers: {
        save(state, action) {
            const { selectedTab, topics } = action.payload
            const tabData = state.tabData
            tabData[selectedTab].page ++
            tabData[selectedTab].topics = tabData[selectedTab].topics.concat(topics)
            return { 
                ...state,
                tabData
            }
        },
        tabchange(state, action) {
            return { ...state, selectedTab: action.payload }
        },
    },
};