import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class PopupWindow extends React.Component {
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
            <div className="popup-close-button" onClick={this.props.closeFunc} >🗙</div>
        )
    }
  }

  overlayClick = (event) => {
    // Check that the click event has not been triggered on a child element
    if (event.target === event.currentTarget) {
      this.props.closeFunc()
    }
  }

  render () {
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
  }
}

PopupWindow.propTypes = {
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  closeFunc: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node
}