import React, { PureComponent } from 'react';
import { Editor, EditorState, ContentState, CompositeDecorator, convertFromRaw, convertToRaw } from 'draft-js';

class MyEntity extends PureComponent {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: getEntityStrategy('IMMUTABLE')
            }
        ]);

        this.state = {
            editorState = EditorState.createWithContent(blocks, decorator)
        }
    }
}