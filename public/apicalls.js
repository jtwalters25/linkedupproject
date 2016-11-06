(function(module) {

  $('#loginbutton').on('click', function(e) {
    if (!IN.User.isAuthorized()) {
      IN.User.authorize(function() {
        console.log('Logged in.');
        IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function (data) {
          console.log(data.values[0].firstName + ' ' + data.values[0].lastName + ', ' + data.values[0].industry + ' is logged in now.');
          $.getJSON('/meetup/topics?search=' + data.values[0].industry + '&order=members', function(data) {
            console.log(data.results);
          });
        });
      });
    } else {
      IN.User.logout(function() {
        console.log('Logged out. ');
      });
    }
  });
})(window);
