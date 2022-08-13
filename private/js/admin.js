import { navbarCreate } from "/js/navbar.js";

console.log("running admin.js")

window.onload = () => {
    navbarCreate();
    loadDifferentPage();
};

function loadDifferentPage() {
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status")
    if (status === "teaching") {
        loadTeachingData();
    } else if (status === "usersControl") {
        getAllUser()
    } else if (status === "lectureDetail") {
        loadingLectureDetail()
    } else if (status === "lecture") {
        loadingLecture();
    }
}

async function deleting() {
    // different situation
    let params = new URLSearchParams(window.location.search);
    let status = params.get("status");
    const allChecked = document.querySelectorAll("input[name=checkbox]:checked")
    console.log("this is allChecked:", allChecked)
    const checkArr = Array.from(allChecked).map(checkbox => checkbox.value)
    console.log("this is checkArr:", checkArr)
    let resp;
    // const checkArrJson = checkArr.
    if (status === "teaching") {
        resp = await fetch(`/admin/teachingData`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ checkedArr: checkArr }),
        });
    }else if(status === "usersControl"){
        resp = await fetch(`/admin/userData`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ checkedArr: checkArr }),
        });

    }
    let result = await resp.json();
        if (result.success === true) {
            //sweet alert!!
            location.reload();
        }
}


const styles = /**css */`padding: 30px;`;
const stylesTeaching = /**css */`padding: 30px;display: flex;justify-content: center;align-items: center; flex-wrap: wrap;`;

const contentElement = document.getElementById("content_box");
let createLeftBox = document.createElement("div");
createLeftBox.className = "content_box left_box";
let createRightBox = document.createElement("div");
createRightBox.className = "content_box right_box";


let newContentLeft;
let newContentRight;




// sir!!!
function removeChildElement(parent, target = 1) {
    console.log("removing...")
    if (Number(target)) {
        for (let i = 0; i = parent.childElementCount; i++) {
            parent.removeChild(parent.firstElementChild)
        }
        return
    }
    parent.removeChild(target)
}





// 教學
document.querySelector("#teaching").addEventListener("click", async () => {
    window.location.href = "admin.html?status=teaching"
    await loadTeachingData();
})

