import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Tabs } from 'antd-mobile';
import { formatDayToString } from '../../utils/format'
import List from './list';
import Loading from '../../components/loading'
import './style.less';

class User extends React.Component {

    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        this.props.FetchUserInfo(this.props.params.name)
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.params.name != this.props.params.name){
            this.props.FetchUserInfo(nextProps.params.name)
        }

    }
    render() {
        return (<div id="user">   
            <NavBar 
                iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
                onLeftClick={() => this.props.history.goBack()}
                ></NavBar>
            <img className="bg-img" src='./img/node-bg.png' alt=""/>
            <Loading bool={!this.props.loading}>
                <div className="info">
                    <div className="avatar">
                        <img src={this.props.avatar_url} alt=""/>
                    </div>
                    <div className="loginname">{this.props.loginname}</div>
                    <div className="githubname">{this.props.githubUsername}@github.com</div>
                    <div className="foot">
                        <span>注册时间：{formatDayToString(this.props.create_at)}</span>
                        <span className="score">积分：{this.props.score}</span>
                    </div>
                </div>
                <Tabs>
                    <Tabs.TabPane tab="最近回复" key="reply">
                        <List data={this.props.recent_replies}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="最新发布" key="publish">
                        <List data={this.props.recent_topics}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="话题收藏" key="collect ">
                        <List data={this.props.collect}/>
                    </Tabs.TabPane>
                </Tabs>
            </Loading>
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state.user, loading: state.loading.models.user }
}

function mapDispatchToProps(dispatch) {
    return {
        FetchUserInfo: (opts)=>{
            dispatch({
                type: 'user/fetch',
                payload : opts
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)