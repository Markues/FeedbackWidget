import alt from '../alt';

class FeedbackActions {
  constructor() {
    this.generateActions(
      'openSuccessMessage',
      'openFailMessage',
      'closeComments',
      'openComments',
      'updateDescVal'
    );
  }

  submitFeedback(useful, item, url, comments, username, userEmail) {
    let dataBlob = {};

    if(!comments) {
      dataBlob = {
        "useful": useful,
        "item": item,
        "url": url,
        "username": username || "Guest",
        "userEmail": userEmail || "Guest"
      };
    } else {
      dataBlob = {
        "useful": useful,
        "item": item,
        "url": url,
        "feedback": comments,
        "username": username || "Guest",
        "userEmail": userEmail || "Guest"
      }
    }

    $.ajax({
      url: '/api/feedback',
      data: dataBlob
    })
      .done((data) => {
        this.actions.openSuccessMessage(data);
      })
      .fail((jqXhr) => {
        this.actions.openFailMessage(jqXhr);
      });
  }

  showFeedback() {
    // Show the standard feedback form
    this.actions.closeComments();
  }

  closeComments() {
    this.actions.closeComments();
  }

  openComments() {
    this.actions.openComments();
  }

  handleChange(event) {
    if(event.target.id === "inputDesc") {
      this.actions.updateDescVal(event.target.value);
    }
  }
}

export default alt.createActions(FeedbackActions);
