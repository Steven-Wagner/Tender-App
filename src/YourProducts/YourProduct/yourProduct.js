import React, {Component} from 'react';
import Stars from '../../Components/Stars/stars';

class YourProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldValues: {
                price: this.props.item.price,
                advertising:  this.props.item.advertising
            },
            currentPrice: this.props.item.price,
            currentAdvertising: this.props.item.advertising
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkValuesChanged = this.checkValuesChanged.bind(this);
    }

    // componentWillMount() {
    //     this.setState({
    //         oldValues: {
    //             price: this.props.item.price,
    //             advertising:  this.props.item.advertising
    //         },
    //         currentPrice: this.props.item.price,
    //         currentAdvertising: this.props.item.advertising
    //     })
    // }

    handleChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const valuesChanged = this.checkValuesChanged();

        if (valuesChanged) {
            this.props.updateProductState(this.props.index, this.state.currentPrice, this.state.currentAdvertising)
        }
    }

    checkValuesChanged() {
        if (
            this.state.oldValues.price === this.state.currentPrice
            &&
            this.state.oldValues.advertising === this.state.currentAdvertising
        ) {
            return false;
        }
        return true;
    }

    render() {
        return(
            <section className="current-product">
                <h2>{this.props.item.title}</h2>
                <form className="change-items" onSubmit={(e) => this.handleSubmit(e)}>
                    <img className="product-pic" src={this.props.item.img} alt={this.props.item.title}/>
                    <Stars rating={this.props.item.rating}/>
                    <p>{this.props.item.description}</p>
                    <p>Sold: {this.props.item.sold}</p>
                    <p>Profit: {this.props.item.profit}</p>
                    <div className="price-chooser">
                        <label className="price-label" htmlFor="currentPrice">Price:</label>
                        <input 
                            value={this.state.currentPrice}
                            id="currentPrice"
                            type="number" 
                            step="1"
                            onChange={(e) => this.handleChangeInput(e)}/>
                    </div>
                    <label className="current-advertising-label" htmlFor="currentAdvertising">Current Advertising:</label>
                    <select 
                        id="currentAdvertising" 
                        onChange={(e) => this.handleChangeInput(e)}
                        value={this.state.currentAdvertising}>
                        <option value='None'>None</option>
                        <option value='Homepage ads'>Homepage ads - 50 Play Money per day</option>
                        <option value='Popup ads'>Popup ads - 100 Play Money per day</option>
                        <option value='Annoying Ads'>Annoying Ads - 150 Play Money per day</option>
                    </select>
                    <button id="submit-changes" type="submit">Submit Changes</button>           
                </form>
                <div className="choose-buttons">
                    <button onClick={() => this.props.handleDelete(this.props.index)}>Delete</button>
                    <button> See Reviews</button>
                </div>
            </section>
        )
    }
}

export default YourProduct;