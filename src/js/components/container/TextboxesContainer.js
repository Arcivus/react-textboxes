import React, {Component} from "react";
import Textbox from '../presentational/Textbox';


class TextboxesContainer extends Component {
    constructor() {
        super();
        this.state = {};
    }

    renderTextboxes() {
        return this.props.textboxes.map(item => <Textbox key={item.id} textbox={item} {...this.props}/>)
    }

    render() {
        return (
            <div className="textboxes__container">{this.renderTextboxes()}</div>
        );
    }
}

export default TextboxesContainer;