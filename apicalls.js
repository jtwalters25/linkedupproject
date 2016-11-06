(function(module) {
  /*
  <script type="text/javascript" src="//platform.linkedin.com/in.js">
  api_key:78jbwdgk7fup6m
  authorize:true
  </script>
  */
  $.getJSON('/meetup/topics?search=' + query + '&order=members', function(data) {
    console.log(data.results);
  }).success(function() {

  });

  $('#loginbutton').on('click', function(e) {
    if (!IN.User.isAuthorized()) {
      IN.User.authorize(function() {
        console.log('Logged in.');
        IN.API.Profile('me').fields('id,firstName,lastName,industry').result(function (data) {
          console.log(data.values[0].firstName + ' ' + data.values[0].lastName + ', ' + data.values[0].industry + ' is logged in now.');
        });
      });
    } else {
      IN.User.logout(function() {
        console.log('Logged out. ');
      });
    }
  });
})(window);
