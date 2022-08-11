import { navbarCreate } from "/js/navbar.js";

window.onload = () => {
    navbarCreate();
    loadTeachingData();
    
};

console.log("running admin.js")

const styles = /**css */`padding: 30px;`;
const stylesTeaching = /**css */`padding: 30px;display: flex;justify-content: center;align-items: center; flex-wrap: wrap;`;

const contentElement = document.getElementById("content_box");
let createLeftBox = document.createElement("div");
createLeftBox.className = "content_box left_box";
let createRightBox = document.createElement("div");
createRightBox.className = "content_box right_box";

const leftBox = document.querySelector(".left_box");

let newContentLeft;
let newContentRight;

async function loadTeachingData() {
    const resp = await fetch("/admin/", { method: "GET" });
    const result = await resp.json();
    // console.log("this is result:", result)
    if (result.success === true && result.message === "Empty Data") {
        teachingEmptyTable();
    }
    document.querySelector(".submitVideo").addEventListener("click", (event)=>{
    event.preventDefault();
    console.log("wanna uploads")
    const form = document.querySelector(".content_form")
    uploadFile(form)

})
}
async function uploadFile(form){
    const files = document.getElementById("myFile").files
    const formData = new FormData();
    
    if (files.length > 1 || files.length === 0) {
        alert("Please upload One video");
        return;
    }

    formData.append("title", form.title.value)
    formData.append("files", files[0]);
    console.log("this is files:",files[0])

    const resp = await fetch("/admin/uploadVideo",{
        method: "POST",
        body: formData
    });

    // const result = await resp.json();
    // console.log("this is result:", result)

    

}

// sir!!!
function removeChildElement(parent) {
    for (let i = 0; i = parent.childElementCount; i++) {
        console.log("this is childCount:", parent.childElementCount)
        console.log("removing...", parent.firstElementChild)
        parent.removeChild(parent.firstElementChild)
    }
}

function teachingEmptyTable() {
    removeChildElement(contentElement);
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
                    <div class="table-section">
                        <table id="table">
                            <tr class="table-rows">
                                <td class="items">Empty</td>
                            </tr>
                        </table>
                </form>
            </div>
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

function teaching() {
    removeChildElement(contentElement);
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
                        <tr class="table-rows">
                            <td class="items">麵包<input type="checkbox" id="麵包" name="words" value="麵包"></td>

                        </tr>
                        <tr class="table-rows">
                            <td class="items">麵包<input type="checkbox" id="麵包" name="words" value="麵包"></td>
                        </tr>
                        <tr class="table-rows">
                            <td class="items">麵包<input type="checkbox" id="麵包" name="words" value="麵包"></td>
                        </tr>
                    </table>
            </form>
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



//課程（更新）
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
                                <input type="submit" id="submit" value="確定">
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

function usersControl() {
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
                    <thead>
                        <tr class="table-title">
                            <th scope="col">#</th>
                            <th scope="col">用戶名</th>
                            <th scope="col">身分</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr class="table-rows">
                            <th scope="row">1</th>
                            <td>Jason</td>
                            <td>導師 <input type="checkbox" id="麵包" name="words" value="麵包">
                            </td>
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
document.querySelector("#teaching").addEventListener("click", () => {
    teaching();
})
// const submitVideo = document.querySelector(".submitVideo")
// submitVideo.addEventListener("click", ()=>{
//     console.log("wanna uploads")
// })

// 課程（更新）
document.querySelector("#lecture").addEventListener("click", () => {
    lecture();
})
// 課程（詳情）
document.querySelector("#users_control").addEventListener("click", () => {
    usersControl();
})
// 用戶管理
document.querySelector("#setting").addEventListener("click", () => {
    setting()
})
