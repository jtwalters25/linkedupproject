(function(module) {

  let linkedUp = { };
// linkedUp module
  let template = Handlebars.compile($('#results-template').text());

  function handleLoginButton() {
    if (!IN.User.isAuthorized()) {
      authorizeUser();
    } else {
      logout();
    }
  }
// login button
  function getZipCode(callback) {
    $.getJSON('http://freegeoip.net/json/', function(zipData) {
      callback(zipData.zip_code);
    });
  }
// uses users ip address to geolocate to render local data.  If running off vpn or something it would give vpn location
  function authorizeUser() {
    IN.User.authorize(function() {
      searchAndRenderMeetups(switchToResultsTab);
    });
  }
  
  function searchAndRenderMeetups(callback) {
    IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function(profile) {
      let search = profile.values[0].industry.replace(' ', ',');
      getZipCode(function(zip) {
        console.log('Retrieving results for ' + search + ' near ' + zip);
        $('#username').text(profile.values[0].firstName + ' ' + profile.values[0].lastName);
        $.getJSON('meetup/2/open_events?text=' + search + '&time=2d,2w&zip=' + zip + '&status=upcoming', function(data) {
          renderResults(data.results);
          refreshButtonText();
          if (callback)
            callback();
        });
      });
    });
  }

  function renderResults(data) {
    for (let i = 0;i < 10;i++) {
      if (data[i] && data[i].time) {
        data[i].time = new Date(data[i].time).toString();
        $('#meetup-results').append(template(data[i]));
      }
    }
  }

  function switchToResultsTab() {
    $('.tab-content').hide();
    $('#results').show();
  }

  function logout() {
    IN.User.logout(function() {
      console.log('Logged out. ');
      refreshButtonText();
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
    if (IN.User.isAuthorized()) {
      searchAndRenderMeetups();
    }
  };

  module.linkedUp = linkedUp;
})(window);
