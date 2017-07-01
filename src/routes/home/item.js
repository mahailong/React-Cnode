
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile';
import { formatDate, formatDateToString } from '../../utils/format'
import './style.less'

export default function ({ data }) {
    const tabObj = { good:"精选", job:"招聘", ask:"问答", share:"分享" }
    return(<div className="item">
        <div className="title">{data.top?<span className="top">置顶</span>:<span>{tabObj[data.tab] || '全部'}</span>}{data.title}</div>
        {data.good?<img className="isgood" src='./img/isgood.png' alt=""/>:""}
        <div className="content clearfix">
            <Link to={`/user/${data.author.loginname}`} className="avatar">
                <img src={data.author.avatar_url} className="full-img"/>
            </Link>
            <Link to={`/article/${data.id}`} className="right">
                <div>
                    <span className="name">{data.author.loginname}</span>
                    <span className="float-r">
                        <span className="reply">{data.reply_count}</span>/
                        <span>{data.visit_count}</span>
                    </span>
                </div>
                <div>
                    <span>创建于：{formatDateToString(data.create_at)}</span>
                    <span className="float-r">{formatDate(data.last_reply_at)}</span>
                </div>

            </Link>
        </div>
    </div>)
}