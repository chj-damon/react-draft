import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BlockStyleControls from './controls/BlockStyleControls';
import InlineStyleControls from './controls/InlineStyleControls';
import "draft-js/dist/Draft.css";
import styles from './MyEditor.less';

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

class MyEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    handleChange = (editorState) => {
        this.setState({ editorState });
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.handleChange(newState);
            return 'handled';
        }
        return 'not-handled'
    }

    handleTab = (e) => {
        const maxDepth = 4;
        this.handleChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    handleFocus = () => {
        console.log('focus');
    }

    toggleBlockType = (blockType) => {
        this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    toggleInlineStyle = (inlineStyle) => {
        this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }

    render() {
        const { editorState } = this.state;
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className = `${className} RichEditor-hidePlaceholder`;
            }
        }
        return (
            <div className="RichEditor-root">
                <BlockStyleControls 
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls 
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor 
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.handleChange}
                        onTab={this.handleTab}
                        placeholder="Tell a story..."
                        onFocus={this.handleFocus}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}
export default MyEditor;