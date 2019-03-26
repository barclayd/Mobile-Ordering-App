import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../../containers/popup-window/popup-window'


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
                        this.props.collectionPoints.map((collectionPointData) => {
                            return (
                                <div
                                        key={collectionPointData.id} 
                                        onClick={()=>{
                                            this.setState({closePopup: true}, () => {
                                                this.setState({closePopup: null});
                                                this.props.changeColletionPoint(collectionPointData.id);
                                            });
                                        }} 
                                        className="button collectionPointButton">

                                    
                                    <span className="title">{collectionPointData.name}</span>
                                    <br/>
                                    <span className="description">{collectionPointData.description}</span>
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
    collectionPoints: PropTypes.array,
    showFunc: PropTypes.func, // Callback function held in parent that calls popup window instance's ShowPopup()
    changeColletionPoint: PropTypes.func // Func to change the collection point to pull appropriate orders
};

export default SelectCollectionPointPopUpWindow;