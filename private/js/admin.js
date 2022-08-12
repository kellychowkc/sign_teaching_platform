import { navbarCreate } from "/js/navbar.js";

window.onload = () => {
    navbarCreate();
    // loadTeachingData();
    loadDifferentPage()
};

// only one page:
// const leftBox = document.querySelector(".left_box")
// console.log("this is leftBox:", leftBox)
// removeChildElement(contentElement, leftBox);

function loadDifferentPage() {
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status")
    if (status === "teaching") {
        loadTeachingData();
    } else if (status === "usersControl") {
        getAllUser()
    }
}
console.log("running admin.js")

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
            console.log("this is childCount:", parent.childElementCount)
            console.log("removing...", parent.firstElementChild)
            parent.removeChild(parent.firstElementChild)
        }
        return
    }
    parent.removeChild(target)
}

// function teachingEmptyTable() {
//     removeChildElement(contentElement);
//     newContentLeft = `
//     <div class="system_buttons">
//         <div class="system_button adding_word">
//             <div class="button_img"><img src="/assets/admin/add.gif" alt="adding_word"></div>
//             <div class="button_title">新增詞語</div>
//         </div>
//     </div>
//     <div class="display_words">
//         <div class="title">已有詞語</div>
//         <div class="display_word words_box">
//             <div class="words_form">
//                 <form action="/action_page.php">
//                     <input type="text" placeholder="Search.." name="search">
//                     <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
//                     <div class="table-section">
//                         <table id="table">
//                             <tr class="table-rows">
//                                 <td class="items">Empty</td>
//                             </tr>
//                         </table>
//                 </form>
//             </div>
//         </div>
//     </div>
// `;
//     createLeftBox.innerHTML = newContentLeft;
//     contentElement.appendChild(createLeftBox);
//     //changing right_box
//     //getting info
//     //table list
//     //pageNumb
//     const newContentRight = `
//     <form action="/action_page.php" class="content_form">
//         <div class="container uploadVideo">
//             <h1>上載影片</h1>
//             <hr /><br>


//             <label for="fn" class="uploading"><b>詞語： </b></label>
//             <input type="text" placeholder="輸入新詞語" name="title" id="title" required />
//             <br><br>

//             <label for="file"><b>選擇上載文件 : </b></label>
//             <br>
//             <input type="file" name="myFile" id="myFile">
//             <br>
//             <br>

//             <hr />
//             <input type="submit" class="submitVideo" value="上載"><br>
//         </div>
//     </form>`;
//     createRightBox.innerHTML = newContentRight;
//     contentElement.appendChild(createRightBox);
//     const rightBox = document.querySelector(".right_box");
//     rightBox.setAttribute("style", `${stylesTeaching}`)
// }

function teaching(current_page,total_page, data) {
    console.log("this is result", typeof (data))
    let items = ``;
    let pages = ``;
    if (data) {
        for (let i = 0; i < data.length; i++) {
            console.log("this is item", data[i]["label"])
            const title = data[i]["label"]
            items += `
            <tr class="table-rows">
                <td class="items">${title}<input type="checkbox" id="${title}" name="${title}" value="${title}"></td>
            </tr>`;
        }
        for (let i = 0; i < total_page; i++) {
            pages += `
            <li class="page-item"><a class="page-link" href="?status=teaching&page=${i + 1}">${i + 1}</a></li>`;
        }
    }
    let up =``;
    let down =``;
    if(current_page - 1 !== 0 && !(current_page + 1 > total_page) ){
        up += `<a class="page-link" href="?status=teaching&page=${current_page-1}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=teaching&page=${current_page+1}" aria-label="Next">`
    }else{
        up += `<a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next">`
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
            <form action="/action_page.php">
                <input type="text" placeholder="Search.." name="search">
                <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
                <input type="submit" class="deleting" value="刪除"><br>
                <div class="table-section">
                    <table id="table">
                    ${items}
                    </table>
            </form>
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
    //changing right_box
    //getting info
    //table list
    //pageNumb
    const newContentRight = `
<form action="/action_page.php" class="content_form">
    <div class="container uploadVideo">
        <h1>上載影片</h1>
        <hr /><br>


        <label for="fn" class="uploading"><b>詞語： </b></label>
        <input type="text" placeholder="輸入新詞語" name="title" id="title" required />
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

// 教學
document.querySelector("#teaching").addEventListener("click", async() => {
    window.location.href = "admin.html?status=teaching"
    await loadTeachingData();
    document.querySelector(".deleting").addEventListener("click"), (event) => {
        event.preventDefault()
        const listTable = document.querySelectorAll(".items");
        let listArr = [];
        for (let items of listTable) {
            listArr.push(items["value"])
        }
        console.log("this is listTable:", listTable)
    }
})

//load Data
async function loadTeachingData() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/teachingData?page=${page}`, { method: "GET" });
    const result = await resp.json();
    teaching(result["current_page"],result["total_page"], result["data"]);
    document.querySelector(".submitVideo").addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector(".content_form")
        uploadFile(form)
    })
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
}


