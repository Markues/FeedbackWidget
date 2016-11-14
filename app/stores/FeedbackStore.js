import alt from '../alt';
import FeedbackActions from '../actions/FeedbackActions';

class FeedbackStore {
  constructor() {
    this.bindActions(FeedbackActions);
    this.descValue = '';
    this.renderFeedback = "standard";
  }

  onOpenSuccessMessage(dataBlob) {
    let options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    toastr.success(dataBlob, "Success!", options);
    this.renderFeedback = "blank";
    this.descValue = "";
  }

  onOpenFailMessage(dataBlob) {
    let options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    toastr.error(dataBlob, "Oops! Something went wrong.", options);
    this.renderFeedback = "blank";
    this.descValue = "";
  }

  onCloseComments() {
    this.renderFeedback = "standard";
    this.descValue = "";
  }

  onOpenComments() {
    this.renderFeedback = "comments";
  }

  onUpdateDescVal(value) {
    this.descValue = value;
  }
}

export default alt.createStore(FeedbackStore);
