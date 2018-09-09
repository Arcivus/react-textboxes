import React, {Component} from "react";

class InfoColumn extends Component {
    constructor() {
        super();
        this.state = {};
    }

    onCreateClick(is_colored) {
        this.props.addItem(is_colored);
    }

    getCounters() {
        const counters = {
            all: this.props.textboxes.length,
            selected: 0,
            green: 0,
            red: 0
        };
        this.props.textboxes.forEach(item => {
            if(item.is_selected) {
                counters.selected++;
                if(item.color === 'green') {
                    counters.green++;
                }
                if(item.color === 'red') {
                    counters.red++;
                }
            }
        });

        return counters;
    }

    render() {
        const block_counters = this.getCounters();

        return (
            <div className="info__column">
                <div className="info__column__item">
                    <button className="btn" onClick={this.onCreateClick.bind(this, '')}>Create block</button>
                </div>
                <div className="info__column__item">
                    <button className="btn" onClick={this.onCreateClick.bind(this, true)}>Create colored block</button>
                </div>
                <div className="info__column__item info__column__stats">
                    <div className="info__column__stats__item">
                        <strong>Overall blocks:</strong> {block_counters.all}
                    </div>
                    <div className="info__column__stats__item">
                        <strong>Selected blocks:</strong> {block_counters.selected}
                    </div>
                    <div className="info__column__stats__item">
                        <strong>Selected green blocks:</strong> <span className="text--green">{block_counters.green}</span>
                    </div>
                    <div className="info__column__stats__item">
                        <strong>Selected red blocks:</strong> <span className="text--red">{block_counters.red}</span>
                    </div>
                </div>


            </div>
        );
    }
}

export default InfoColumn;