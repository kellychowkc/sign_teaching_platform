import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function displayBookingTable() {
  document.querySelector("#lessonBooking").addEventListener("click", () => {
    let tbodyHtmlStr = ``;
    for (let i = 7; i < 23; i++) {
      let idStr = i.toString().padStart(2, "0");
      let amPmStr = "";
      if (i / 12 < 1) {
        amPmStr = "am";
      } else {
        amPmStr = "pm";
      }
      let numOfTimeStr = (i % 12).toString().padStart(2, "0");
      tbodyHtmlStr += `
            <tr>
                <td class="align-middle">${numOfTimeStr}:00${amPmStr}</td>
                <td><div class="bookingTime" id="Monday${idStr}"></div></td>
                <td><div class="bookingTime" id="Tuesday${idStr}"></div></td>
                <td><div class="bookingTime" id="Wednesday${idStr}"></div></td>
                <td><div class="bookingTime" id="Thursday${idStr}"></div></td>
                <td><div class="bookingTime" id="Friday${idStr}"></div></td>
                <td><div class="bookingTime" id="Saturday${idStr}"></div></td>
                <td><div class="bookingTime" id="Sunday${idStr}"></div></td>
            </tr>
            `;
    }
    document.querySelector("#userInfoDisplay").innerHTML =
      `
        <div class="container" id="teacherTimeTable">
        <div id="userInfoTitle">
            <div>
                <h4 class="mb-3">可預約時間</h4>
            </div>
            <div></div>
        </div>
            <div class="table-responsive">
                <table class="table table-bordered text-center readOnly">
                    <thead>
                        <tr class="bg-light-gray">
                            <th class="text-uppercase">時間</th>
                            <th class="text-uppercase">星期一</th>
                            <th class="text-uppercase">星期二</th>
                            <th class="text-uppercase">星期三</th>
                            <th class="text-uppercase">星期四</th>
                            <th class="text-uppercase">星期五</th>
                            <th class="text-uppercase">星期六</th>
                            <th class="text-uppercase">星期日</th>
                        </tr>
                    </thead>
                    <tbody>
                    ` +
      tbodyHtmlStr +
      `
                    </tbody>
                </table>
            </div>
        </div>
        `;

    displayTeacher();
  });
}

async function displayTeacher() {
  const resp = await fetch("/userInfo/displayTeacherTimeTable", { method: "POST" });
  const result = await resp.json();
  if (result.success === true) {
    const teacherData = result.message;
    for (let teacher of teacherData) {
      document.querySelectorAll(".bookingTime").forEach((booking) => {
        const bookingId = booking.getAttribute("id");
        if (bookingId === teacher["bookingId"]) {
          booking.innerHTML += `
                    <span class="bg-green padding-5px border-radius-5 margin-1px-lr text-white font-size16  xs-font-size13 bookingBtn" id="${teacher["name"]}" value="${teacher["bookingId"]}">${teacher["name"]}</span>
                    `;

          selectTeacher();
        }
      });
    }
  }
}

function selectTeacher() {
  document.querySelectorAll(".bookingBtn").forEach((item) => {
    item.addEventListener("click", async () => {
      const teacherName = item.getAttribute("id");
      const bookingData = item.getAttribute("value");
      console.log(teacherName, bookingData);
      const resp = await fetch("/userInfo/displayTeacherTimeTable", { method: "POST" });
      const result = await resp.json();
      if (result.success === true) {
        const teacherData = result.message;
        for (let teacher of teacherData) {
          if (teacherName === teacher["name"] && bookingData === teacher["bookingId"]) {
            const weekday = teacher["bookingId"].substring(0, teacher["bookingId"].length - 2);
            const time = teacher["bookingId"].substring(teacher["bookingId"].length - 2) + ":00:00";
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });

            swalWithBootstrapButtons
              .fire({
                title: "是否選擇此時段, 此導師？",
                text: `導師 : ${teacher["name"]}, ${weekday} ${time}`,
                imageUrl: `../assets/usersImages/${teacher["image"]}`,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: `${teacher["name"]}`,
                showCancelButton: true,
                confirmButtonText: "是",
                cancelButtonText: "否",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  selectBookingDate(teacher["id"], weekday, time);
                }
              });
          }
        }
      }
    });
  });
}

async function selectBookingDate(id, weekday, time) {
  const { value: selectedDate } = await Swal.fire({
    title: "請選擇日子",
    input: "select",
    inputOptions: await displayBookingDate(id, weekday, time),
    inputPlaceholder: "請選擇日子",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value !== "請選擇日子") {
          resolve();
        } else {
          resolve("請選擇日子!!");
        }
      });
    },
  });

  if (selectedDate) {
    const result = await bookingLesson(id, selectedDate, time);
    if (result === true) {
      Swal.fire({
        icon: "success",
        title: "預約成功",
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "請購買課堂卷",
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        window.location.reload();
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "預約失敗",
      showConfirmButton: false,
      timer: 1500,
    }).then(function () {
      window.location.reload();
    });
  }
}

async function displayBookingDate(id, weekday, time) {
  const data = {};
  data["id"] = id;
  data["weekday"] = weekday;
  data["time"] = time.substring(0, 2);
  const resp = await fetch("/userInfo/getCanBookDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await resp.json();
  if (result.success === true) {
    const dates = {};
    const dateList = result.message;
    for (let date of dateList) {
      dates[`${date}`] = date;
    }
    return dates;
  }
}

async function bookingLesson(id, date, time) {
  const bookingData = {};
  bookingData["id"] = id;
  bookingData["date"] = date;
  bookingData["time"] = time;
  const resp = await fetch("/userInfo/bookingLesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  const result = await resp.json();
  if (result.success === true) {
    return true;
  } else {
    return false;
  }
}
