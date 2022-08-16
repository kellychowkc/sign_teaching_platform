export async function displayDashboard() {
  await document.querySelector("#dashboard").addEventListener("click", () => {
    document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="container text-center">
            <div class="col-md-7 col-lg-8 m-auto">
            <h3 class="mb-3">課堂記錄</h3>
            </div>
        <div class="container text-center">
            <div class="row row-cols-3" id="lessonRecord">
            </div>
            <div class="row">
            <div class="col-sm" id="chart1" style="width: 600px; height: 400px"></div>
            <div class="col-sm" id="chart2" style="width: 600px; height: 400px"></div>
            </div>
        </div>
        `;
    displayOrderRecord();
    displayChart();
  });
}

async function displayOrderRecord() {
  document.querySelector("#lessonRecord").innerHTML = "";
  const resp = await fetch("/userInfo/displayOrderRecord", { method: "POST" });
  const result = await resp.json();
  if (result.success === true) {
    const data = result.message;
    if (data.length === 0) {
      document.querySelector("#lessonRecord").innerHTML = `
              <div class="text-center">
                  <h3 class="display-4 fw-normal">沒有任何課堂記錄</h3>
              </div>
              `;
    } else {
      const orderIdList = [];
      for (let order of data) {
        const orderId = order["orderId"];
        orderIdList.push(orderId);
        document.querySelector("#lessonRecord").innerHTML += `
                  <div class="text-center">
                      <div class="col">
                          <div class="card mb-4 rounded-3 shadow-sm">
                              <div class="card-body">
                                  <h5 class="card-title">${order["packageName"]}</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">購買日期 : ${order["createdDate"]}</h6>
                                  <p class="card-text">總課堂數 : ${order["totalLessonNum"]}<br/>可使用堂數 : ${order["remainingLessonNum"]}</p>
                                  <button type="button" class="w-100 btn btn-primary orderBtn" value="${order["orderId"]}">詳細資料</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  `;
        getPerformanceData(orderId);
        displayOrderData();
      }
    }
  }
}

async function getPerformanceData(orderId) {
  try {
    let data = {};
    data["id"] = orderId;
    const resp = await fetch("/userInfo/displayOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await resp.json();
    lessonDataList = [];
    if (result.success === true) {
      const data = result.message;
      const orderData = data["order"];
      let usedLessonNum =
        Number(orderData[0]["totalLessonNum"]) - Number(orderData[0]["remainingLessonNum"]);
      const lessonData = data["lessonList"];
      let bookingNum = 0;
      let attendNum = 0;
      let absentNum = 0;
      if (lessonData) {
        let i = 0;
        while (i < lessonData.length) {
          let status = "";
          switch (lessonData[i]["lessonStatus"]) {
            case "booking":
              status = "已預約";
              bookingNum++;
              break;
            case "attend":
              status = "出席";
              attendNum++;
              break;
            case "absent":
              status = "缺席";
              absentNum++;
              break;
          }
          i++;
        }
        lessonDataList.push(bookingNum, attendNum, absentNum);
      } else {
        lessonDataList.push(bookingNum, attendNum, absentNum);
      }
    }

    console.log(lessonDataList);
  } catch (err) {
    console.log(err);
  }
}

function displayOrderData() {
  document.querySelectorAll(".orderBtn").forEach((item) => {
    item.addEventListener("click", async () => {
      const orderId = item.getAttribute("value");
      if (orderId) {
        let data = {};
        data["id"] = orderId;
        const resp = await fetch("/userInfo/displayOrderData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await resp.json();
        if (result.success === true) {
          const data = result.message;
          const orderData = data["order"];
          let usedLessonNum =
            Number(orderData[0]["totalLessonNum"]) - Number(orderData[0]["remainingLessonNum"]);
          const lessonData = data["lessonList"];
          let lessonHtmlStr = ``;
          let statusHtmlStr = ``;
          let bookingNum = 0;
          let attendNum = 0;
          let absentNum = 0;
          if (lessonData) {
            let i = 0;
            while (i < lessonData.length) {
              let status = "";
              switch (lessonData[i]["lessonStatus"]) {
                case "booking":
                  status = "已預約";
                  bookingNum++;
                  break;
                case "attend":
                  status = "出席";
                  attendNum++;
                  break;
                case "absent":
                  status = "缺席";
                  absentNum++;
                  break;
              }
              lessonHtmlStr += `
                              <tr>
                                  <td>${i + 1}</td>
                                  <td>${lessonData[i]["teacherName"]}</td>
                                  <td>${lessonData[i]["lessonDate"]}</td>
                                  <td>${status}</td>
                              </tr>
                              `;
              i++;
            }
            statusHtmlStr = `
                          <h6 class="mb-3" class="status-info">已預約 : ${bookingNum} 堂 | 出席 : ${attendNum} 堂 | 缺席 : ${absentNum} 堂</h6>
                          `;
          } else {
            statusHtmlStr = `
                          <h6 class="mb-3" class="status-info">已預約 : ${bookingNum} 堂 | 出席 : ${attendNum} 堂 | 缺席 : ${absentNum} 堂</h6>
                          `;
          }
          xdialog.open({
            title: `${orderData[0]["packageName"]}`,
            body:
              `\
                          <div class="container text-center">\
                              <h4 class="mb-3">購買日期 : ${orderData[0]["createdDate"]}</h4>\
                              <h5 class="mb-3">可使用堂數 : ${orderData[0]["totalLessonNum"]} 堂 | 已使用 : ${usedLessonNum} 堂</h5>` +
              statusHtmlStr +
              `
                              <table class="table table-bordered text-center">\
                                  <thead>\
                                      <tr class="bg-light-gray">\
                                          <th class="text-uppercase">堂數</th>\
                                          <th class="text-uppercase">導師</th>\
                                          <th class="text-uppercase">上課日期</th>\
                                          <th class="text-uppercase">課堂狀況</th>\
                                      </tr>\
                                  </thead>\
                                  <tbody>` +
              lessonHtmlStr +
              `
                                  </tbody>\
                              </table>\
                          </div>`,
            style: "width: 60%;",
          });
        }
      }
    });
  });
}

async function displayChart() {
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
  await myChart1.setOption(option1);
  await myChart2.setOption(option2);
}
