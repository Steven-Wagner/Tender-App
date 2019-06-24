import React, {Component} from 'react';
import Stars from '../../Components/Stars/stars';

class YourProduct extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.updateProductState(this.props.index)
    }

    handleDelete() {
        this.props.handleDelete(this.props.index);
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
                            value={this.props.item.price}
                            id="price"
                            type="number" 
                            step="1"
                            onChange={(e) => this.props.handleChangeInput(e, this.props.index)}/>
                    </div>
                    <label className="current-advertising-label" htmlFor="currentAdvertising">Current Advertising:</label>
                    <select 
                        id="advertising" 
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index)}
                        value={this.props.item.advertising}>
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