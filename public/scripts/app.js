(function(module) {

  let linkedUp = { };

  let template = Handlebars.compile($('#results-template').text());

  function handleLoginButton() {
    if (!IN.User.isAuthorized()) {
      authorizeUser();
    } else {
      logout();
    }
  }

  function getZipCode(callback) {
    //$.getJSON('/ip/', function(ipData) {
    $.getJSON('http://freegeoip.net/json/', function(zipData) {
      callback(zipData.zip_code);
    });
    //});
  }

  function authorizeUser() {
    IN.User.authorize(function() {
      IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function(profile) {
        getZipCode(function(zip) {
          console.log('Retrieving results for ' + profile.values[0].industry + ' near ' + zip);
          $.getJSON('meetup/2/open_events?text=' + profile.values[0].industry + '&time=2d,2w&zip=' + zip + '&status=upcoming', function(data) {
            renderResults(data.results);
            refreshButtonText();
          });
        });
      });
    });
  }

  function renderResults(data) {
    for (let i = 0;i < 10;i++) {
      if (data[i]&&data[i].time){
        data[i].time = new Date(data[i].time).toString();
        $('#meetup-results').append(template(data[i]));
      }  
    }
    $('.tab-content').hide();
    $('#results').show();
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