async function loadTeachingData() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/teachingData?page=${page}`, { method: "GET" });
    const result = await resp.json();
    // 
    // teaching(result["current_page"], result["total_page"], result["data"]);
    showSearchWord(result["current_page"], result["total_page"], result["data"]);

    document.querySelector(".deleting").addEventListener("click", () => {
        const deleteButton = document.querySelector(".deleting")
        deleting()
    })

    document.querySelector(".submitVideo").addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector(".content_form")
        uploadFile(form)
    })

    const textInputElement = document.querySelector('input[name=search]');
    textInputElement.addEventListener('keyup', async function () {
        let text = textInputElement.value;

        console.log("this is text:", text)
        let resp = await fetch(`/admin/teachingData?page=${page}&text=${text}`, { method: "GET" });
        let result = await resp.json();
        // console.log("this is search result:", result["data"])
        showSearchWord(result["current_page"], result["total_page"], result["data"])
    })

}

function showSearchWord(current_page, total_page, data) {
    let items = ``;
    let pages = ``;
    let up = ``;
    let down = ``;
    if (data) {

        if (typeof (data[0]) === "object") {
            // console.log("this is data:", data)
            if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
                up += `<a class="page-link" href="?status=teaching&page=${current_page - 1}" aria-label="Previous">`
                down += ` <a class="page-link" href="?status=teaching&page=${current_page + 1}" aria-label="Next">`
            } else {
                up += `<a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous">`
                down += ` <a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next">`
            }
            for (let i = 0; i < data.length; i++) {
                const title = data[i]["label"]
                items += `
                <tr class="table-rows">
                    <td class="items">${title}<input type="checkbox" name="checkbox"id="${title}" name="${title}" value="${title}"></td>
                </tr>`;
            }
            for (let i = 0; i < total_page; i++) {
                pages += `
                <li class="page-items"><a class="page-link" href="?status=teaching&page=${i + 1}">${i + 1}</a></li>`;
            }
            newContentLeft = `
<div class="system_buttons">
    <div class="system_button adding_word">
        <div class="button_img"><img src="/assets/admin/add.gif" alt="adding_word"></div>
        <div class="button_title">新增詞語</div>
    </div>
</div>
<div class="display_words">
    <div class="title">已有詞語</div>
    <div class="display_word words_box">
        <div class="words_form">
            <div>
                <input type="text" placeholder="Search.." name="search">
                <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
                <input type="submit" class="deleting" value="刪除"><br>
                <div class="table-section">
                    <table id="table">
                    ${items}
                    </table>
            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example" class="page_box">
        <ul class="pagination">
            <li class="page-item">
                ${up}
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
           ${pages}
           <li class="page-item">
                ${down}
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
`;

            createLeftBox.innerHTML = newContentLeft;
            contentElement.appendChild(createLeftBox);

            const newContentRight = `
<form action="/action_page.php" class="content_form">
    <div class="container uploadVideo">
        <h1>上載影片</h1>
        <hr /><br>


        <label for="fn" class="uploading"><b>詞語： </b></label>
        <input type="text" placeholder="輸入格式為HKsl_(english).mp4" name="title" id="title" required />
        <br><br>

        <label for="file"><b>選擇上載文件 : </b></label>
        <br>
        <input type="file" name="myFile" id="myFile">
        <br>
        <br>

        <hr />
        <input type="submit" class="submitVideo" value="上載"><br>

    </div>

</form>`;
            createRightBox.innerHTML = newContentRight;
            contentElement.appendChild(createRightBox);
            const rightBox = document.querySelector(".right_box");
            rightBox.setAttribute("style", `${stylesTeaching}`)

        } else if (Array.isArray(data) && data[0].length !== 0) {

            console.log("this is searching data:", data)
            const tableParent = document.querySelector("tbody");
            let createTr = document.createElement("tr");
            createTr.className = "table-rows";
            removeChildElement(tableParent);
            let newTable;


            const pageParent = document.querySelector("nav.page_box");
            let createPageParent = document.createElement("ul");
            createPageParent.className = "pagination";
            removeChildElement(pageParent);

            for (let i = 0; i < data.length; i++) {
                const title = data[i]
                items += `
                    <td class="items">${title}<input type="checkbox" name="checkbox" id="${title}" name="${title}" value="${title}"></td>
                `;
            }

            console.log("this is pages2:", pages)
            console.log("this is pageNum:", total_page)

            for (let i = 0; i < total_page; i++) {
                pages += `
                <li class="page-items"><a class="page-link" href="?status=teaching&page=${i + 1}">${i + 1}</a></li>`;
            }

            if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
                up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
                down += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
            } else {
                up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
                down += ` <li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
            }

            newTable = items;
            let pagination = `${up}${pages}${down}`
            // console.log("this is pagination:", pagination)
            console.log("this is pageParent:", pageParent)
            console.log("this is up:", up)
            console.log("this is pages:", pages)
            console.log("this is down:", down)
            createPageParent.innerHTML = pagination;
            pageParent.appendChild(createPageParent)

            createTr.innerHTML = newTable;
            tableParent.appendChild(createTr);
        }
    }
}


async function uploadFile(form) {
    const files = document.getElementById("myFile").files
    const formData = new FormData();

    if (files.length > 1 || files.length === 0) {
        alert("Please upload One video");
        return;
    }

    formData.append("title", form.title.value)
    formData.append("files", files[0]);
    console.log("this is files:", files[0])

    const resp = await fetch("/admin/video", {
        method: "POST",
        body: formData
    });
    const result = await resp.json();
    if (result.success === true) {
        //sweet alert!!
        location.reload();
    }
}





// 課程（更新）

async function loadingLecture() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/lectureData?page=${page}`, { method: "GET" })
    const result = await resp.json()
    console.log("this is getAllUser", result)
    // if (result.success === true && result.data) {
    //     lecture(result["current_page"],result["total_page"], result["data"])
    // }
}
function lecture(current_page, total_page, data) {
    removeChildElement(contentElement);
    let items = ``;
    let pages = ``;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            console.log("this is item", data[i]["id"])
            const id = data[i]["id"]
            const date = data[i]["date"]
            const time = data[i]["time"]
            const student = data[i]["student"]
            items += `
            <tr class="table-rows">
                <td class="items">${id}</td>
                <td class="items">${date}</td>
                <td class="items">${time}</td>
                <td class="items">${student}</td>
            </tr>`;
        }
        for (let i = 0; i < total_page; i++) {
            pages += `
            <li class="page-item"><a class="page-link" href="?status=teaching&page=${i + 1}">${i + 1}</a></li>`;
        }
    }
    let up = ``;
    let down = ``;
    if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
        up += `<a class="page-link" href="?status=teaching&page=${current_page - 1}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=teaching&page=${current_page + 1}" aria-label="Next">`
    } else {
        up += `<a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next">`
    }
    newContentLeft = `
    <div class="system_buttons">
        <div class="system_button adding_lecture">
            <div class="button_img"><img src="/assets/admin/refresh.gif" alt="refresh_lecture"></div>
            <div class="button_title">更新</div>
        </div>
        <div class="system_button lecture_detail">
            <div class="button_img"><img src="/assets/admin/info.gif" alt="lecture_info"></div>
            <div class="button_title">詳情</div>
        </div>
    </div>
`;
    createLeftBox.innerHTML = newContentLeft;
    contentElement.appendChild(createLeftBox);
    //changing right_box
    //getting info
    //table list
    //pageNumb
    const newContentRight = `
    <h3 class="title">所有課程</h3><br>
<div class="all_lecture_box">
    <div class="lecture_form lecture_adding_form">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
    </div>
    <div class="showing_table_box">
        <table class="lecture_table">
            <thead>
                <tr class="table-title">
                    <th scope="col">#</th>
                    <th scope="col">導師</th>
                    <th scope="col">日期</th>
                    <th scope="col">時間</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                ${items}
                <tr class="table-rows">
                    <th scope="row">1</th>
                    <td>Jason</td>
                    <td>星期五</td>
                    <td>7:00p.m
                        <input type="checkbox" name="checkbox" id="麵包" name="words" value="麵包">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <nav aria-label="Page navigation example" class="page_box">
        <ul class="pagination">
            <li class="page-item">
                ${up}
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${pages}
            <li class="page-item">
                ${down}
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</div>`;
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");

    //課程（詳情）
    document.querySelector(".lecture_detail").addEventListener("click", () => {
        window.location.href = "admin.html?status=lectureDetail"
    })

    rightBox.setAttribute("style", `${styles}`)
}


