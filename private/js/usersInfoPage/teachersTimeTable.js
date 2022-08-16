
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function teacherTimeTable() {
    document.querySelector("#timeTable").addEventListener("click", () => {
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
                <td><div class="bookingArea"><div class="bookingTime" id="Monday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Tuesday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Wednesday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Thursday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Friday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Saturday${idStr}"></div></div></td>
                <td><div class="bookingArea"><div class="bookingTime" id="Sunday${idStr}"></div></div></td>
            </tr>
            `;
        }
        document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="container" id="teacherTimeTable">
            <div id="userInfoTitle">
                <div>
                    <h4 class="mb-3">可開堂時間</h4>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="editTeacherTime">更改時間</button>
                </div>
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
                        ` + tbodyHtmlStr + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        displayTime();
        editTeacherTime();
    })
}


async function displayTime() {
    const resp = await fetch("/userInfo/displayTeacherTime", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        const timeList = result.message;
        if (timeList.length > 0) {
            for (let times of timeList) {
                const timeId = document.querySelector(`#${times}`);
                if (timeId !== null) {
                    timeId.innerHTML = `
                        <span class="bg-green padding-5px border-radius-5 border-wh"></span>
                    `;
                }
            }
        }
    }
}


async function editTeacherTime() {
    const thisTimeTable = document.querySelector("table");
    const editBtn = document.querySelector("#editTeacherTime");
    editBtn.addEventListener("click", () => {
        if (thisTimeTable.classList.contains("readOnly")) {
            thisTimeTable.classList.remove("readOnly");
            editBtn.innerHTML = `更改完成`;

            document.querySelectorAll(".bookingTime").forEach((bookingTime) => {
                bookingTime.addEventListener("click", () => {
                    const timeId = bookingTime.getAttribute("id");
                    const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                            confirmButton: 'btn btn-success',
                            cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                    })

                    swalWithBootstrapButtons.fire({
                        title: '要更改此時間？',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        reverseButtons: true
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const timeId = bookingTime.getAttribute("id");
                            if (timeId) {
                                const data = {};
                                data["weekdayData"] = timeId.substring(0, timeId.length - 2);
                                data["timeData"] = timeId.substring(timeId.length - 2);
                                const resp = await fetch("/userInfo/editTeacherTime", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });
                                const result = await resp.json();
                                if (result.success === true) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: "更改成功",
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then(function () {
                                        window.location.reload()
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "更改失敗",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(function () {
                                    window.location.reload()
                                })
                            }
                        }
                    })
                })
            })
        } else {
            thisTimeTable.classList.add("readOnly");
            editBtn.innerHTML = `更改時間`;
        }
    })
}
