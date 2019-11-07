import React from 'react';
import InputRange from 'react-input-range';
import index from 'react-input-range/lib/css/index.css'

class InputBar extends React.Component {
    constructor(props) {
        super(props);
        console.dir(props);
        this.state = {
            value: {min: 0, max: 250},
        };
    }


    render() {
        return (
            <div style={index.inputRange}>
                <InputRange
                    maxValue={500}
                    minValue={0}
                    value={this.state.value}
                    onChange={value => this.setState({value})}/>
            </div>

        );
    }
}

export default InputBar;
