import {Component} from "react";
import * as utils from "../utils";
import TextboxesContainer from "./container/TextboxesContainer";
import InfoColumn from "./container/InfoColumn";
import Modal from "./presentational/Modal";
import React from "react";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            textboxes: [
                {
                    id: utils.guid(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    is_selected: false
                },
                {
                    id: utils.guid(),
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    is_selected: false
                }
            ]
        };

        this.modalConfirm = this.modalConfirm.bind(this);
        this.modalCancel = this.modalCancel.bind(this);
    }

    getItem(id) {
        return this.state.textboxes.filter(item => id === item.id)[0];
    }

    /**
     * Modify item in state array
     * @param id {String} item id
     * @param modification {Function}
     */
    changeItem(id, modification) {
        this.setState({
            textboxes: this.state.textboxes.map(item => {
                if(item.id === id) {
                    return modification(item);
                }
                return item;
            })
        })
    }

    addItem(is_colored) {
        const item = {
            id: utils.guid(),
            text: utils.text(),
            is_selected: false,
        };
        if(is_colored) {
            item.is_colored = true;
            item.color = 'green';
        }
        this.setState({
            textboxes: [...this.state.textboxes, item]
        });
    }

    removeItem(id) {
        this.setState({
            textboxes: this.state.textboxes.filter(item => id !== item.id),
            delete_id: null
        });
    }

    handleRemoveClick(id) {
        const item = this.getItem(id);
        if(item.is_colored) {
            this.setState({
                delete_id: item.id
            });
            return;
        }

        this.removeItem(id);
    }

    toggleSelectItem(id) {
        this.changeItem(id, (item) => {
            item.is_selected = !item.is_selected;
            return item;
        });
    }

    toggleColor(id) {
        this.changeItem(id, (item) => {
            item.color = (item.color === 'green') ? 'red' : 'green';
            return item;
        });
    }

    modalConfirm() {
        this.removeItem(this.state.delete_id);
    }

    modalCancel() {
        this.setState({
            delete_id: null
        });
    }

    render() {
        return (
            <div className={`app__wrapper ${this.state.delete_id ? 'modal__open' : ''}`}>
                <TextboxesContainer textboxes={this.state.textboxes} removeItem={this.handleRemoveClick.bind(this)}
                                    toggleSelectItem={this.toggleSelectItem.bind(this)} toggleColor={this.toggleColor.bind(this)}/>
                <InfoColumn textboxes={this.state.textboxes} addItem={this.addItem.bind(this)}/>
                <div className="overlay"></div>
                <Modal modalConfirm={this.modalConfirm} modalCancel={this.modalCancel}/>
            </div>
        );
    }
}