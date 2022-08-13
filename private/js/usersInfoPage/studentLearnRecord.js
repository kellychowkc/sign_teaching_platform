
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export async function displayLearningRecord() {
    document.querySelector("#learningRecord").addEventListener("click", () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="col-md-7 col-lg-8 m-auto">
                <h3 class="mb-3">課堂卷</h3>
            </div>
            <div class="container text-center">
                <div class="row row-cols-3" id="buyLessonList"></div>
            </div>
            <div class="col-md-7 col-lg-8 m-auto">
                <h3 class="mb-3">課堂記錄</h3>
            </div>
            <div class="container text-center">
                <div class="row row-cols-3" id="lessonRecord"></div>
            </div>
        `;

        displayShoppingRecord();
        displayOrderRecord();
    })
}

async function displayShoppingRecord() {
    const resp = await fetch("/userInfo/displayShoppingRecord", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        const data = result.message;
        if (data.length === 0) {
            document.querySelector("#buyLessonList").innerHTML = `
            <div class="text-center">
                <h3 class="display-4 fw-normal">暫時沒有任何課堂卷可以選擇</h3>
            </div>
            `;
        } else {
            for (let packages of data) {
                document.querySelector("#buyLessonList").innerHTML += `
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">${packages["packageName"]}</h4>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title pricing-card-title">${packages["packageDescription"]}</h3>
                            <h4 class="card-title pricing-card-title">$${packages["packagePrice"]}</h4>
                            <button type="button" class="w-100 btn btn-lg btn-outline-primary buyBtn" value="${packages["packageId"]}">購買</button>
                        </div>
                    </div>
                </div>
                `;
                buyPackages()
            }
        }
    }
}


function buyPackages() {
    document.querySelectorAll(".buyBtn").forEach((item) => {
        item.addEventListener("click", async () => {
            const packageId = parseInt(item.getAttribute("value"));
            const resp = await fetch("/userInfo/displayShoppingRecord", { method: "POST" });
            const result = await resp.json();
            if (result.success === true) {
                const data = result.message;
                if (data.length > 0) {
                    for (let packages of data) {
                        if (packages["packageId"] === packageId) {
                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                    cancelButton: 'btn btn-danger'
                                },
                                buttonsStyling: false
                            })
                            swalWithBootstrapButtons.fire({
                                title: `是否要購買[ ${packages["packageName"]} ]?`,
                                text: `$${packages["packagePrice"]}, ${packages["packageDescription"]}`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                reverseButtons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = `./paypal.html?id=${packages["packageId"]}`;
                                }
                            })
                        }
                    }
                }
            }
        })
    })
}



async function displayOrderRecord() {
    const resp = await fetch("/userInfo/displayOrderRecord", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        const data = result.message;
        if (data.length === 0) {
            document.querySelector("#lessonRecord").innerHTML = `
            <div class="text-center">
                <h3 class="display-4 fw-normal">沒有任何課堂記錄</h3>
            </div>
            `;
        } else {
            for (let order of data) {
                document.querySelector("#lessonRecord").innerHTML += `
                <div class="text-center">
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${order["packageName"]}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">購買日期 : ${order["createdDate"]}</h6>
                                <p class="card-text">總課堂數 : ${order["totalLessonNum"]}<br/>可使用堂數 : ${order["remainingLessonNum"]}</p>
                                <button type="button" class="w-100 btn btn-primary orderBtn" value="${order["orderId"]}">詳細資料</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                displayOrderData();
            }
        }
    }
}


function displayOrderData() {
    document.querySelectorAll(".orderBtn").forEach((item) => {
        item.addEventListener("click", async () => {
            const orderId = item.getAttribute("value");
            if (orderId) {
                let data = {};
                data["id"] = orderId;
                const resp = await fetch("/userInfo/displayOrderData", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await resp.json();
                if (result.success === true) {
                    const data = result.message;
                    const orderData = data["order"];
                    let usedLessonNum = Number(orderData[0]["totalLessonNum"]) - Number(orderData[0]["remainingLessonNum"]);
                    const lessonData = data["lessonList"];
                    let lessonHtmlStr = ``;
                    let statusHtmlStr = ``;
                    let bookingNum = 0;
                    let attendNum = 0;
                    let absentNum = 0;
                    if (lessonData) {
                        let i = 0;
                        while (i < lessonData.length) {
                            let status = "";
                            switch (lessonData[i]["lessonStatus"]) {
                                case "booking" :
                                    status = "已預約";
                                    bookingNum++;
                                    break;
                                case "attend" :
                                    status = "出席";
                                    attendNum++;
                                    break;
                                case "absent" :
                                    status = "缺席";
                                    absentNum++;
                                    break;
                                    
                            }
                            lessonHtmlStr += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${lessonData[i]["teacherName"]}</td>
                                <td>${lessonData[i]["lessonDate"]}</td>
                                <td>${status}</td>
                            </tr>
                            `;
                            i++
                        }
                        statusHtmlStr = `
                        <h6 class="mb-3">已預約 : ${bookingNum} 堂 | 出席 : ${attendNum} 堂 | 缺席 : ${absentNum} 堂</h6>
                        `;
                    } else {
                        statusHtmlStr = `
                        <h6 class="mb-3">已預約 : ${bookingNum} 堂 | 出席 : ${attendNum} 堂 | 缺席 : ${absentNum} 堂</h6>
                        `;
                    }
                    xdialog.open({
                        title: `${orderData[0]["packageName"]}`,
                        body: `\
                        <div class="container text-center">\
                            <h4 class="mb-3">購買日期 : ${orderData[0]["createdDate"]}</h4>\
                            <h5 class="mb-3">可使用堂數 : ${orderData[0]["totalLessonNum"]} 堂 | 已使用 : ${usedLessonNum} 堂</h5>`
                            + statusHtmlStr + `
                            <table class="table table-bordered text-center">\
                                <thead>\
                                    <tr class="bg-light-gray">\
                                        <th class="text-uppercase">堂數</th>\
                                        <th class="text-uppercase">導師</th>\
                                        <th class="text-uppercase">上課日期</th>\
                                        <th class="text-uppercase">課堂狀況</th>\
                                    </tr>\
                                </thead>\
                                <tbody>`
                                + lessonHtmlStr + `
                                </tbody>\
                            </table>\
                        </div>`,
                        style: 'width: 60%;'
                    })
                }
            }
        })
    })
}