// 課程（更新）
function lecture() {
    removeChildElement(contentElement);
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
    <form action="/action_page.php" class="lecture_form lecture_adding_form">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
        <button class="adding" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            新增
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增課堂</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form action="/action_page.php">
                            <label for="teacher_name">導師：</label><br>
                            <input type="text" id="teacher_name" name="teacher_name" placeholder="輸入導師"><br>
                            <label for="dates">日期：</label>
                            <select id="dates" name="dates">
                                <option value="monday">星期一</option>
                                <option value="tuesday">星期二</option>
                                <option value="wednesday">星期三</option>
                                <option value="thursday">星期四</option>
                                <option value="friday">星期五</option>
                            </select><br>
                            <label for="time">時間：</label>
                            <input type="time" id="time" name="time" min="08:00" max="20:00" required>
                            <div class="form_button">
                                <input type="submit" id="submit" class="createLecture" value="確定">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <button class="deleting deleting_lecture">刪除</button>
    </form>
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
                <tr class="table-rows">
                    <th scope="row">1</th>
                    <td>Jason</td>
                    <td>星期五</td>
                    <td>7:00p.m
                        <input type="checkbox" id="麵包" name="words" value="麵包">
                    </td>
                </tr>
                <tr class="table-rows">
                    <th scope="row">1</th>
                    <td>Jason</td>
                    <td>星期五</td>
                    <td>7:00p.m
                        <input type="checkbox" id="麵包" name="words" value="麵包">
                    </td>
                </tr>
            </tbody>
        </table>
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
</div>`;
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");

    //課程（詳情）
    document.querySelector(".lecture_detail").addEventListener("click", () => {
        lectureDetail()
    })

    rightBox.setAttribute("style", `${styles}`)
}
async function loadLectureData() {
    const resp = await fetch("/admin/lectureData", { method: "GET" });
    const result = await resp.json();
    lecture();

}
// function lectureEmptyTable(){
//     removeChildElement(contentElement);
//     newContentLeft = `
//     <div class="system_buttons">
//         <div class="system_button adding_lecture">
//             <div class="button_img"><img src="/assets/admin/refresh.gif" alt="refresh_lecture"></div>
//             <div class="button_title">更新</div>
//         </div>
//         <div class="system_button lecture_detail">
//             <div class="button_img"><img src="/assets/admin/info.gif" alt="lecture_info"></div>
//             <div class="button_title">詳情</div>
//         </div>
//     </div>
// `;
//     createLeftBox.innerHTML = newContentLeft;
//     contentElement.appendChild(createLeftBox);
//     //changing right_box
//     //getting info
//     //table list
//     //pageNumb
//     const newContentRight = `
//     <h3 class="title">所有課程</h3><br>
// <div class="all_lecture_box">
//     <div class="lecture_form lecture_adding_form">
//         <input type="text" placeholder="Search.." name="search">
//         <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
//         <button class="adding" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
//             新增
//         </button>
//         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                         <h5 class="modal-title" id="exampleModalLabel">新增課堂</h5>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body">
//                         <form action="/action_page.php" class="lectureForm">
//                             <label for="teacher_name">導師：</label><br>
//                             <input type="text" id="teacher_name" name="teacher_name" placeholder="輸入導師"><br>
//                             <label for="dates">日期：</label>
//                             <select id="dates" name="dates">
//                                 <option value="monday">星期一</option>
//                                 <option value="tuesday">星期二</option>
//                                 <option value="wednesday">星期三</option>
//                                 <option value="thursday">星期四</option>
//                                 <option value="friday">星期五</option>
//                             </select><br>
//                             <label for="time">時間：</label>
//                             <input type="time" id="time" name="time" min="08:00" max="20:00" required>
//                             <div class="form_button">
//                                 <input type="submit" id="submit" class="createLecture" value="確定">
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <button class="deleting deleting_lecture">刪除</button>
//     </div>
//     <div class="showing_table_box">
//         <table class="lecture_table">
//             <tbody class="table-group-divider">
//                 <tr class="table-rows">
//                     <td>空</td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// </div>`;
//     createRightBox.innerHTML = newContentRight;
//     contentElement.appendChild(createRightBox);

//     //adding style
//     const rightBox = document.querySelector(".right_box");

//     //課程（詳情）
//     document.querySelector(".lecture_detail").addEventListener("click", () => {
//         lectureDetail()
//     })
//     document.querySelector(".createLecture").addEventListener("click", (event)=>{
//         event.preventDefault();
//         const form = document.querySelector(".lectureForm")
//         createLecture(form)

//     })
//     rightBox.setAttribute("style", `${styles}`)
// }
async function createLecture(form) {
    const formData = new FormData();

    console.log("this is form:", form)
    console.log("this is teacher_name:", form.teacher_name.value)
    console.log("this is dates:", form.dates.value)
    console.log("this is time:", form.time.value)

    formData.append("teacher_name", form.teacher_name.value)
    formData.append("dates", form.dates.value)
    formData.append("time", form.time.value)

    const resp = await fetch("/admin/createLecture", {
        method: "POST",
        body: formData
    });
    console.log("this is res", resp)

}
document.querySelector("#lecture").addEventListener("click", () => {
    loadLectureData();
})

// 用戶管理
function usersControl(current_page,total_page, userData) {

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
            <td>${userIdentity} <input type="checkbox" id="${userName}" name="${userName}" value="${userName}">
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
    if(current_page - 1 !== 0 && !(current_page + 1 > total_page) ){
        up += `<a class="page-link" href="?status=usersControl&page=${current_page-1}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=usersControl&page=${current_page+1}" aria-label="Next">`
    }else{
        up += `<a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Previous">`
        down += ` <a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Next">`
    }
    const newContentRight = `
    <h3 class="title">所有用家</h3><br>
    <form action="/action_page.php" class="lecture_form">
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
    </form>
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
}
document.querySelector("#users_control").addEventListener("click", () => {
    window.location.href = "admin.html?status=usersControl"
    // let url = new URL(window.location.href);
    // let params = new URLSearchParams(url.search);
    // url.searchParams.set('foo', 'baz');
    // getAllUser()
    // usersControl();
})



async function getAllUser() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") || 1;
    const resp = await fetch(`/admin/allUser?page=${page}`, { method: "GET" })
    const result = await resp.json()
    console.log("this is getAllUser", result)
    if (result.success === true && result.data) {
        usersControl(result["current_page"],result["total_page"], result["data"])
    }
}
function userEmptyTable() {
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

    const newContentRight = `
    <h3 class="title">所有用家</h3><br>
    <form action="/action_page.php" class="lecture_form">
        <div class="changing_identity_box">
            <input type="text" placeholder="Search.." name="search">
            <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
            <button class="change_to_teacher">轉為老師</button>
            <button class="deleting deleting_user">刪除</button><br>
            <div class="showing_table_box">
                <table class="lecture_table">
                    <tbody class="table-group-divider">
                        <tr class="table-rows">          
                            <td>空</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </form>
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
    </nav>`;
    createRightBox.innerHTML = newContentRight;
    contentElement.appendChild(createRightBox);

    //adding style
    const rightBox = document.querySelector(".right_box");

    rightBox.setAttribute("style", `${styles}`)
}
// 設定
document.querySelector("#setting").addEventListener("click", () => {
    setting()
})
