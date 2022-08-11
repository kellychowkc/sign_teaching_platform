
export function startLesson() {
    document.querySelector("#startLesson").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayLessonLink", { method: "POST" });
        const result = await resp.json();
        if (result) {
            const data = result.message;
            if (data["identity"] === "teacher") {
                document.querySelector("#userInfoDisplay").innerHTML = `
                <div class="container" id="teacherTimeTable">
                    <div id="userInfoTitle">
                        <div>
                            <h4 class="mb-3">請選擇課堂</h4>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr class="bg-light-gray">
                                    <th class="text-uppercase">學生</th>
                                    <th class="text-uppercase">時間</th>
                                    <th class="text-uppercase">課堂</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                `;

                const lessonData = data["lesson"];
                for (let lesson of lessonData) {
                    if (lesson["lessonLink"] == null) {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["student"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>準備中</td>
                        </tr>
                        `;
                    } else {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["student"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td><a href="${lesson["lessonLink"]}">${lesson["lessonLink"]}</a></td>
                        </tr>
                        `;
                    }
                }
            } else if (data["identity"] === "student") {
                document.querySelector("#userInfoDisplay").innerHTML = `
                <div class="container" id="teacherTimeTable">
                    <div id="userInfoTitle">
                        <div>
                            <h4 class="mb-3">請選擇課堂</h4>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr class="bg-light-gray">
                                    <th class="text-uppercase">導師</th>
                                    <th class="text-uppercase">時間</th>
                                    <th class="text-uppercase">課堂</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                `;

                const lessonData = data["lesson"];
                for (let lesson of lessonData) {
                    if (lesson["lessonLink"] == null) {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["teacher"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>準備中</td>
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
        }
    })
}