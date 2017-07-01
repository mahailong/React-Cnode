import { fetchTopicDetail, postCollect, deleteCollect, postreplyups, postReply } from '../services'

export default {

    namespace: 'article',

    state: {
        articleArr:[]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(fetchTopicDetail, payload)
            yield put({ type: 'save', payload: {...result.data.data}});
        },
        *collect({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(postCollect, payload)
            yield put({ type: 'changeCollect', payload });
        },
        *decolect({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(deleteCollect, payload)
            yield put({ type: 'changeCollect', payload });
        },
        *replyups({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(postreplyups, payload)
            yield put({ type: 'changeReplyUps', payload });
        },
        *createReply({ payload }, { call, put }) {  // eslint-disable-line
            const reply = yield call(postReply, payload)
            const result = yield call(fetchTopicDetail, payload)
            yield put({ type: 'save', payload: {...result.data.data}});
        },
    },

    reducers: {
        save(state, action) {
            const articleArr = state.articleArr
            articleArr[action.payload.id] = action.payload
            return { ...state, articleArr };
        },
        changeCollect(state, action) {
            const articleArr = state.articleArr
            articleArr[action.payload.topic_id].is_collect = !articleArr[action.payload.topic_id].is_collect
            return { ...state, articleArr }
        },
        changeReplyUps(state, action) {
            const articleArr = state.articleArr
            articleArr[action.payload.topic_id].replies.map((item)=>{
                if(item.id==action.payload.id) {
                    item.is_uped = !item.is_uped
                    item.is_uped?item.ups.push(item.login_id):item.ups.pop()
                    return item
                }
            })
            return { ...state, articleArr }
        },
    },
};
