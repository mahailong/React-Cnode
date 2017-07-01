import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { NavBar, Icon, Popup, ActivityIndicator } from 'antd-mobile';
import Item from './item';
import Reply from './reply';
import CheckLogin from '../../components/checklogin'
import Loading from '../../components/loading'
import { formatDate } from '../../utils/format';
import styles from './style.less';

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
    // Note: the popup content will not scroll.
    maskProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class Article extends React.Component {

    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        if(!this.props.articleArr[this.props.params.id]){
            this.props.FetchArticle({
                id: this.props.params.id,
                accesstoken :this.props.accesstoken
            })
        }
    }

    onCollect=()=> {
        this.props.Collect({
            topic_id: this.props.params.id,
            accesstoken :this.props.accesstoken
        })
    }

    onDeCollect=()=> {
        this.props.DeCollect({
            topic_id: this.props.params.id,
            accesstoken :this.props.accesstoken
        })
    }

    onReplyUps=(reply_id)=> {
        this.props.ReplyUps({
            id: reply_id,
            topic_id: this.props.params.id,
            accesstoken :this.props.accesstoken
        })
    }

    onPopupShow=(reply_id,loginname)=> {
        Popup.show(<div>
            <Reply reply_id={reply_id?reply_id:''}
                loginname={loginname?loginname:''}
                onPopupHide={this.onPopupHide}
                topic_id={this.props.params.id} 
                accesstoken={this.props.accesstoken} 
                onCreateReply={this.props.CreateReply}
            />
        </div>, { animationType: 'slide-up', maskProps, maskClosable: false });
    }

    onPopupHide=()=> {
        Popup.hide();
    }

    render() {
        const tabObj = { good:"精选", job:"招聘", ask:"问答", share:"分享" }
        const data = this.props.articleArr[this.props.params.id]
        return (<div> 
            <NavBar 
                iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
                onLeftClick={() => this.props.history.goBack()}
                >话题</NavBar>
            <Loading bool={data}>
                {data
                ? <div id="article">
                    <div className="head">
                        <div className="title">{data.title}</div>
                        {data.good
                            ? <img className="isgood" src='../../assets/isgood.png'/>
                            : ''}
                        <div className="content clearfix">
                            <Link to={`/user/${data.author.loginname}`} className="avatar">
                                <img src={data.author.avatar_url} className="full-img"/>
                            </Link>
                            <div className="right">
                                <div className="name">
                                    {data.top?<span className="top">置顶</span>:<span>{tabObj[data.tab] || '全部'}</span>}
                                    {data.author.loginname}
                                </div>
                                <div>
                                    <span>{formatDate(data.create_at)}创建</span>·
                                    <span className="count">{data.visit_count}次浏览</span>
                                </div>
                            </div>
                            {this.props.loginname == data.author.loginname
                                ? <Link to={`/publish/${data.id}`}>
                                    <Icon className="publish" type={require('!svg-sprite!../../assets/svg/publish2.svg')}/>
                                </Link>
                                : ''}
                            <CheckLogin cb={data.is_collect
                                ? this.onDeCollect
                                : this.onCollect}>
                                <Icon className="collect"  
                                    type={data.is_collect
                                        ? require('!svg-sprite!../../assets/svg/heart2.svg')
                                        : require('!svg-sprite!../../assets/svg/heart1.svg')}/>
                            </CheckLogin>
                        </div>
                    </div>
                    <div className="body">
                        <div dangerouslySetInnerHTML={{__html: data.content}}></div>
                    </div>
                    <div className="foot">
                        <div className="count">{data.reply_count}条回复</div>
                        <div className="list">
                            {data.replies.map((item,index,input)=>{
                                let replyIndex = 0 
                                if(item.reply_id){
                                    input.forEach((f_item,f_index)=>{
                                        if(f_item.id==item.reply_id){
                                            replyIndex = f_index
                                        }
                                    })
                                }
                                return <Item key={index}
                                    data={item}
                                    index={index}
                                    replyIndex={replyIndex}
                                    onReplyUps={this.onReplyUps} 
                                    onPopupShow={this.onPopupShow}/>
                            })}
                        </div>
                    </div>
                    <CheckLogin cb={()=>{this.onPopupShow()}}>
                        <div className="popup">
                            <Icon type={require('!svg-sprite!../../assets/svg/reply.svg')}/>
                        </div>
                    </CheckLogin>
                </div>
                : ''}
            </Loading>
        </div>)
    }
}


function mapStateToProps(state, ownProps) {
    return { ...state.login, ...state.article , loading: state.loading.models.article }
}

function mapDispatchToProps(dispatch) {
    return {
        FetchArticle: (opts)=>{
            dispatch({
                type: 'article/fetch',
                payload : opts
            })
        },
        Collect: (opts)=>{
            dispatch({
                type: 'article/collect',
                payload : opts
            })
        },
        DeCollect: (opts)=>{
            dispatch({
                type: 'article/decolect',
                payload : opts
            })
        },
        ReplyUps: (opts)=>{
            dispatch({
                type: 'article/replyups',
                payload : opts
            })
        },
        CreateReply: (opts) => { 
            dispatch({ 
                type: 'article/createReply',
                payload: opts
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article)