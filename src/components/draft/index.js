import { Editor } from 'react-draft-wysiwyg';
import blockquot from '../../assets/svg/blockquote.svg';
import './style.less';
export default (props) => {
    return (
        <Editor { ...props }
            toolbar={{
                options: ['inline', 'blockType', 'list', 'link', 'image'],
                inline: {
                    options: ['bold', 'italic', 'monospace'],
                },
                list: {
                    options: ['unordered', 'ordered'],
                },
                link: {
                    options: ['link']
                },
                history: {
                    options: ['undo'],
                }
            }}
        />
    )
}
