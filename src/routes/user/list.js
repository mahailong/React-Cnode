
import { Link } from 'dva/router'
import { formatDate, formatDateToString } from '../../utils/format'
import styles from './style.less';

export default function ({ data=[] }) {
    return (<div className="list">{
        data.map((item, index)=>{ return <Item data={item} key={index}/> })
    }</div>)
}

function Item ({ data }) {
    return(<div className="item clearfix">
        <Link to={`/user/${data.author.loginname}`} className="avatar">
            <img src={data.author.avatar_url} className="full-img"/>
        </Link>
        <Link to={`/article/${data.id}`} className="right">
            <div className="title">{data.title}</div>
            <div className="name">
                <span>{data.author.loginname}</span>
                <span className="float-r">{formatDate(data.last_reply_at)}</span>
            </div>
        </Link>
    </div>)
}