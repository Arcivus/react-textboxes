import React, {Component} from "react";


class Modal extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="modal__wrap">
                <div className="modal">
                    <div className="modal__body">
                        Delete text block?
                    </div>
                    <div className="modal__footer">
                        <button className="modal__confirm" onClick={this.props.modalConfirm}>Confirm</button>
                        <button className="modal__cancel" onClick={this.props.modalCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;