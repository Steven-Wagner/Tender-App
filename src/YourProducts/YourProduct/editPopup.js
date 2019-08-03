import React, {Component} from 'react';
import './editPopup.css';

class EditPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oldValues: 
                this.props.item
            
        }

        this.handleEditPopupSubmit = this.handleEditPopupSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleEditPopupSubmit(e) {
        this.props.handleSubmit(e)
        .then(success => {
            if (success) {
                this.props.removeEditPopup();
            }
        })
    }

    handleCancel(type) {
        const infoToChange = {target: {id: type, value: this.state.oldValues[type]}};
        this.props.handleChangeInput(infoToChange, this.props.index);
        this.props.removeEditPopup();
    }

    render() {
        let content;

        if (this.props.type === 'title') {
            content = 
            <form className="change-popup-items" onSubmit={(e) => this.handleEditPopupSubmit(e)}>
                <label htmlFor="title">Title</label>
                    <input 
                        value={this.props.item.title}
                        type="text" 
                        id="title"
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index)}
                    />
                <button id="submit-changes" type="submit">Submit Changes</button>  
                <button id="cancel-edit" onClick={(e) => this.handleCancel(this.props.type)}>Cancel</button>  
            </form>
        }
        if (this.props.type === 'img') {
            content = 
            <form className="change-popup-items" onSubmit={(e) => this.handleEditPopupSubmit(e)}>
                <label htmlFor="img">Img</label>
                    <input 
                        value={this.props.item.img}
                        type="url" 
                        id="img"
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index)}
                    />
                <button id="submit-changes" type="submit">Submit Changes</button>  
                <button id="cancel-edit" onClick={(e) => this.handleCancel(this.props.type)}>Cancel</button>  
            </form>
        }
        if (this.props.type === 'description') {
            content = 
            <form className="change-popup-items" onSubmit={(e) => this.handleEditPopupSubmit(e)}>
                <label htmlFor="description">Description</label>
                    <textarea 
                        value={this.props.item.description}
                        id="description"
                        onChange={(e) => this.props.handleChangeInput(e, this.props.index)}
                    />
                <button id="submit-changes" type="submit">Submit Changes</button>  
                <button id="cancel-edit" onClick={(e) => this.handleCancel(this.props.type)}>Cancel</button> 
            </form>
        }

        return(
            <div className='edit-popup'>
                {content}
            </div>
        )
    }
}

export default EditPopup;