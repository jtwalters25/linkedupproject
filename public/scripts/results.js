'use strict';
(function(module){

var resultsView{};

var render = function(results){
var template = Handlebars.compile($('#results-template').text());

return template(results);
};