document.querySelector("#lecture").addEventListener("click", () => {
    window.location.href = "admin.html?status=lecture"
})





// 課程（詳情）
async function loadingLectureDetail() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/allUser?page=${page}`, { method: "GET" })
    const result = await resp.json()
    console.log("this is getAllUser", result)
    if (result.success === true && result.data) {
        usersControl(result["current_page"], result["total_page"], result["data"])
    }
}
function lectureDetail() {
    //if on this place ,then reload
    console.log("changing to detail")

    //if not , go to this page
    //changing right_box
    contentElement.removeChild(contentElement.lastChild);
    //getting info
    //img: if had lecture, has img; if no lecture, have button
    //table list
    //pageNumb
    const newContentRight = `
    <h3 class="title">所有課程</h3><br>
<input class="available_lecture_only" type="submit" value="只顯示可開班">
<button class="adding" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
    開班
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">新增課堂</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/action_page.php" class="modal-body">
                <label for="teacher_name">連結：</label><br>
                <input type="text" id="teacher_name" name="teacher_name" placeholder="輸入連結"><br>
                <div class="form_button">
                    <input type="submit" id="submit" value="確定">
                </div>
            </form>
        </div>
    </div>
</div>
<br>
<div class="all_lecture_box">
    <div class="showing_table_box">
        <table class="lecture_table">
            <thead>
                <tr class="table-title">
                    <th scope="col">#</th>
                    <th scope="col">導師</th>
                    <th scope="col">日期</th>
                    <th scope="col">時間</th>
                    <th scope="col">學生</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr class="table-rows">
                    <th scope="row">1</th>
                    <td>Jason</td>
                    <td>星期五</td>
                    <td>7:00p.m</td>
                    <td>Alex
                        <img src="https://img.icons8.com/material-outlined/96/000000/checked--v1.png" />
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</div>
<nav aria-label="Page navigation example" class="page_box">
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
        `
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");

    document.querySelector(".adding_lecture").addEventListener("click", () => {
        lecture();
    })
}


// 用戶管理
function usersControl(current_page, total_page, userData) {

    let items = ``;
    let pages = ``;
    if (userData) {
        for (let i = 0; i < userData.length; i++) {
            const userId = userData[i]["id"];
            const userName = userData[i]["username"];
            const userIdentity = userData[i]["identity"];
            items += `
        <tr class="table-rows">
            <th scope="row">${userId}</th>
            <td>${userName}</td>
            <td>${userIdentity} <input type="checkbox" name="checkbox" id="${userName}" name="${userName}" value="${userName}">
            </td>
        </tr>`
        }
        for (let i = 0; i < total_page; i++) {
            pages += `
            <li class="page-item"><a class="page-link" href="?status=usersControl&page=${i + 1}">${i + 1}</a></li>`;
        }
    }
    removeChildElement(contentElement);
    newContentLeft = `
