
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function startLessonForTeacher() {
    document.querySelector("#startLesson").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayLessonForTeacher", { method: "POST" });
        const result = await resp.json();
        if (result.success === true) {
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
            if (data.length > 0) {
                for (let lesson of data) {
                    if (lesson["lessonLink"] == null) {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["student"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td><button type="button" class="btn btn-primary createBtn" value="${lesson["id"]}">開課</button></td>
                        </tr>
                        `;
                    } else if (lesson["lessonLink"] === "finish") {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["student"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>已下課</td>
                        </tr>
                        `;
                    } else {
                        document.querySelector("tbody").innerHTML += `
                        <tr>
                            <td>${lesson["student"]}</td>
                            <td>${lesson["learningDate"]}</td>
                            <td>
                                <div>
                                    <button type="button" class="btn btn-primary enterBtn" value="${lesson["id"]}">入課室</button>
                                    <button type="button" class="btn btn-primary closeBtn" value="${lesson["id"]}">下課</button>
                                </div>
                            </td>
                        </tr>
                        `;
                    }
                }

                createLesson();
                enterLesson();
                closeLesson();
            }
        }
    })
}


function createLesson() {
    document.querySelectorAll(".createBtn").forEach((lesson) => {
        lesson.addEventListener("click", async () => {
            const lessonId = lesson.getAttribute("value");
            const data = { id: lessonId };
            const resp = await fetch("/userInfo/displayThatLessonData", {
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
                        cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: "是否要開設課室？",
                    text: `學生 : ${lessonData["student"]}, 時間 : ${lessonData["time"]}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    reverseButtons: true
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const { value: roomCode } = await Swal.fire({
                            title: "請創立課室編號",
                            input: "text",
                        })
                        if (roomCode) {
                            const lessonRecord = {};
                            lessonRecord["id"] = lessonId;
                            lessonRecord["link"] = roomCode;
                            const resp = await fetch("/userInfo/createLessonLink", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(lessonRecord),
                            })
                            const result = await resp.json();
                            if (result.success === true) {
                                Swal.fire({
                                    icon: "success",
                                    title: "已創立課室",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(function () {
                                    window.location.reload();
                                })
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "創立失敗",
                                    text: "請使用其他課室編號",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(function () {
                                    window.location.reload();
                                })
                            }
                        }
                    }
                })
            }
        })
    })
}




function enterLesson() {
    document.querySelectorAll(".enterBtn").forEach((lesson) => {
        lesson.addEventListener("click", async () => {
            const lessonId = lesson.getAttribute("value");
            const data = { id: lessonId };
            const resp = await fetch("/userInfo/displayThatLessonData", {
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
                        cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: "是否要進入課室？",
                    text: `學生 : ${lessonData["student"]}, 時間 : ${lessonData["time"]}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `./onlineLesson.html?room=${lessonData["link"]}`;
                    }
                })
            }
        })
    })
}


function closeLesson() {
    document.querySelectorAll(".closeBtn").forEach((lesson) => {
        lesson.addEventListener("click", async () => {
            const lessonId = lesson.getAttribute("value");
            const data = { id: lessonId };
            const resp = await fetch("/userInfo/displayThatLessonData", {
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
                        cancelButton: "btn btn-danger"
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: "是否要關閉課室？",
                    text: `學生 : ${lessonData["student"]}, 時間 : ${lessonData["time"]}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "是",
                    cancelButtonText: "否",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        editLessonLink(lessonId, lessonData["student"]);
                    }
                })
            }
        })
    })
}

function editLessonLink(id, student) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: `學生 : ${student} 有否出席？`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "出席",
        cancelButtonText: "缺席",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const status = "attend";
            deleteLessonLink(id, status);
        } else if (result.dismiss === "cancel") {
            const status = "absent";
            deleteLessonLink(id, status);
        } else  {
            Swal.fire({
                icon: "error",
                title: "更改失敗",
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                window.location.reload();
            })
            return;
        }
    })
}


async function deleteLessonLink(id, status) {
    const lessonRecord = {};
    lessonRecord["id"] = id;
    lessonRecord["link"] = "finish";
    lessonRecord["status"] = status;
    const resp = await fetch("/userInfo/editLessonData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonRecord),
    });
    const result = await resp.json();
    if (result.success === true) {
        Swal.fire({
            icon: "success",
            title: "更改成功",
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            window.location.reload();
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "更改失敗",
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            window.location.reload();
        })
    }

}