(function(module) {
  /*
   * https://api.meetup.com/topics?key=MEETUP_KEY&search=farming&order=members
   * https://api.meetup.com/find/groups?zip=11211&radius=1&category=34&order=members&key=MEETUP_KEY
   */
   $.getJSON('/meetup/topics?search=search&order=members', function(data) {
      console.log(data.results);
   }).success(function() {

   });
})(window);
