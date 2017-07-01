import { connect } from 'dva';
import { Link } from 'dva/router'
import { Icon } from 'antd-mobile';
import { formatDate, formatDateToString } from '../../utils/format'
import './style.less'

function Item ({ data, markOne }) {
    return(<div className="item" onClick={()=>markOne(data)}> 
        <div className="info clearfix">
            <Link to={`/user/${data.author.loginname}`} className="avatar">
                <img src={data.author.avatar_url} className="full-img"/>
            </Link>
            <Link to={`/article/${data.topic.id}`} className="right">
                <div>
                    <span className="name">{data.author.loginname}</span>
                    {!data.has_read
                        ? <span className="float-r primary">
                            <span className="dot"></span>
                            {formatDate(data.reply.create_at)}
                        </span>
                        : <span className="float-r">
                            {formatDate(data.reply.create_at)}
                        </span>}
                </div>
                <div>{data.type=='at'
                  ? '在回复中@了你'
                  : '回复了您的话题'
                }</div>
            </Link>
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: data.reply.content}}></div>
        </div>
        <Link to={`/article/${data.topic.id}`} className="topic">
            话题：{data.topic.title}
        </Link>
    </div>)
}

function mapStateToProps(state, ownProps) {
    return { data: state.message.messagesArr[ownProps.index] }
}

function mapDispatchToProps(dispatch) {
    return { }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)