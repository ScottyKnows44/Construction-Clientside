`use-strict`;

var app = app || {};
const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://seattle_construction.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Project (rawDataObj) {
    this.location = rawDataObj.location;
    this.dates = rawDataObj.dates;
    this.projectname = rawDataObj.projectname;
    this.url = rawDataObj.url;
    this.description = rawDataObj.description;
  }

  module.array = [];

  Project.getArray = callback =>
    $.get(`${ENV.apiUrl}/projects/seattle`)
      .then( results => {
        let tableData = '';
    
        $.each(results, function (i, value) {
          tableData += '<tr>';
          tableData += '<td>'+ value.location +'</td>';
          tableData += '<td>'+ value.dates +'</td>';
          tableData += '<td>'+ value.projectname +'</td>';
          tableData += '<td>'+ value.url +'</td>';
          tableData += '<td>'+ value.description +'</td>';
          tableData += '</tr>';
          return i <10;
        });
        $('#table').append(tableData);
        if (callback) callback();
      });

  Project.getArray();

  

  module.Project = Project;

})(app);