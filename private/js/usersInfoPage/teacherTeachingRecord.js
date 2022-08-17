export function teacherTeachingRecord() {
  document.querySelector("#teachingRecord").addEventListener("click", () => {
    document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="container bootdey">
            <div class="col-md-7 col-lg-8 m-auto">
                <h3 class="mb-3">教學記錄</h3>
            </div>
            <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="timeline">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    displayTeachingRecord();
  });
}

async function displayTeachingRecord() {
  const resp = await fetch("/userInfo/displayTeachingRecord", { method: "POST" });
  const result = await resp.json();
  if (result.success === true) {
    const teachingData = result.message;
    if (teachingData.length === 0) {
      document.querySelector(".gutters").innerHTML = `
            <div class="text-center">
                <h3 class="display-4 fw-normal">沒有課堂記錄</h3>
            </div>
            `;
    } else {
      for (let student of teachingData) {
        let status = "";
        let statusHtmlStr = "";
        switch (student["status"]) {
          case "booking":
            status = "已預約";
            statusHtmlStr = `<i class="fa-solid fa-circle-plus"></i>`;
            break;
          case "attend":
            status = "出席";
            statusHtmlStr = `<i class="fa-solid fa-circle-check"></i>`;
            break;
          case "absent":
            status = "缺席";
            statusHtmlStr = `<i class="fa-solid fa-circle-x"></i>`;
            break;
        }
        document.querySelector(".timeline").innerHTML += `
                <div class="timeline-row">
                    <div class="timeline-time">
                        ${student["teachingTime"]}<small>${student["teachingDate"]}</small>
                    </div>
                    <div class="timeline-dot fb-bg"></div>
                    <div class="timeline-content">
                        ${statusHtmlStr}
                        <h4>學生 : ${student["studentName"]} , ${status}</h4>
                    </div>
                </div>
                `;
      }
    }
  }
}
