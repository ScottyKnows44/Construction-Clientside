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
        module.array.push(results);
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


  function buttonEvents() {

    let prevous = document.getElementById('prevous');
    let next = document.getElementById('next');

    prevous.addEventListener('click', prevousButton);
    next.addEventListener('click', nextButton);

    function prevousButton(event) {
      event.preventDefault();
      console.log('prevous');

    }

    function nextButton(event) {
      event.preventDefault();

      let tableData = '';

      for(let i=10; i < 20; i++){
        tableData += '<tr>';
        tableData += '<td>'+ module.array[i].location +'</td>';
        tableData += '<td>'+ module.array[i].dates +'</td>';
        tableData += '<td>'+ module.array[i].projectname +'</td>';
        tableData += '<td>'+ module.array[i].url +'</td>';
        tableData += '<td>'+ module.array[i].description +'</td>';
        tableData += '</tr>';

      }
      $('#table').append(tableData);
      console.log('next');

    }
  }

  Project.getArray();
  buttonEvents();
  console.log(module.array);
  module.Project = Project;

})(app);