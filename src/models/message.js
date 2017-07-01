import { getMessages, getMessageCount, postMessageMark_all, postMessageMark_one } from '../services'

export default {

    namespace: 'message',

    state: {
        messagesArr: [],
        count: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *getMessages({ payload }, { call, put }) {  // eslint-disable-line
            const {data} = yield call(getMessages, payload)
            const messagesArr = data.data.hasnot_read_messages.concat(data.data.has_read_messages)
            yield put({ type: 'save', payload: {messagesArr}});
        },

        *getMessageCount({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(getMessageCount, payload)
            yield put({ type: 'save', payload: {count: result.data}});
        },

        *postMessageMark_all({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(postMessageMark_all, payload)
            yield put({ type: 'markAll', payload: {...result.data}});
        },

        *postMessageMark_one({ payload }, { call, put }) {  // eslint-disable-line
            const result = yield call(postMessageMark_one, payload)
            yield put({ type: 'markOne', payload: {...result.data}});
        },
      
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        markAll(state, action) {
            let arr = state.messagesArr
            arr.forEach((item)=>{
                item.has_read=true
            });
            return { ...state, hasnot_read_messages: arr };
        },
        markOne(state, action) {
            let arr = state.messagesArr
            arr.forEach((item)=>{
                if(item.id==action.payload.marked_msg_id)
                item.has_read=true
            });
            return { ...state, hasnot_read_messages: arr };
        },
    },

};
