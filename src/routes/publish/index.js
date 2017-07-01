import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Modal, Picker, List, InputItem } from 'antd-mobile';
import { convertToRaw, convertFromHTML, ContentState, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import Editor from '../../components/draft';
import './style.less';

class Publish extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            editorContents: [],
            modalShow: false,
            ModalText: '',
            tabValue: '',
            titleValue: '',
            isOwn: false
        }
        this.tabList = [
            { label: '分享', value: 'share' },
            { label: '问答', value: 'ask' },
            { label: '招聘', value: 'job' },
            { label: '测试', value: 'dev' }
        ]
    }

    componentWillMount() {
        if(this.props.params.id){
            const { tab, title, content, author } = this.props.articleArr[this.props.params.id]
            if(author && this.props.loginname == author.loginname && this.props.params.id){
                const contentBlocks = convertFromHTML(content);
                const contentState = ContentState.createFromBlockArray(contentBlocks);
                const defaultEditorState = EditorState.createWithContent(contentState);
                this.setState({
                    isOwn: true,
                    tabValue: tab,
                    titleValue: title,
                    editorContents: [defaultEditorState]
                })
            }
        }
    }

    onEditorStateChange = (index, editorContent) => {
        let editorContents = this.state.editorContents;
        editorContents[index] = editorContent;
        editorContents = [...editorContents];
        this.setState({
            editorContents,
        });
    }

    onTabValueChange = (e) => {
        this.setState({
            tabValue: e[0]
        });
    }

    onTitleValueChange = (e) => {
        this.setState({
            titleValue: e
        });
    }

    onSubmit=()=>{
        const { tabValue, titleValue, editorContents } = this.state
        const contentValue = editorContents[0]?draftToMarkdown(convertToRaw(editorContents[0].getCurrentContent())):""
        if(titleValue.length<10){
            this.onModalShow('标题不得少于10个字')
        }else if(contentValue.length < 10){
            this.onModalShow('话题内容不够')
        }else if(this.state.isOwn){
            this.props.Update({
                accesstoken: this.props.accesstoken,
                topic_id : this.props.id,
                // tab: tabValue,
                tab: 'dev',
                title: titleValue,
                content: contentValue
            })
        }else{
            this.props.Publish({
                accesstoken: this.props.accesstoken,
                // tab: tabValue,
                tab: 'dev',
                title: titleValue,
                content: contentValue
            })
        }
    }

    onModalShow=(text)=> {
        this.setState({
            ModalText: text,
            modalShow: true
        });
    }

    onModalClose=()=> {
        this.setState({
            modalShow: false,
        });
    }

    render() {
        const { editorContents } = this.state;
        return (<div className="publish">
            <NavBar 
                iconName={require('!svg-sprite!../../assets/svg/back-white.svg')}
                onLeftClick={() => this.props.history.goBack()}
                rightContent={<Icon type={require('!svg-sprite!../../assets/svg/submit.svg')} onClick={this.onSubmit}/>}
            >发布话题</NavBar>
            <List className="picker">
                <Picker data={this.tabList} cols={1} value={[this.state.tabValue]} onChange={this.onTabValueChange}>
                    <List.Item arrow="horizontal">发布到分类：</List.Item>
                </Picker>
                <InputItem placeholder="标题，字数10字以上"
                    value={[this.state.titleValue]} onChange={this.onTitleValueChange}
                />
            </List>
            <Editor
                editorState={editorContents[0]}
                editorStyle={{height:document.body.scrollHeight-440}}
                onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
            />
            <Modal
                title={this.state.ModalText}
                transparent
                maskClosable={false}
                visible={this.state.modalShow}
                onClose={this.onModalClose}
                footer={[{ text: '确定', onPress: this.onModalClose }]}
            />
        </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return { ...state.login, ...state.article }
}

function mapDispatchToProps(dispatch) {
    return {
        Publish: (opts) => { 
            dispatch({ 
                type: 'publish/postTopics',
                payload: opts
            })
        },
        Update: (opts) => { 
            dispatch({ 
                type: 'publish/updateTopics',
                payload: opts
            })
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Publish)