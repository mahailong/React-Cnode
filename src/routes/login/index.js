import React from 'react';
import { connect } from 'dva';
import { InputItem, Button, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import styles from './style.less';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            accesstoken: '7058163d-e53d-496e-918b-3df821480628',
        };
    }
    
    handleChange = () => {
        this.setState({
            accesstoken: val
        })
    }

    login = () => {
        this.props.Login({ ...this.state })
    }

    render() {
        return (<div id="login">   
            <NavBar 
                iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
                onLeftClick={() => this.props.history.goBack()}
                >登录</NavBar>
            <div className="form">
                <InputItem
                    placeholder="Access Token"
                    onChange={this.handleChange}
                    autoFocus/>
                <WhiteSpace size="lg"/>
                <WhiteSpace size="lg"/>
                <Button type="primary" onClick={e => this.login()}>登录</Button>
            </div>

        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return {...state.home}
}

function mapDispatchToProps(dispatch) {
    return {
        Login: (opts)=>{
            dispatch({
                type: 'login/login',
                payload : opts
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)