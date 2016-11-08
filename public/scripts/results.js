'use strict';
(function(module){

  var source   = $("#results-template").html();
  var template = Handlebars.compile(source);


  $('#loginbutton').on('click', function(e) {
    if (!IN.User.isAuthorized()) {
      IN.User.authorize(function() {
        console.log('Logged in.');
        IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function (data) {
          console.log(data.values[0].firstName + ' ' + data.values[0].lastName + ', ' + data.values[0].industry + ' is logged in now.');
          $.getJSON('/meetup/topics?search=' + data.values[0].industry + '&order=members', function(data) {
            console.log(data.results);
            var i;
            for (i=0; i <= 9; i++)
            $("#meetUps").append(template(data.results));
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
