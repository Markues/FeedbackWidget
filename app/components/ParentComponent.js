import React from 'react';
import Feedback from './Feedback';

class ParentComponent extends React.Component {
  render() {
    let path = this.props.location.pathname;
    let queryStr = this.props.location.search;
    let fullUrl = path + queryStr;

    // Parse query string for 'name' variable
    function getParameterByName(url) {
      return function(name) {
        var adjName = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + adjName + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) {
          return null;
        }
        if (!results[2]) {
          return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      };
    }

    let getQueryParam = getParameterByName(fullUrl);
    let item = getQueryParam('item');

    return (
      <div className='container'>
        <div className='panel panel-default'>
          <Feedback item={item} url={fullUrl}/>
        </div>
      </div>
    );
  }
}

export default ParentComponent;
