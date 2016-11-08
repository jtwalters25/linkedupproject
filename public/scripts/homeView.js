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

  homeView.toggleNavDisplay();
  homeView.showingTabs();

  module.homeView = homeView;
})(window);
