'use strict';

(function(module) {

  var homeView = {};

  homeView.showingTabs = function(e){
    $('.tab-content').hide();
    $('#home').show();
  };
  $('.main-nav ul a').on('click', function(){
    var $showstuff = $(this).data('tab');
    $('.tab-content').hide();
    $('#' + $showstuff ).show();
  });

  homeView.toggleNavDisplay = function() {
    $('.icon-menu').on('click', function() {
      $('.main-nav ul').toggle();
    });
  };


  homeView.showResults = function() {
      $('#loginbutton').on('click', function() {
        $('.tab-content').hide();
        $('#results').show();
      });
    };

  homeView.showResults();
  homeView.toggleNavDisplay();
  homeView.showingTabs();

  module.homeView = homeView;
})(window);
