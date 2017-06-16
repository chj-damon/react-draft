import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';

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

    onBoldClick = () => {
        this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    render() {
        return (
            <div>
                <button onClick={this.onBoldClick}>Bold</button>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.handleChange} 
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        )
    }
}
export default MyEditor;