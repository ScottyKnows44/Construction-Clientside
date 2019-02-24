`use-strict`;

var app = app || {};
const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://seattle_construction.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Project (rawDataObj) {
    this.book_id = rawDataObj.location;
    this.title = rawDataObj.dates;
    this.author = rawDataObj.projectname;
    this.isbn = rawDataObj.url;
    this.description = rawDataObj.description;
  }

  module.array = [];

  Project.prototype.toHtml = function() {
    let template = Handlebars.compile($('#table-template').text());
    return template(this);
  };

  $('#book-list').append(Project.toHtml());

  Project.loadProject = rows => module.array = rows.map(place => new Project(place));

  Project.getArray = callback =>
    $.get(`${ENV.apiUrl}/projects/seattle`)
      .then( results => {
        Project.loadProject(results);
        if (callback) callback();
      });


  Project.getArray();

})(app);