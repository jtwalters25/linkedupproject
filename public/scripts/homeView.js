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

  homeView.initQuestions = function() {
    $('.questions ul > li').hide();
    $('.questions').show();
  };
    $('.questions').on('click', 'ul', function(e) {
      var target = $(this);
      e.preventDefault();
      $('.questions ul > li').each(function() {
        if ($(this).is(':visible') && $(this).parent().text() != target.text()) {
          $(this).toggle(200);
        }
      });
      target.find('li').toggle(300);
    });


  homeView.initQuestions();
  homeView.toggleNavDisplay();
  homeView.showingTabs();

  module.homeView = homeView;
})(window);
