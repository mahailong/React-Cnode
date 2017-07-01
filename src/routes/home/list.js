import React from 'react';
import { connect } from 'dva';
import { ListView, ActivityIndicator } from 'antd-mobile';
import { PAGE_SIZE } from '../../utils/config'
import Item from './item'
import CheckLogin from '../../components/checklogin'
import Loading from '../../components/loading'
import styles from './style.less';

class List extends React.Component {

    constructor(props) {
        super(props)
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    }

    componentDidMount() {
        this.props.page==0 && this.props.Fetch(this.props)
    }

    onEndReached(e) {
        this.props.hasMore && !this.props.loading && this.props.Fetch(this.props)
    }

    render() {
        return (<ListView
            dataSource={this.dataSource.cloneWithRows(this.props.topics)}
            renderRow={(row) => {return <Item data={row}/>}}
            renderFooter={() => (<div style={{ display: 'flex', justifyContent: 'center' }}>
                {this.props.loading ? <ActivityIndicator text="加载中..."/> : ''}
            </div>)}
            style={{height: document.documentElement.clientHeight - 180,}}
            pageSize={10}
            scrollRenderAheadDistance={500}
            scrollEventThrottle={20}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={2000}
        />)
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state.home.tabData[ownProps.tab], loading: state.loading.models.home }
}

function mapDispatchToProps(dispatch) {
    return {
        Fetch: (props)=>{
            dispatch({
                type: 'home/fetch',
                payload : {
                    tab: props.tab,
                    page: props.page+1,
                    limit: PAGE_SIZE,
                }
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)