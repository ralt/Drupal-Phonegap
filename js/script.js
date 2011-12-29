/**
 * @file
 * Javascript code launched when the app is launched.
 */

(function() {
  // Starts when the DOM is ready.
  document.addEventListener('DOMContentLoaded', function() {
    // Declares variables for commodity.
    var d = document;
    var error = d.getElementById('error');
    // If the URL is already stored in the localStorage, it puts it back
    // onto the URL field.
    if (localStorage.getItem('url') != null) {
      d.getElementById('url').value = localStorage.getItem('url');
    }

    // Sets the event listener on the start button.
    d.getElementById('start').addEventListener('click', function() {
      // First, it checks if the URL field is well filled in.
      if (d.getElementById('url').value == '') {
        error.appendChild(
          d.createTextNode('Please specify a website address.')
        );
        return;
      }
      // If it is, it stores the value if "Remember" is checked.
      else {
        if (d.getElementById('remember').checked == true) {
          localStorage.setItem('url', d.getElementById('url').value);
        }
      }
      // Instanciates the object.
      var xhr = new XMLHttpRequest();
  
      // Sets the callback function.
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          // Clears the errors.
          error.removeChild(error.firstChild);
          // Depending on the HTTP status retrieved, applies the correct actions.
          switch (xhr.status) {
            case 200:
              // Parses the answer.
              var response = JSON.parse(xhr.responseText);
              // Redirects to the theme.
              window.redirect(response.url);
              break;
            case 403:
              // In case an error happens, displays the correct error message.
              error.appendChild(
                d.createTextNode('Error 403 : Not authorized.')
              );
              break;
            case 404:
              // In case an error happens, displays the correct error message.
              error.appendChild(
                d.createTextNode('Error 404 : Page not found.')
              );
              break;
            case 500:
              // In case an error happens, displays the correct error message.
              error.appendChild(
                d.createTextNode('Error 500 : Internal server error.')
              );
              break;
            default:
              // In case an error happens, displays the correct error message.
              error.appendChild(
                d.createTextNode('Unhandled error.')
              );
              break;
          }
        }
      };

      // Creates the request.
      xhr.open("POST", d.getElementById('url').value + '/phonegap/start');

      // Sets the correct datas.
      var datas = {
        'platform': device.platform,
      };

      // Sets the correct headers.
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json");
  
      // Sends the request.
      xhr.send(datas);
    }, false);
  }, false);
}());

