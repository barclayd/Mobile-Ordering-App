import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class PopupWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  
  ShowPopup = () => {
    this.setState({visible: true})
  }
  HidePopup = () => {
    this.setState({visible: false})
  }
  DismissPopup = () => {
    if (this.props.dismissedHandler) {
      this.props.dismissedHandler() // Tell parent that the window was forcefully dismissed (not directly hidden with HidePopup i.e. after marking an order complete)
    }
    this.HidePopup()
  }

  keyPressed = (event) => {
    // Listen for escape key to close popup
    if (event.keyCode === 27)
      this.DismissPopup();
  }
  componentDidMount () {
    this.props.showFunc(this.ShowPopup); // Run func from prop binding this.ShowPopup from this instance to allow parent to call ShowPopup() from state
    document.addEventListener("keydown", this.keyPressed, false);
  }
  componentWillUnmount () {
    document.removeEventListener("keydown", this.keyPressed, false);
  }

  getClassName = () => {
    if (this.props.className) {
      return 'popup ' + this.props.className;
    } else {
      return 'popup';
    }
  }

  renderCloseButton = (shouldShow) => {
    if (shouldShow) {
        return (
            <div className="popup-close-button" onClick={this.DismissPopup} >🗙</div>
        )
    }
  }

  overlayClick = (event) => {
    // Check that the click event has not been triggered on a child element
    if (event.target === event.currentTarget) {
      this.DismissPopup()
    }
  }

  render () {
    if (this.state.visible)
      return (
        <div className={this.getClassName()}>
            <div className='popup-overlay' onClick={this.overlayClick}>
                <div className='popup-container'>
                    { this.renderCloseButton(this.props.showCloseButton) }

                    <h1 className="popup-title">{this.props.title}</h1>
                    <h2 className="popup-subtitle">{this.props.subtitle}</h2>
                    <div className="popup-children-container">
                      { this.props.children }
                    </div>
                </div>
            </div>
        </div>
      )
    else return null
  }
}

PopupWindow.propTypes = {
  className: PropTypes.string.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.object.isRequired, // JSX object
  children: PropTypes.node.isRequired,
  dismissedHandler: PropTypes.func
}