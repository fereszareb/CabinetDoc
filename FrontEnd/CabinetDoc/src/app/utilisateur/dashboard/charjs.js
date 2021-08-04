// chart config
var ctx2 = document.getElementById("stat").getContext("2d");
var chart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: b.label,
    datasets: [
      {
        backgroundColor: "#54D8FF20",
        borderColor: "#54D8FF",
        borderWidth: 1,
        data: b.line1,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#54D8FF",
      },
      {
        backgroundColor: "#A7A7FF20",
        borderColor: "#A3A0FB",
        borderWidth: 1,
        data: b.line2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#A3A0FB",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 1,
    },
  },
});
