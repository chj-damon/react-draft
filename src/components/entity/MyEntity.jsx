import React, { PureComponent } from 'react';
import { Editor, EditorState, ContentState, CompositeDecorator, convertToRaw, Entity, RichUtils } from 'draft-js';
import Link from './Link';
import styles from './styles';

const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}
class MyEntity extends PureComponent {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link
            }
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: ''
        }
    }

    handleURLChange = (e) => {
        this.setState({ urlValue: e.target.value });
    }

    handleURLInputKeydown = (e) => {
        if (e.which === 13) {
            this.confirmLink(e);
        }
    }

    confirmLink = (e) => {
        e.preventDefault();
        const { editorState, urlValue } = this.state;
        const contentState = editorState.getCurrentContent();
        const entity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
        const entityKey = entity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: entity});
        this.setState({
            editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
            showURLInput: false,
            urlValue: ''
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    promptForLink = (e) => {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                showURLInput: true,
                urlValue: ''
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    removeLink = (e) => {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null)
            });
        }
    }

    focus = () => {
        this.refs.editor.focus();
    }

    onChange = (editorState) => {
        this.setState({ editorState })
    }

    logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    }

    render() {
        const { editorState, showURLInput, urlValue } = this.state;
        let urlInput = showURLInput ?
            <div style={styles.urlInputContainer}>
                <input 
                    ref="url"
                    type="text"
                    value={this.state.urlValue}
                    style={styles.urlInput}
                    onChange={this.handleURLChange}
                    onKeyDown={this.handleURLInputKeydown}
                />
                <button onClick={this.confirmLink}>
                    Confirm
                </button>
            </div>
        : null;

        return (
            <div style={styles.root}>
                <div style={{ marginBottom: 10 }}>
                    Select some text, then use the buttons to add or remove links on the selected text.
                </div>
                <div style={styles.buttons}>
                    <button
                        style={{ marginRight: 10 }}
                        onMouseDown={this.promptForLink}
                    >
                        Add Link
                    </button>
                    <button
                        onMouseDown={this.removeLink}
                    >
                        Remove Link
                    </button>
                </div>
                { urlInput }
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder="Enter some text..."
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
};
export default MyEntity;