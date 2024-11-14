document.addEventListener('DOMContentLoaded',function(){
    const ctx = document.getElementById('myChart');
    
    var username = document.getElementById('dashboard-chart').getAttribute('data-username');

    var colourList = ['rgb(8, 124, 188)', 'rgb(2, 104, 195)', 'rgb(43, 127, 227)', 'rgb(14, 87, 187)', 'rgb(36, 72, 172)', 'rgb(26, 63, 243)', 'rgb(26, 66, 206)', 'rgb(32, 78, 245)', 'rgb(29, 52, 212)', 'rgb(14, 85, 244)', 'rgb(25, 84, 206)', 'rgb(9, 59, 184)', 'rgb(24, 66, 188)','rgb(35, 72, 196)', 'rgb(39, 65, 207)', 'rgb(34, 58, 238)', 'rgb(39, 77, 198)', 'rgb(26, 75, 190)', 'rgb(33, 71, 219)', 'rgb(43, 82, 182)'];
    async function fetchData(){
      const response = await fetch(`/${username}/employees/data`);
      var dataPoints = await response.json();
      console.log(dataPoints);
      return dataPoints.data
    }

    var empNames = [];
    var salaries = [];

    fetchData().then(dataPoints => {
      for(let i = 0; i < dataPoints.length; i++){
        empNames.push(dataPoints[i].firstName + " " + dataPoints[i].lastName);
        salaries.push(dataPoints[i].salary);
      }
      // console.log(empNames);
      // console.log(salaries);
      myChart.update(); //due to the async loading of the data, the chart renders before the data is loaded so I update it here so it renders the data. I hate this hack :(
    });

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: empNames,
          datasets: [{
            // label: 'Salary',
            data: salaries,
            backgroundColor: colourList,
            hoverOffset: 4,
          }]
        },
        options: {
            scales: {
                y: {
                beginAtZero: true
                }
            },
            plugins:{
             legend: {
              display: false
             }
            }
        }
    });

});