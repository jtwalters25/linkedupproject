'use strict';

(function(module) {

var homeView = {};

homeView.showingTabs = function(){
    $('.tab').hide();
    $('#homepage-tab').show();
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

homeView.toogleNavDisplay();
homeView.showingTabs();

  module.homeView = homeView;
})(window);