<div class="system_buttons">
    <div class="system_button users_operation">
        <div class="button_img"><img src="/assets/admin/identity.gif" alt="refresh_lecture"></div>
        <div class="button_title">操作</div>
    </div>
</div>`;
    createLeftBox.innerHTML = newContentLeft;
    contentElement.appendChild(createLeftBox);
    //changing right_box
    //getting info
    //table list
    //pageNumb
    let up = ``;
    let down = ``;
    if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
        up += `<a class="page-link" href="?status=usersControl&page=${current_page - 1}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=usersControl&page=${current_page + 1}" aria-label="Next">`
    } else {
        up += `<a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Next">`
    }
    const newContentRight = `
    <h3 class="title">所有用家</h3><br>
    <div class="lecture_form">
        <div class="changing_identity_box">
            <input type="text" placeholder="Search.." name="search">
            <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
            <button class="change_to_teacher">轉為老師</button>
            <button class="deleting deleting_user">刪除</button><br>
            <div class="showing_table_box">
                <table class="lecture_table">
                    <thead>
                        <tr class="table-title">
                            <th scope="col">#</th>
                            <th scope="col">用戶名</th>
                            <th scope="col">身分</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                    ${items}
                    </tbody>
                </table>
            </div>
    </div>
    <nav aria-label="Page navigation example" class="page_box">
        <ul class="pagination">
            <li class="page-item">
                ${up}
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${pages}
            <li class="page-item">
                ${down}
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`;
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");

    rightBox.setAttribute("style", `${styles}`)
    document.querySelector(".deleting").addEventListener("click", () => {
        const deleteButton = document.querySelector(".deleting")
        deleting()
    })
}
document.querySelector("#users_control").addEventListener("click", () => {
    window.location.href = "admin.html?status=usersControl"
})

async function getAllUser() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/allUser?page=${page}`, { method: "GET" })
    const result = await resp.json()
    console.log("this is getAllUser", result)
    if (result.success === true && result.data) {
        usersControl(result["current_page"], result["total_page"], result["data"])
    }
}





// setting
document.querySelector("#setting").addEventListener("click", () => {
    setting()
})
function setting() {
    removeChildElement(contentElement);
    newContentLeft = ` 
<div class="system_buttons">
    <div class="system_button changing_system">
        <div class="button_img"><img src="/assets/admin/system.gif" alt="refresh_lecture"></div>
        <div class="button_title">更改</div>
    </div>
</div>`;
    createLeftBox.innerHTML = newContentLeft;

    contentElement.appendChild(createLeftBox);
    //changing right_box
    //getting info
    const newContentRight = `
<div class="admin_changing_account">
    <form action="/action_page.php" class="setting_form">
        <label for="email">郵箱:</label><br>
        <input type="email" id="email" name="email" placeholder="輸入新郵箱"><br>
        <label for="password">密碼:</label><br>
        <input type="password" id="password" name="password" placeholder="輸入新密碼"><br>
        <label for="password">確認密碼:</label><br>
        <input type="password" id="confirm_password" name="confirm_password" placeholder="重複輸入新密碼"><br>
        <div class="form_button">
            <input type="submit" id="submit" value="確定">
        </div>
    </form>
</div>`;
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");
    rightBox.setAttribute("style", `${styles}`)
}
