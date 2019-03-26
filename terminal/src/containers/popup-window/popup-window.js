import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'

class PopupWindow extends Component {
  constructor(props) {
    super(props);

    this.popupChildrenContainer = React.createRef();
  }

  state = {
    visible: false,
    topShadowDisplay: "none"
  };

  componentDidMount () {
    this.props.showFunc(this.showPopup); // Run func from prop binding this.ShowPopup from this instance to allow parent to call ShowPopup() from state
    
    // Only allow close hotkey when close button is visible
    if (this.props.showCloseButton) {
      document.addEventListener("keydown", this.keyPressed, false);
    }
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.keyPressed, false);
  }
  componentDidUpdate(prevProps) {
    if (this.props.closePopup !== prevProps.closePopup) {
      this.hidePopup();
    }

    if (this.state.visible) {
      this.popupChildrenContainer.current.addEventListener("scroll", this.handleScroll);
    } else if (this.popupChildrenContainer.current) {
      this.popupChildrenContainer.current.removeEventListener("scroll", this.handleScroll);
    }
  };

  showPopup = () => {
    this.setState({visible: true}, this.updateScrollShadows);
  };

  hidePopup = () => {
    this.setState({visible: false})
  };

  dismissPopup = () => {
    if (this.props.dismissedHandler) {
      this.props.dismissedHandler() // Tell parent that the window was forcefully dismissed (not directly hidden with HidePopup i.e. after marking an order complete)
    }
    this.hidePopup();
  };

  keyPressed = (event) => {
    // Listen for escape key to close popup
    if (event.keyCode === 27)
      this.dismissPopup();
  };

  handleScroll = (event) => {
    this.updateScrollShadows();
  };

  updateScrollShadows = () => {
    let scrollElement = this.popupChildrenContainer.current;

    let scrollTop = scrollElement.scrollTop; // PX scrolled from top
    let scrollBottom = scrollElement.scrollHeight - (scrollTop + scrollElement.clientHeight); // Calc PX scrolled from bottom

    if (scrollTop <= 0) {
      this.setState({topShadowDisplay: "none"})
    } else {
      this.setState({topShadowDisplay: "block"})
    }

    if (scrollBottom <= 0) {
      this.setState({bottomShadowDisplay: "none"})
    } else {
      this.setState({bottomShadowDisplay: "block"})
    }
  };

  renderCloseButton = (shouldShow) => {
    if (shouldShow) {
        return (
            <div className="popup-close-button" onClick={this.dismissPopup} >🗙</div>
        )
    }
  };

  overlayClick = (event) => {
    // Check that the click event has not been triggered on a child element and that close button is allowed
    if (this.props.showCloseButton && event.target === event.currentTarget) {
      this.dismissPopup()
    }
  };

  render () {
    if (this.state.visible) {
      return (
          <div className="popup">
            <div className='popup-overlay' onClick={this.overlayClick}>
              <div className='popup-container'>
                {this.renderCloseButton(this.props.showCloseButton)}

                <h1 className="popup-title">{this.props.title}</h1>
                <h2 className="popup-subtitle">{this.props.subtitle}</h2>

                <div className="popup-scroll-area">
                  <div className="scrollShadow topShadow" style={{display: this.state.topShadowDisplay}}></div>
                  <div ref={this.popupChildrenContainer} className={"popup-children-container " + this.props.className}>
                    {this.props.children}
                  </div>
                  <div className="scrollShadow bottomShadow" style={{display: this.state.bottomShadowDisplay}}></div>
                </div>
                {this.props.buttons}
              </div>
            </div>
          </div>
      )
    } else {
      return null;
    }
  }
}

PopupWindow.propTypes = {
  className: PropTypes.string.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.object.isRequired, // JSX object
  children: PropTypes.node.isRequired,
  dismissedHandler: PropTypes.func,
  closePopup: PropTypes.bool, // If set to true the window will close
  buttons: PropTypes.object // JSX buttons to show at bottom
};

export default PopupWindow;
