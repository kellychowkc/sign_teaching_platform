import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function startLessonForStudent() {
  document.querySelector("#startLesson").addEventListener("click", async () => {
    const resp = await fetch("/userInfo/displayLessonForStudent", { method: "POST" });
    const result = await resp.json();
    if (result) {
      const data = result.message;
      document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="container" id="studentLessonLink">
                <div id="userInfoTitle">
                    <div>
                        <h4 class="mb-3">請選擇課室</h4>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-light-gray">
                                <th class="text-uppercase">導師</th>
                                <th class="text-uppercase">時間</th>
                                <th class="text-uppercase">課室</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            `;
      if (data.length > 0) {
        for (let lesson of data) {
          if (lesson["lessonLink"] === null) {
            document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["teacher"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>準備中</td>
                        </tr>
                        `;
          } else if (lesson["lessonLink"] === "finish") {
            document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["teacher"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>已下課</td>
                        </tr>
                        `;
          } else {
            document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["teacher"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>
                                <button type="button" class="btn formBtn enterBtn" value="${lesson["id"]}">入課室</button>
                            </td>
                        </tr>
                        `;
          }
        }
        enterLesson();
      }
    }
  });
}

function enterLesson() {
  document.querySelectorAll(".enterBtn").forEach((lesson) => {
    lesson.addEventListener("click", async () => {
      const lessonId = lesson.getAttribute("value");
      const data = { id: lessonId };
      const resp = await fetch("/userInfo/displayThisLessonData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (result.success === true) {
        const lessonData = result.message;
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "是否要進入課室？",
            text: `導師 : ${lessonData["teacher"]}, 時間 : ${lessonData["time"]}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "是",
            cancelButtonText: "否",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = `./onlineLesson.html?room=${lessonData["link"]}`;
            }
          });
      }
    });
  });
}
