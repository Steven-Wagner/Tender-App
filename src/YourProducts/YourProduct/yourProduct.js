import React, {Component} from 'react';
// import Stars from '../../Components/Stars/stars';
import TokenService from '../../services/Token-services';
import {API_BASE_URL} from '../../config';
import EditPopup from './editPopup';

class YourProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editPopup: {
                type: '',
                status: ''
            }
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchPatchProduct = this.fetchPatchProduct.bind(this);
        this.showEditPopup = this.showEditPopup.bind(this);
        this.removeEditPopup = this.removeEditPopup.bind(this);
        this.editButton = this.editButton.bind(this);
    }

    handleSubmit(e) {
        return new Promise((resolve, reject) => {
            e.preventDefault();

            const validate = this.props.validateUpdate(this.props.index, this.props.adCosts);

            if (validate) {
                this.fetchPatchProduct(this.props.item)
                .then(updatedProduct => {
                    this.props.updateProductState(this.props.index, this.props.adCosts);
                    this.props.setPopupMessages('popup', `${this.props.item.title} Updated!`);
                    return resolve(true)
                })
                .catch(error => {
                    this.props.setPopupMessages('errorPopup', [error.message])
                    return resolve(false)
                })
            }
        })
    }

    fetchPatchProduct(updatedProduct) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/${updatedProduct.creator_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(updatedProduct)
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }

    handleDelete() {
        this.props.handleDelete(this.props.index);
    }

    showEditPopup(e) {
        this.setState({
            editPopup: {
                type: e.target.id,
                status: true
            }
        })
    }

    removeEditPopup() {
        this.setState({
            editPopup: {
                type: '',
                status: false
            }
        })
    }

    editButton(type) {
        const oneDay = 61 * 60 * 24 * 1000;
        const now = new Date();
        const oneDayAgo = new Date(now-oneDay);
        if (new Date(this.props.item.date_created) > oneDayAgo || !this.props.item.date_created) {
            return <p className='edit-button' id={type} onClick={(e) => this.showEditPopup(e)}>Edit {type}</p>
        }
        else {
            return;
        }
    }

    render() {

        const editPopup = this.state.editPopup.status 
            ? 
            <EditPopup 
                item={this.props.item} 
                type={this.state.editPopup.type}
                removeEditPopup={this.removeEditPopup}
                handleChangeInput={this.props.handleChangeInput}
                handleSubmit={this.handleSubmit}
                index={this.props.index}
                errorPopup
                /> 
            : '';

        return(
            <section className="current-product">
                {editPopup}
                <div className='your-product-title'>
                    <h2>{this.props.item.title}</h2>{this.editButton('title')}
                </div>
                <form className="change-items" onSubmit={(e) => this.handleSubmit(e)}>
                    <img className="product-pic" src={this.props.item.img} alt={this.props.item.title}/>
                    {this.editButton('img')}
                    {/* <Stars rating={this.props.item.rating}/> */}

                    <p>{this.props.item.description}</p>
                    <p className="description">{this.props.item.description}</p>

                    {this.editButton('description')}
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
                        className="select-ad"
                        id="ad" 
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index)}
                        value={this.props.item.ad}>
                        <option value='None'>None</option>
                        <option value='Homepage ads'>Homepage ads - {this.props.adCosts['Homepage ads']} Play Money per day</option>
                        <option value='Popup ads'>Popup ads - {this.props.adCosts['Popup ads']} Play Money per day</option>
                        <option value='Annoying ads'>Annoying Ads - {this.props.adCosts['Annoying ads']} Play Money per day</option>
                    </select>
                    <button id="submit-changes" type="submit">Submit Changes</button>           
                </form>
                <div className="choose-buttons">
                    <button onClick={() => this.props.handleDelete(this.props.index)}>Delete</button>
                    {/* <button> See Reviews</button> */}
                </div>
            </section>
        )
    }
}

export default YourProduct;