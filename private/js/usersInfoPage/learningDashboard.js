export async function displayDashboard() {
  document.querySelector("#dashboard").addEventListener("click", () => {
    document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="container text-center">
            <div class="col-md-7 col-lg-8 m-auto">
                <h4 class="mb-3">學習進度</h4>
            </div>
            <div id="chart1" style="width: 600px; height: 400px"></div>
            <div id="chart2" style="width: 600px; height: 400px"></div>
        </div>
        `;
    displayChart();
  });
}

function displayChart() {
  let myChart1 = echarts.init(document.getElementById("chart1"));
  let myChart2 = echarts.init(document.getElementById("chart2"));

  // Specify the configuration items and data for the chart
  let option1 = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "learningProgress",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "已出席" },
          { value: 735, name: "缺席" },
          { value: 580, name: "已預約" },
          { value: 484, name: "未預約" },
        ],
      },
    ],
  };

  let option2 = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 20,
          distance: -60,
          formatter: function (value) {
            if (value === 0.875) {
              return "A";
            } else if (value === 0.625) {
              return "B";
            } else if (value === 0.375) {
              return "C";
            } else if (value === 0.125) {
              return "D";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-20%"],
          fontSize: 30,
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, "0%"],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + "%";
          },
          color: "auto",
        },
        data: [
          {
            value: 0.7,
            name: "出席率",
          },
        ],
      },
    ],
  };
  // Display the chart using the configuration items and data just specified.
  myChart1.setOption(option1);
  myChart2.setOption(option2);
}
