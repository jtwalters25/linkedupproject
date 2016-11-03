(function(module) {
  /*
   * https://api.meetup.com/topics?key=MEETUP_KEY&search=farming&order=members
   * https://api.meetup.com/find/groups?zip=11211&radius=1&category=34&order=members&key=MEETUP_KEY
   */
   /*
      <script type="text/javascript" src="//platform.linkedin.com/in.js">
        api_key:78jbwdgk7fup6m
        authorize:true
      </script>
    */
   $.getJSON('/meetup/topics?search=search&order=members', function(data) {
      console.log(data.results);
   }).success(function() {

   });
   
   $('#buttontest').on('click', function(e) {
    if (!IN.User.isAuthorized()) {
      IN.User.authorize(function() {
        console.log('Logged in.');
        IN.API.Profile('me').fields('id,firstName,lastName,headline').result(function (data) {
          console.log(data.values[0].firstName + ' ' + data.values[0].lastName + ', ' + data.values[0].headline + ' is logged in now.');
        });
      });
    } else {
      IN.User.logout(function() {
        console.log('Logged out. ');
      });
    }
  });
})(window);
