
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function startLessonForTeacher() {
    document.querySelector("#startLesson").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayTeacherLessonLink", { method: "POST" });
        const result = await resp.json();
        if (result) {
            const data = result.message;
            document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="container" id="teacherLessonLink">
                <div id="userInfoTitle">
                    <div>
                        <h4 class="mb-3">請選擇課室</h4>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-light-gray">
                                <th class="text-uppercase">學生</th>
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

            for (let lesson of data) {
                if (lesson["lessonLink"] == null) {
                    document.querySelector("tbody").innerHTML += `
                    <tr>
                        <td>${lesson["student"]}</td>
                        <td>${lesson["learningDate"]}</td>
                        <td><button type="button" class="btn btn-primary" id="createLesson">開課</button></td>
                    </tr>
                    `;
                    createLesson();
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
                            <div>
                                <button type="button" class="btn btn-primary" id="enterLesson">入課室</button>
                                <button type="button" class="btn btn-primary" id="closeLesson">下課</button>
                            </div>
                        </td>
                    </tr>
                    `;
                    enterLesson();
                    closeLesson();
                }
            }
        }
    })
}


function createLesson() {
    document.querySelector("#createLesson").addEventListener("click", () => {
        
    })
}
