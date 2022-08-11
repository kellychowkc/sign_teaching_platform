
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
                if (data) {
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
            console.log(orderId)
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
                    const lessonData = data["lessonList"];
                    console.log(orderData, lessonData)
                    document.querySelector("#userInfoDisplay").innerHTML += ``;
                }
            }
        })
    })
}