
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function teacherTimeTable() {
    document.querySelector("#timeTable").addEventListener("click", () => {
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
                                <th class="text-uppercase">Time</th>
                                <th class="text-uppercase">Monday</th>
                                <th class="text-uppercase">Tuesday</th>
                                <th class="text-uppercase">Wednesday</th>
                                <th class="text-uppercase">Thursday</th>
                                <th class="text-uppercase">Friday</th>
                                <th class="text-uppercase">Saturday</th>
                                <th class="text-uppercase">Sunday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="align-middle">07:00am</td>
                                <td class="bookingTime" id="monday07"></td>
                                <td class="bookingTime" id="tuesday07"></td>
                                <td class="bookingTime" id="wednesday07"></td>
                                <td class="bookingTime" id="thursday07"></td>
                                <td class="bookingTime" id="friday07"></td>
                                <td class="bookingTime" id="saturday07"></td>
                                <td class="bookingTime" id="sunday07"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">08:00am</td>
                                <td class="bookingTime" id="monday08"></td>
                                <td class="bookingTime" id="tuesday08"></td>
                                <td class="bookingTime" id="wednesday08"></td>
                                <td class="bookingTime" id="thursday08"></td>
                                <td class="bookingTime" id="friday08"></td>
                                <td class="bookingTime" id="staurday08"></td>
                                <td class="bookingTime" id="sunday08"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">09:00am</td>
                                <td class="bookingTime" id="monday09"></td>
                                <td class="bookingTime" id="tuesday09"></td>
                                <td class="bookingTime" id="wednesday09"></td>
                                <td class="bookingTime" id="thursday09"></td>
                                <td class="bookingTime" id="friday09"></td>
                                <td class="bookingTime" id="staurday09"></td>
                                <td class="bookingTime" id="sunday09"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">10:00am</td>
                                <td class="bookingTime" id="monday10"></td>
                                <td class="bookingTime" id="tuesday10"></td>
                                <td class="bookingTime" id="wednesday10"></td>
                                <td class="bookingTime" id="thursday10"></td>
                                <td class="bookingTime" id="friday10"></td>
                                <td class="bookingTime" id="staurday10"></td>
                                <td class="bookingTime" id="sunday10"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">11:00am</td>
                                <td class="bookingTime" id="monday11"></td>
                                <td class="bookingTime" id="tuesday11"></td>
                                <td class="bookingTime" id="wednesday11"></td>
                                <td class="bookingTime" id="thursday11"></td>
                                <td class="bookingTime" id="friday11"></td>
                                <td class="bookingTime" id="staurday11"></td>
                                <td class="bookingTime" id="sunday11"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">12:00pm</td>
                                <td class="bookingTime" id="monday12"></td>
                                <td class="bookingTime" id="tuesday12"></td>
                                <td class="bookingTime" id="wednesday12"></td>
                                <td class="bookingTime" id="thursday12"></td>
                                <td class="bookingTime" id="friday12"></td>
                                <td class="bookingTime" id="staurday12"></td>
                                <td class="bookingTime" id="sunday12"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">01:00pm</td>
                                <td class="bookingTime" id="monday13"></td>
                                <td class="bookingTime" id="tuesday13"></td>
                                <td class="bookingTime" id="wednesday13"></td>
                                <td class="bookingTime" id="thursday13"></td>
                                <td class="bookingTime" id="friday13"></td>
                                <td class="bookingTime" id="staurday13"></td>
                                <td class="bookingTime" id="sunday13"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">02:00pm</td>
                                <td class="bookingTime" id="monday14"></td>
                                <td class="bookingTime" id="tuesday14"></td>
                                <td class="bookingTime" id="wednesday14"></td>
                                <td class="bookingTime" id="thursday14"></td>
                                <td class="bookingTime" id="friday14"></td>
                                <td class="bookingTime" id="staurday14"></td>
                                <td class="bookingTime" id="sunday14"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">03:00pm</td>
                                <td class="bookingTime" id="monday15"></td>
                                <td class="bookingTime" id="tuesday15"></td>
                                <td class="bookingTime" id="wednesday15"></td>
                                <td class="bookingTime" id="thursday15"></td>
                                <td class="bookingTime" id="friday15"></td>
                                <td class="bookingTime" id="staurday15"></td>
                                <td class="bookingTime" id="sunday15"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">04:00pm</td>
                                <td class="bookingTime" id="monday16"></td>
                                <td class="bookingTime" id="tuesday16"></td>
                                <td class="bookingTime" id="wednesday16"></td>
                                <td class="bookingTime" id="thursday16"></td>
                                <td class="bookingTime" id="friday16"></td>
                                <td class="bookingTime" id="staurday16"></td>
                                <td class="bookingTime" id="sunday16"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">05:00pm</td>
                                <td class="bookingTime" id="monday17"></td>
                                <td class="bookingTime" id="tuesday17"></td>
                                <td class="bookingTime" id="wednesday17"></td>
                                <td class="bookingTime" id="thursday17"></td>
                                <td class="bookingTime" id="friday17"></td>
                                <td class="bookingTime" id="staurday17"></td>
                                <td class="bookingTime" id="sunday17"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">06:00pm</td>
                                <td class="bookingTime" id="monday18"></td>
                                <td class="bookingTime" id="tuesday18"></td>
                                <td class="bookingTime" id="wednesday18"></td>
                                <td class="bookingTime" id="thursday18"></td>
                                <td class="bookingTime" id="friday18"></td>
                                <td class="bookingTime" id="staurday18"></td>
                                <td class="bookingTime" id="sunday18"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">07:00pm</td>
                                <td class="bookingTime" id="monday19"></td>
                                <td class="bookingTime" id="tuesday19"></td>
                                <td class="bookingTime" id="wednesday19"></td>
                                <td class="bookingTime" id="thursday19"></td>
                                <td class="bookingTime" id="friday19"></td>
                                <td class="bookingTime" id="staurday19"></td>
                                <td class="bookingTime" id="sunday19"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">08:00pm</td>
                                <td class="bookingTime" id="monday20"></td>
                                <td class="bookingTime" id="tuesday20"></td>
                                <td class="bookingTime" id="wednesday20"></td>
                                <td class="bookingTime" id="thursday20"></td>
                                <td class="bookingTime" id="friday20"></td>
                                <td class="bookingTime" id="staurday20"></td>
                                <td class="bookingTime" id="sunday20"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">09:00pm</td>
                                <td class="bookingTime" id="monday21"></td>
                                <td class="bookingTime" id="tuesday21"></td>
                                <td class="bookingTime" id="wednesday21"></td>
                                <td class="bookingTime" id="thursday21"></td>
                                <td class="bookingTime" id="friday21"></td>
                                <td class="bookingTime" id="staurday21"></td>
                                <td class="bookingTime" id="sunday21"></td>
                            </tr>
                            <tr>
                                <td class="align-middle">10:00pm</td>
                                <td class="bookingTime" id="monday22"></td>
                                <td class="bookingTime" id="tuesday22"></td>
                                <td class="bookingTime" id="wednesday22"></td>
                                <td class="bookingTime" id="thursday22"></td>
                                <td class="bookingTime" id="friday22"></td>
                                <td class="bookingTime" id="staurday22"></td>
                                <td class="bookingTime" id="sunday22"></td>
                            </tr>
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
        for (let i = 0; i < timeList.length; i++) {
            const timeId = document.querySelector(`#${timeList[i]}`);
            if (timeId !== null) {
                timeId.innerHTML = `
                <span class="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom"></span>
                `;
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
                                data["timeData"] = timeId.substring(timeId.length -2);
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
                                    }, window.location.reload())
                                }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "更改失敗",
                                    showConfirmButton: false,
                                    timer: 1500
                                }, window.location.reload())
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