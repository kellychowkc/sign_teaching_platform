
export function startLessonForStudent() {
    document.querySelector("#startLesson").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayStudentLessonLink", { method: "POST" });
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
                        <td><a href="${lesson["lessonLink"]}">${lesson["lessonLink"]}</a></td>
                    </tr>
                    `;
                }
            }
        }
    })
}
