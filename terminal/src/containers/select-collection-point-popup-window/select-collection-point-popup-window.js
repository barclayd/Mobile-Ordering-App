import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'
import CollectionPointStockImage from '../../assets/collectionPointStockImage.jpeg'


class SelectCollectionPointPopUpWindow extends Component {
    state = { closePopup: null }
    
    render () {
        return (
            <PopupWindow
                    className="selectCollectionPointPopup"
                    title="Collection points:"
                    subtitle={<span>Choose a collection point for the bar</span>}
                    showCloseButton={false}
                    showFunc={this.props.showFunc}
                    closePopup={this.state.closePopup}
            >
                <div className="collectionPointContainer">
                    {
                        this.props.collectionPoints.map((collectionPointData, counter) => {
                            return (
                                <div
                                        key={counter} 
                                        onClick={()=>{
                                            this.setState({closePopup: true}, () => {
                                                this.setState({closePopup: null});
                                                this.props.changeColletionPointFunc(collectionPointData._id);
                                            });
                                        }} 
                                        className="button collectionPointButton">

                                    <img alt="Pic of collection point" src={CollectionPointStockImage}/>
                                    <span className="title">{collectionPointData.name}</span>
                                    <br/>
                                    <span className="description">{collectionPointData.description || "No description."}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </PopupWindow>
        )
    }
};

SelectCollectionPointPopUpWindow.propTypes = {
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
    collectionPoints: PropTypes.array.isRequired,
    changeColletionPointFunc: PropTypes.func.isRequired // Func to change the collection point to pull appropriate orders
};

export default SelectCollectionPointPopUpWindow;