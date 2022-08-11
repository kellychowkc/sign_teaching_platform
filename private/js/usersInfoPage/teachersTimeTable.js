
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
                            <tr>
                                <td class="align-middle">07:00am</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday07"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday07"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">08:00am</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday08"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday08"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">09:00am</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday09"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday09"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">10:00am</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday10"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday10"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">11:00am</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday11"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday11"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">12:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday12"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday12"></div></div></td>
                            </tr>
                            <tr>
                                <td <div class="align-middle">01:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday13"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday13"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">02:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday14"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday14"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">03:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday15"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday15"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">04:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday16"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday16"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">05:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday17"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday17"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">06:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday18"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday18"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">07:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday19"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday19"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">08:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday20"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday20"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">09:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday21"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday21"></div></div></td>
                            </tr>
                            <tr>
                                <td class="align-middle">10:00pm</td>
                                <td><div class="bookingArea"><div class="bookingTime" id="monday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="tuesday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="wednesday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="thursday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="friday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="saturday22"></div></div></td>
                                <td><div class="bookingArea"><div class="bookingTime" id="sunday22"></div></div></td>
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
                                    }).then(function(){
                                        window.location.reload()
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "更改失敗",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(function(){
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
