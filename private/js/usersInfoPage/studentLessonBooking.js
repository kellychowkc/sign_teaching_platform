
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function displayBookingTable() {
    document.querySelector("#lessonBooking").addEventListener("click", () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
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
                        <tr>
                            <td class="align-middle">07:00am</td>
                            <td><div class="bookingTime" id="monday07"></div></td>
                            <td><div class="bookingTime" id="wednesday07"></div></td>
                            <td><div class="bookingTime" id="tuesday07"></div></td>
                            <td><div class="bookingTime" id="thursday07"></div></td>
                            <td><div class="bookingTime" id="friday07"></div></td>
                            <td><div class="bookingTime" id="saturday07"></div></td>
                            <td><div class="bookingTime" id="sunday07"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">08:00am</td>
                            <td><div class="bookingTime" id="monday08"></div></td>
                            <td><div class="bookingTime" id="tuesday08"></div></td>
                            <td><div class="bookingTime" id="wednesday08"></div></td>
                            <td><div class="bookingTime" id="thursday08"></div></td>
                            <td><div class="bookingTime" id="friday08"></div></td>
                            <td><div class="bookingTime" id="saturday08"></div></td>
                            <td><div class="bookingTime" id="sunday08"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">09:00am</td>
                            <td><div class="bookingTime" id="monday09"></div></td>
                            <td><div class="bookingTime" id="tuesday09"></div></td>
                            <td><div class="bookingTime" id="wednesday09"></div></td>
                            <td><div class="bookingTime" id="thursday09"></div></td>
                            <td><div class="bookingTime" id="friday09"></div></td>
                            <td><div class="bookingTime" id="saturday09"></div></td>
                            <td><div class="bookingTime" id="sunday09"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">10:00am</td>
                            <td><div class="bookingTime" id="monday10"></div></td>
                            <td><div class="bookingTime" id="tuesday10"></div></td>
                            <td><div class="bookingTime" id="wednesday10"></div></td>
                            <td><div class="bookingTime" id="thursday10"></div></td>
                            <td><div class="bookingTime" id="friday10"></div></td>
                            <td><div class="bookingTime" id="saturday10"></div></td>
                            <td><div class="bookingTime" id="sunday10"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">11:00am</td>
                            <td><div class="bookingTime" id="monday11"></div></td>
                            <td><div class="bookingTime" id="tuesday11"></div></td>
                            <td><div class="bookingTime" id="wednesday11"></div></td>
                            <td><div class="bookingTime" id="thursday11"></div></td>
                            <td><div class="bookingTime" id="friday11"></div></td>
                            <td><div class="bookingTime" id="saturday11"></div></td>
                            <td><div class="bookingTime" id="sunday11"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">12:00pm</td>
                            <td><div class="bookingTime" id="monday12"></div></td>
                            <td><div class="bookingTime" id="tuesday12"></div></td>
                            <td><div class="bookingTime" id="wednesday12"></div></td>
                            <td><div class="bookingTime" id="thursday12"></div></td>
                            <td><div class="bookingTime" id="friday12"></div></td>
                            <td><div class="bookingTime" id="saturday12"></div></td>
                            <td><div class="bookingTime" id="sunday12"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">01:00pm</td>
                            <td><div class="bookingTime" id="monday13"></div></td>
                            <td><div class="bookingTime" id="tuesday13"></div></td>
                            <td><div class="bookingTime" id="wednesday13"></div></td>
                            <td><div class="bookingTime" id="thursday13"></div></td>
                            <td><div class="bookingTime" id="friday13"></div></td>
                            <td><div class="bookingTime" id="saturday13"></div></td>
                            <td><div class="bookingTime" id="sunday13"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">02:00pm</td>
                            <td><div class="bookingTime" id="monday14"></div></td>
                            <td><div class="bookingTime" id="tuesday14"></div></td>
                            <td><div class="bookingTime" id="wednesday14"></div></td>
                            <td><div class="bookingTime" id="thursday14"></div></td>
                            <td><div class="bookingTime" id="friday14"></div></td>
                            <td><div class="bookingTime" id="saturday14"></div></td>
                            <td><div class="bookingTime" id="sunday14"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">03:00pm</td>
                            <td><div class="bookingTime" id="monday15"></div></td>
                            <td><div class="bookingTime" id="tuesday15"></div></td>
                            <td><div class="bookingTime" id="wednesday15"></div></td>
                            <td><div class="bookingTime" id="thursday15"></div></td>
                            <td><div class="bookingTime" id="friday15"></div></td>
                            <td><div class="bookingTime" id="saturday15"></div></td>
                            <td><div class="bookingTime" id="sunday15"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">04:00pm</td>
                            <td><div class="bookingTime" id="monday16"></div></td>
                            <td><div class="bookingTime" id="tuesday16"></div></td>
                            <td><div class="bookingTime" id="wednesday16"></div></td>
                            <td><div class="bookingTime" id="thursday16"></div></td>
                            <td><div class="bookingTime" id="friday16"></div></td>
                            <td><div class="bookingTime" id="saturday16"></div></td>
                            <td><div class="bookingTime" id="sunday16"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">05:00pm</td>
                            <td><div class="bookingTime" id="monday17"></div></td>
                            <td><div class="bookingTime" id="tuesday17"></div></td>
                            <td><div class="bookingTime" id="wednesday17"></div></td>
                            <td><div class="bookingTime" id="thursday17"></div></td>
                            <td><div class="bookingTime" id="friday17"></div></td>
                            <td><div class="bookingTime" id="saturday17"></div></td>
                            <td><div class="bookingTime" id="sunday17"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">06:00pm</td>
                            <td><div class="bookingTime" id="monday18"></div></td>
                            <td><div class="bookingTime" id="tuesday18"></div></td>
                            <td><div class="bookingTime" id="wednesday18"></div></td>
                            <td><div class="bookingTime" id="thursday18"></div></td>
                            <td><div class="bookingTime" id="friday18"></div></td>
                            <td><div class="bookingTime" id="saturday18"></div></td>
                            <td><div class="bookingTime" id="sunday18"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">07:00pm</td>
                            <td><div class="bookingTime" id="monday19"></div></td>
                            <td><div class="bookingTime" id="tuesday19"></div></td>
                            <td><div class="bookingTime" id="wednesday19"></div></td>
                            <td><div class="bookingTime" id="thursday19"></div></td>
                            <td><div class="bookingTime" id="friday19"></div></td>
                            <td><div class="bookingTime" id="saturday19"></div></td>
                            <td><div class="bookingTime" id="sunday19"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">08:00pm</td>
                            <td><div class="bookingTime" id="monday20"></div></td>
                            <td><div class="bookingTime" id="tuesday20"></div></td>
                            <td><div class="bookingTime" id="wednesday20"></div></td>
                            <td><div class="bookingTime" id="thursday20"></div></td>
                            <td><div class="bookingTime" id="friday20"></div></td>
                            <td><div class="bookingTime" id="saturday20"></div></td>
                            <td><div class="bookingTime" id="sunday20"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">09:00pm</td>
                            <td><div class="bookingTime" id="monday21"></div></td>
                            <td><div class="bookingTime" id="tuesday21"></div></td>
                            <td><div class="bookingTime" id="wednesday21"></div></td>
                            <td><div class="bookingTime" id="thursday21"></div></td>
                            <td><div class="bookingTime" id="friday21"></div></td>
                            <td><div class="bookingTime" id="saturday21"></div></td>
                            <td><div class="bookingTime" id="sunday21"></div></td>
                        </tr>
                        <tr>
                            <td class="align-middle">10:00pm</td>
                            <td><div class="bookingTime" id="monday22"></div></td>
                            <td><div class="bookingTime" id="tuesday22"></div></td>
                            <td><div class="bookingTime" id="wednesday22"></div></td>
                            <td><div class="bookingTime" id="thursday22"></div></td>
                            <td><div class="bookingTime" id="friday22"></div></td>
                            <td><div class="bookingTime" id="saturday22"></div></td>
                            <td><div class="bookingTime" id="sunday22"></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `;

        displayTeacher();
    })
}


async function displayTeacher() {
    const resp = await fetch("/userInfo/displayTeacher", { method: "POST" });
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
            })
        }
    }
}

function selectTeacher() {
    document.querySelectorAll(".bookingBtn").forEach((item) => {
        item.addEventListener("click", async () => {
            const teacherName = item.getAttribute("id");
            const bookingData = item.getAttribute("value");
            const resp = await fetch("/userInfo/displayTeacher", { method: "POST" });
            const result = await resp.json();
            if (result.success === true) {
                const teacherData = result.message;
                for (let teacher of teacherData) {
                    if ((teacherName === teacher["name"]) && (bookingData === teacher["bookingId"])) {
                        const weekday = teacher["bookingId"].substring(0, teacher["bookingId"].length - 2);
                        const time = teacher["bookingId"].substring(teacher["bookingId"].length - 2,) + ":00:00";
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-danger'
                            },
                            buttonsStyling: false
                        })

                        swalWithBootstrapButtons.fire({
                            title: '是否選擇此時段, 此導師？',
                            text: `導師 : ${teacher["name"]}, ${weekday} ${time}`,
                            imageUrl: `../assets/usersImages/${teacher["image"]}`,
                            imageWidth: 300,
                            imageHeight: 300,
                            imageAlt: `${teacher["name"]}`,
                            showCancelButton: true,
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                selectBookingDate(teacher["id"], weekday, time);
                            }
                        })
                    }
                }
            }
        })
    })
}



async function selectBookingDate(id, weekday, time) {
    const { value: selectedDate } = await Swal.fire({
        title: '請選擇日子',
        input: 'select',
        inputOptions: await displayBookingDate(id, weekday, time),
        inputPlaceholder: '請選擇日子',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value !== '請選擇日子') {
                    resolve()
                } else {
                    resolve('請選擇日子!!')
                }
            })
        }
    })

    if (selectedDate) {
        const result = await bookingLesson(id, selectedDate, time);
        if (result === true) {
            Swal.fire({
                icon: 'success',
                title: "預約成功",
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                window.location.reload();
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: "預約失敗",
            showConfirmButton: false,
            timer: 1500
        }).then(function() {
            window.location.reload();
        })
    }
}



async function displayBookingDate(id, weekday, time) {
    const data = {};
    data["id"] = id;
    data["weekday"] = weekday;
    data["time"] = time.substring(0, 2);
    const resp = await fetch("/userInfo/getCanBookDate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    })
    const result = await resp.json();
    if (result.success === true) {
        return true;
    } else {
        return false;
    }
}