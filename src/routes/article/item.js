import React from 'react';
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile';
import CheckLogin from '../../components/checklogin'
import { formatDate } from '../../utils/format'
import styles from './style.less';

export default class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_uped: this.props.data.is_uped,
            ups_count : this.props.data.ups.length
        }
    }

    render() {
        const { data, index ,replyIndex, onReplyUps ,onPopupShow } = this.props
        return (<div className="item">
            <div className="content clearfix">
                <Link to={`/user/${data.author.loginname}`} className="avatar">
                    <img src={data.author.avatar_url} className="full-img"/>
                </Link>
                <div className="right">
                    <div className="name">{data.author.loginname}</div>
                    <div>
                        <span className="index">{index+1}楼</span>·
                        <span>{formatDate(data.create_at)}</span>
                    </div>
                </div>
                <div className="icon-group">
                    <CheckLogin cb={()=>onReplyUps(data.id)}>
                    {data.is_uped
                        ? <Icon type={require('!svg-sprite!../../assets/svg/thumbs1.svg')}/>
                        : <Icon type={require('!svg-sprite!../../assets/svg/thumbs2.svg')}/>}
                    </CheckLogin>
                    <span className="length">{data.ups.length}</span>
                    <CheckLogin cb={()=>onPopupShow(data.id,data.author.loginname)}>
                        <Icon size="xs" type={require('!svg-sprite!../../assets/svg/reply2.svg')}/>
                    </CheckLogin>
                </div>
            </div>
            {replyIndex?
                <div className="reply-index">回复：{replyIndex}楼</div>  
            :""}
            <div className="title" dangerouslySetInnerHTML={{__html: data.content}}></div>
        </div>)
    }
}

