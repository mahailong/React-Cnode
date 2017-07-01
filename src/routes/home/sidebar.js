import { connect } from 'dva';
import { Link, hashHistory } from 'dva/router'
import { Icon } from 'antd-mobile';
import CheckLogin from '../../components/checklogin'
import styles from './style.less';

function Sidebar({ avatar_url, loginname, accesstoken, score, logout }) {
    return (<div className="sidebar">
        { accesstoken
        ? <div className="info">
            <img className="bg-img" src='./img/node-bg.png' alt=""/>
            <div className="avatar">
                <Link to={`/user/${loginname}`}><img src={avatar_url} alt=""/></Link>
            </div>
            <div className="loginname">{loginname}</div>
            <div className="score">积分：{score}</div>
            <span className="logout" onClick={logout}>注销</span>
        </div>
        : <div className="info">
            <img className="bg-img" src='./img/node-bg.png' alt=""/>
            <div className="avatar">
                <Link to="/login"><img src='./img/avatar-default.png' alt=""/></Link>
            </div>
            <div className="login">点击头像登录</div>
        </div>}
        <div className="list">
            <CheckLogin cb={()=>{hashHistory.push('/message')}}>
                <span className="item">
                    <Icon type={require('!svg-sprite!../../assets/svg/message.svg')}/>
                    <span>消息</span>
                </span>
            </CheckLogin>
            {/*<Link to="conf" className="item">
                <Icon type={require('!svg-sprite!../../assets/svg/conf.svg')}/>
                <span>设置</span>
            </Link>*/}
            <Link to="/about" className="item">
                <Icon type={require('!svg-sprite!../../assets/svg/about.svg')}/>
                <span>关于</span>
            </Link>
        </div>

  </div>);
}

function mapStateToProps(state, ownProps) {
    return { ...state.login }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => { dispatch({ type: 'login/logout' })}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)