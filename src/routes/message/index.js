import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, List } from 'antd-mobile';
import { formatDayToString } from '../../utils/format';
import Item from './item';
import Loading from '../../components/loading'
import './style.less';

class Message extends React.Component {

    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        this.props.getMessages({
          accesstoken: this.props.accesstoken
        })
    }
    
    markALL=()=>{
        this.props.postMessageMark_all({
            accesstoken: this.props.accesstoken
        })
    }

    markOne=(item)=>{
        if(!item.has_read){
            this.props.postMessageMark_one({
                accesstoken: this.props.accesstoken,
                msg_id: item.id
            })
        }
    }

    render() {
        return (<div id="message">   
            <NavBar 
                iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
                onLeftClick={() => this.props.history.goBack()}
                rightContent={<Icon type={require('!svg-sprite!../../assets/svg/has-read.svg')} onClick={this.markALL}/>}
                >消息</NavBar>
            <Loading bool={this.props.messagesArr.length}>
                <List>{this.props.messagesArr.map((item,index)=>{
                    return <Item key={item.id} index={index} markOne={this.markOne}/>
                })}</List>
            </Loading>
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state.message, ...state.login }
}

function mapDispatchToProps(dispatch) {
    return {
        getMessages: (opts)=>{
            dispatch({
                type: 'message/getMessages',
                payload : opts
            })
        },
        postMessageMark_all: (opts)=>{
            dispatch({
                type: 'message/postMessageMark_all',
                payload : opts
            })
        },
        postMessageMark_one: (opts)=>{
            dispatch({
                type: 'message/postMessageMark_one',
                payload : opts
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)