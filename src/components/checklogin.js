import { hashHistory } from 'dva/router'
import { Modal } from 'antd-mobile';
import { connect } from 'dva';

const alert = Modal.alert

function CheckLogin({ accesstoken, cb, children }) {
    const onCheckLogin=()=>{
        accesstoken
        ? cb()  
        : alert('', '该操作需要登录账户。是否现在登录', [
            { text: '取消'},
            { text: '登录', onPress: () => hashHistory.push('/login') },
        ])
    }
    return(<span onClick={onCheckLogin}>
        {children}
    </span>)
}

function mapStateToProps(state, ownProps) {
    return { ...state.login }
}

export default connect(
    mapStateToProps,
)(CheckLogin)