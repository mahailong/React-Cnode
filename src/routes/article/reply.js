import React from 'react';
import { connect } from 'dva';
import { Icon, Modal } from 'antd-mobile';
import { convertToRaw, convertFromHTML, ContentState, EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import Editor from '../../components/draft';
import './style.less';

export default class Reply extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            editorContents: [],
            modalShow: false,
            modalText: ''
        }
    }
    componentWillMount() {
        if(this.props.loginname){
            const contentBlocks = convertFromHTML("@"+this.props.loginname);
            const contentState = ContentState.createFromBlockArray(contentBlocks);
            const defaultEditorState = EditorState.createWithContent(contentState);
            this.setState({
                editorContents: [defaultEditorState]
            })
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
    onSubmit=()=>{
        const { editorContents } = this.state
        const contentValue = editorContents[0]?draftToMarkdown(convertToRaw(editorContents[0].getCurrentContent())):""
        if(contentValue.length < 10){
            this.onModalShow('回复内容不够')
        }else{
            this.props.onCreateReply({
                accesstoken: this.props.accesstoken,
                topic_id: this.props.topic_id,
                reply_id: this.props.reply_id,
                content: contentValue
            })
            this.props.onPopupHide();
        }
    }
    onModalShow=(text)=> {
        this.setState({
            modalText: text,
            modalShow: true
        });
    }
    onModalClose=()=> {
        this.setState({
            modalShow: false,
        });
    }
    render() {
        const { editorContents, defaultEditorState } = this.state;
        return (<div className="reply">
            <Icon className="cross" 
                type={require('!svg-sprite!../../assets/svg/cross.svg')}
                onClick={this.props.onPopupHide}/>
            <Icon className="publish" 
                type={require('!svg-sprite!../../assets/svg/publish1.svg')}
                onClick={this.onSubmit}/>
            <Modal
                title={this.state.modalText}
                transparent
                maskClosable={false}
                visible={this.state.modalShow}
                onClose={this.onModalClose}
                footer={[{ text: '确定', onPress: this.onModalClose}]}
                >  
            </Modal>
            <Editor
                hashtag={{}}
                editorState={editorContents[0]}
                editorStyle={{height:440}}
                toolbarClassName="reply-toolbar"
                onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
            />
        </div>)
    }
}

