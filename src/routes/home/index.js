import React from 'react';
import { connect } from 'dva';
import { Link, hashHistory } from 'dva/router'
import { Drawer, Tabs, NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import Sidebar from './sidebar';
import List from './list';
import CheckLogin from '../../components/checklogin'
import { PAGE_SIZE } from '../../utils/config'
import styles from './style.less';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = { open: false }
    }

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (<div id="home">
            <Drawer
                sidebar={<Sidebar/>}
                open={this.state.open}
                onOpenChange={this.onOpenChange}>
                <NavBar 
                    iconName={require('!svg-sprite!../../assets/svg/sidebar.svg')}
                    onLeftClick={this.onOpenChange}
                    >CNode社区</NavBar>
                <Tabs onChange={this.props.TabChange} 
                    swipeable={false}
                    pageSize={6}
                    defaultActiveKey={this.props.selectedTab}>
                    <Tabs.TabPane tab="全部" key="all">
                        <List tab="all"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="精华" key="good">
                        <List tab="good"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="分享" key="share">
                        <List tab="share"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="问答" key="ask">
                        <List tab="ask"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="招聘" key="job">
                        <List tab="job"/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="测试" key="dev">
                        <List tab="dev"/>
                    </Tabs.TabPane>
                </Tabs>
                <CheckLogin cb={()=>{hashHistory.push('/publish')}}>
                    <div className="publish">
                        <Icon type={require('!svg-sprite!../../assets/svg/publish.svg')}/>
                    </div>
                </CheckLogin>
            </Drawer>
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state.home, loading: state.loading.models.home }
}

function mapDispatchToProps(dispatch) {
    return {
        TabChange: (key)=>{
            dispatch({
                type: 'home/tabchange',
                payload : key
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)