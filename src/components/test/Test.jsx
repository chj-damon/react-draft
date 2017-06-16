import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTest, fetchTest2 } from '../redux/actions/test.js';

class Test extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        this.props.fetchTest();
        this.props.fetchTest2();
    }
    
    render() {
        const { list, list2 } = this.props;
        return (
            <div>
                {
                    list && list.map(item => (
                        <div key={item.key}>{item.name}</div>
                    ))
                }
                {
                    list2 && list2.map(item => (
                        <div key={item.key}>{item.name}</div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.test.list,
    list2: state.test.list2
});
const mapDispatchToProps = dispatch => bindActionCreators({ fetchTest, fetchTest2 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Test);