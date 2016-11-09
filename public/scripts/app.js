(function(module) {

  let linkedUp = { };

  let template = Handlebars.compile($('#results-template').text());

  function handleLoginButton() {
    if (IN.User.isAuthorized()) {
      authorizeUser();
    } else {
      logout();
    }
  }

  function getZipCode(callback) {
    $.getJSON('http://jsonip.com/', function(ipData) {
      $.getJSON('http://freegeoip.net/json/' + ipData.ip, function(zipData) {
        callback(zipData.zip_code);
      });
    });
  }

  function authorizeUser() {
    IN.User.authorize(function() {
      IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function(profile) {
        $.getJSON('/meetup/topics?search=' + profile.values[0].industry + '&order=members', function(data) {
          renderResults(data.results);
          refreshButtonText();
        });
      });
    });
  }

  function renderResults(data) {
    for (let i = 0;i < 10;i++) {
      $('#meetup-results').append(template(data[i]));
    }
  }

  function logout() {
    IN.User.logout(function() {
      console.log('Logged out. ');
    });
  }

  function refreshButtonText() {
    if (IN.User.isAuthorized()) {
      $('#loginbutton').text('Log Out');
    } else {
      $('#loginbutton').text('Log In');
    }
  }

  linkedUp.initialize = function() {
    $('#loginbutton').on('click', handleLoginButton);
    refreshButtonText();
  };

  module.linkedUp = linkedUp;
})(window);
