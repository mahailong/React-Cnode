import { connect } from 'dva';

import { NavBar, List } from 'antd-mobile';
import './style.less';

const Item = List.Item;
const Brief = Item.Brief;

export default connect()(({ history })=>{
    return (<div id="about">   
        <NavBar 
            iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
            onLeftClick={() => history.goBack()}
            >关于</NavBar>
        <img className="bg-img" src='./img/node-bg.png' alt=""/>
        <List className="list">
            <Item
                arrow="horizontal"
                platform="android">
                当前版本
                <Brief>1.0.0</Brief>
            </Item>
            <Item
                arrow="horizontal"
                platform="android">
                项目开源主页
                <Brief>https://coding.net/u/mahailong/p/cnode-dva/git</Brief>
            </Item>       
        </List>
        <List className="list">
            <Item
                arrow="horizontal"
                platform="android">
                关于CNODE社区
                <Brief>https://cnodejs.org/about</Brief>
            </Item>
            <Item
                arrow="horizontal"
                platform="android">
                关于作者
                <Brief>https://coding.net/u/mahailong</Brief>
            </Item>
        </List>
    </div>)
})