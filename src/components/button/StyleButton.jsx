import React, { PureComponent } from 'react';
import styles from '../MyEditor.less';

class StyleButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className = `${className} RichEditor-activeButton`;
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
};
export default StyleButton;