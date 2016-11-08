(function(module) {

  var template = Handlebars.compile($('#results-template').text());

  function handleLoginButton() {
    if (IN.User.isAuthorized()) {
      authorizeUser();
    } else {
      logout();
    }
  }

  function authorizeUser() {
    IN.User.authorize(function() {
      IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function(profile) {
        $.getJSON('/meetup/topics?search=' + profile.values[0].industry + '&order=members', function(data) {
          renderResults(data.results);
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

$(function(){
  $('#loginbutton').on('click', handleLoginButton);

  if (IN.User.isAuthorized()) {
    $('#loginbutton').text('Log Out');
  }
});



})(window);
