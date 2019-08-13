import React, {Component} from 'react';
import './editPopup.css';

class EditPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oldValues: this.props.item,
            img: ''
        }

        this.handleEditPopupSubmit = this.handleEditPopupSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
    }

    componentDidMount() {
        //When editing a products img the text area is blank. The old value still persists until submit is clicked
        if(this.props.type === 'img') {
            const setImgToUndefined = {target: {id: 'img', value: ''}};
            this.props.handleChangeInput(setImgToUndefined, this.props.index)
        }
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

    handleChangeImg(e, index) {
        this.setState({
            img: e.target.value
        })
        this.props.handleChangeInput(e, index)
    }

    render() {
        //Renders slightly differnt forms depeding on props.type
        //props.type can be 'title', 'img', 'description'

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
                        value={this.state.img}
                        type="url" 
                        id="img"
                        onChange={(e) => this.handleChangeImg(e, this.props.index)}
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
                        className="edit-description"
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