import React, {Component} from "react";

class Textbox extends Component {
    constructor() {
        super();
        this.state = {
            timeout: null
        };
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    handleRemoveClick(e) {
        e.stopPropagation();
        this.props.removeItem(this.props.textbox.id);
    }

    handleClick(e) {
        /**
         * If item is colored check for double click and prevent selection change
         */
        if(this.props.textbox.is_colored) {
            if(this.state.timeout) {
                clearTimeout(this.state.timeout);
                this.setState({
                    timeout: null
                });
            } else {
                this.setState({
                    timeout: setTimeout(() => {
                        this.props.toggleSelectItem(this.props.textbox.id);
                        this.setState({
                            timeout: null
                        })
                    }, 300)
                })
            }
        } else {
            this.props.toggleSelectItem(this.props.textbox.id);
        }
    }

    handleDoubleClick(e) {
        if(!this.props.textbox.is_colored) {
            return;
        }
        this.props.toggleColor(this.props.textbox.id);
    }

    render() {
        let {is_selected, is_colored, color, text} = this.props.textbox;
        return (
            <div className={`textbox ${is_selected? 'textbox--selected' : ''} ${is_colored? color : ''}`}
                onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                <div className="textbox__header ">
                    <div className="textbox__remove" onClick={this.handleRemoveClick} ></div>
                </div>
                <div className="textbox__content">
                    <div className="textbox__text">
                        {text}
                    </div>
                </div>
            </div>
        );
    }
}

export default Textbox;