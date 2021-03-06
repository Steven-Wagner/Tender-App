import React, {Component} from 'react';
// import Stars from '../../Components/Stars/stars';
import EditPopup from './editPopup';
import yourProductService from './yourProduct-service';
import SalesGraph from './salesGraph';

class YourProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editPopup: {
                type: '',
                status: ''
            },
            graphData: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showEditPopup = this.showEditPopup.bind(this);
        this.removeEditPopup = this.removeEditPopup.bind(this);
        this.editButton = this.editButton.bind(this);
        this.setGraphData = this.setGraphData.bind(this);
    }

    componentDidMount() {
        yourProductService.getSalesInfo(this.props.item.creator_id, this.props.item.id)
        .then(data => {
            this.setGraphData(data);
        })
    }

    setGraphData(data) {
        this.setState({
            graphData: data
        });
    }

    handleSubmit(e) {
        return new Promise((resolve, reject) => {
            e.preventDefault();

            const validate = this.props.validateUpdate(this.props.index, this.props.adCosts);

            if (validate) {
                yourProductService.fetchPatchProduct(this.props.item)
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

    showEditPopup(e) {
        const editType = e.target.dataset.editType;
        this.setState({
            editPopup: {
                type: editType,
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
        //Edit button only renders if item is less that 24 hours old
        //Edit button can accept 'img', 'title', and 'description' as arguments
        const oneDay = 61 * 60 * 24 * 1000;
        const now = new Date();
        const oneDayAgo = new Date(now-oneDay);
        if (new Date(this.props.item.date_created) > oneDayAgo || !this.props.item.date_created) {
            return <p className='edit-button' data-edit-type={type} onClick={(e) => this.showEditPopup(e)}>Edit {type}</p>
        }
        else {
            return;
        }
    }

    render() {
        let displayImg = '';

        //Img only displays if it is not undefined
        if (this.props.item.img) {
            displayImg = <img className="product-pic" src={this.props.item.img} alt={this.props.item.title}/>
        }

        const editPopup = this.state.editPopup.status 
            ? 
            <EditPopup 
                item={this.props.item} 
                type={this.state.editPopup.type}
                removeEditPopup={this.removeEditPopup}
                handleChangeInput={this.props.handleChangeInput}
                handleSubmit={this.handleSubmit}
                index={this.props.index}
                /> 
            : '';

        return(
            <section id={`product-${this.props.item.id}`} className="your-product">
                {editPopup}
                <div className='your-product-title'>
                    <h2 className="title-content">{this.props.item.title}</h2>{this.editButton('title')}
                </div>
                <form className="change-items" onSubmit={(e) => this.handleSubmit(e)}>
                    {displayImg}
                    {this.editButton('img')}
                    {/* <Stars rating={this.props.item.rating}/> */}
                    <SalesGraph data={this.state.graphData} parentId={`product-${this.props.item.id}`}/>

                    <p className="description">{this.props.item.description}</p>

                    {this.editButton('description')}
                    <p>Sold: {this.props.item.sold}</p>
                    <p 
                        className="profit"
                        style={yourProductService.getProfitColor(this.props.item.profit)}>
                        Profit: {this.props.item.profit}
                    </p>
                    <div className="price-chooser">
                        <label className="price-label" htmlFor={`price${this.props.item.title}`}>Price:</label>
                        <input 
                            value={this.props.item.price}
                            id={`price${this.props.item.title}`}
                            type="number" 
                            step="1"
                            onChange={(e) => this.props.handleChangeInput(e, this.props.index, 'price')}/>
                    </div>
                    <label className="current-advertising-label" htmlFor={`ad${this.props.item.title}`}>Current Advertising:</label>
                    <select 
                        className="select-ad"
                        id={`ad${this.props.item.title}`}
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index, 'ad')}
                        value={this.props.item.ad}>
                        <option value='None'>None</option>
                        <option value='Homepage ads'>Homepage ads - {this.props.adCosts['Homepage ads']} Play Money per day</option>
                        <option value='Popup ads'>Popup ads - {this.props.adCosts['Popup ads']} Play Money per day</option>
                        <option value='Annoying ads'>Annoying Ads - {this.props.adCosts['Annoying ads']} Play Money per day</option>
                    </select>
                    <button className="submit-changes" id={`submit-changes${this.props.item.title}`} type="submit">Submit Changes</button>           
                </form>
                {/* <div className="choose-buttons">
                    <button> See Reviews</button>
                </div> */}
            </section>
        )
    }
}

export default YourProduct;