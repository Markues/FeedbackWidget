import React from 'react';
import {Button} from 'react-bootstrap';
import FeedbackStore from '../stores/FeedbackStore'
import FeedbackActions from '../actions/FeedbackActions';
import ExecutionEnvironment from '../../node_modules/fbjs/lib/ExecutionEnvironment';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = FeedbackStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FeedbackStore.listen(this.onChange);
  }

  componentDidUpdate() {
    if(this.state.renderFeedback == "comments") {
      document.getElementById('commentsCancel').scrollIntoView();
    }
  }

  componentWillReceiveProps(newProps) {
    if(this.props.url !== newProps.url) {
      FeedbackActions.showFeedback();
    }
  }

  componentWillUnmount() {
    FeedbackStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  descValState() {
    // Character validation RegEx
    let re = /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    let descTest = re.test(this.state.descValue);

    if (this.state.descValue.length <= 0) {
      return 'form-group';
    }
    else if (descTest !== false && this.state.descValue.length <= 250) {
      return 'form-group has-success';
    }
    else {
      return 'form-group has-error';
    }
  }

  getCookie(cookieName) {
    if(ExecutionEnvironment.canUseDOM) {
      var cookieVal = "";
      var cookieArray = document.cookie.split(";");
      cookieArray.forEach(function(current, index, array) {
        var splitItem = current.split("=");
        var name = splitItem[0].replace(/^\s+|\s+$/g, "");
        var value = splitItem[1];
        if (name === cookieName) {
          cookieVal = unescape(value);
        }
      });
      return cookieVal;
    }
  }

  render() {
    let subTest = this.state.descValue.length <= 250 && this.state.descValue.length > 0 ? false : true;

    switch (this.state.renderFeedback) {
      case "standard":
        return (
                <div className='pull-left'>
                  <h4>
                    Are you satisfied with your item?&nbsp;
                    <Button
                      bsStyle="default"
                      bsSize="small"
                      onClick={FeedbackActions.submitFeedback.bind(this, "yes", this.props.item, this.props.url,
                        this.state.descValue, this.getCookie("Username"), this.getCookie('UserEmail'))}
                    >
                      Yes
                    </Button>
                    &nbsp;|&nbsp;
                    <Button bsStyle="default" bsSize="small" onClick={FeedbackActions.openComments}>
                      No
                    </Button>
                  </h4>
                </div>
              );
        break;
      case "comments":
        return (
                <div className="col-xs-8" id="comments">
                  <div className='pull-left'>
                    <h4>
                      Are you satisfied with you item?&nbsp;
                      <Button bsStyle="default" bsSize="small" disabled>
                        Yes
                      </Button>
                      &nbsp;|&nbsp;
                      <Button bsStyle="default" bsSize="small" active>
                        No
                      </Button>
                    </h4>
                  </div>
                  <form>
                    <div id="feedbackForm" className={this.descValState()}>
                      <input
                        type="text"
                        className="form-control"
                        id="inputDesc"
                        placeholder="Feedback..."
                        value={this.state.descValue}
                        onChange={FeedbackActions.handleChange}
                        autoComplete="off"
                        required
                      />
                      <span className="help-block pull-right">250 character limit</span>
                    </div>
                    <Button id="commentsCancel" bsSize="small" onClick={FeedbackActions.closeComments}>
                      Cancel
                    </Button>
                    <Button
                      id="commentsSubmit"
                      bsSize="small"
                      bsStyle="primary"
                      disabled={subTest}
                      onClick={FeedbackActions.submitFeedback.bind(this, "no", this.props.item, this.props.url,
                        this.state.descValue, this.getCookie("Username"), this.getCookie('UserEmail'))}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              );
        break;
      case "blank":
        return null;
        break;
      default:
        return null;
    }
  }
}

export default Feedback;
