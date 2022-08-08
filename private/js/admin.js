console.log("running admin.js")

const needReplaceLeft = document.querySelector(".left_box");
const needReplaceRight = document.querySelector(".right_box");
const styles = /**css */`margin-left: 20px;padding: 30px;`;
const needToChangeStyle = document.querySelector(".right_box");

//教學
document.querySelector(".adding_word").addEventListener("click", () => {
    console.log("clicking")
    //if on this place ,then reload
    window.onload()

    //if not , go to this page
})

//課程（更新）
document.querySelector("#lecture").addEventListener("click", () => {
    //if on this place ,then reload

    //if not , go to this page
    needReplaceLeft.innerHTML = /**html */`<div class="system_button adding_lecture">
    <div class="button_img"><img src="/assets/admin/refresh.gif" alt="refresh_lecture"></div>
    <div class="button_title">更新</div>
</div>
<div class="system_button lecture_detail">
    <div class="button_img"><img src="/assets/admin/info.gif" alt="lecture_info"></div>
    <div class="button_title">詳情</div>
</div>`;
    needReplaceRight.innerHTML = /**html */`<h3 class="title">所有課程</h3><br>
<div class="all_lecture_box">

    <form action="/action_page.php" class="lecture_form">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit" class="searching"><img
                src="https://img.icons8.com/ios-glyphs/60/000000/search--v1.png" /></button>
        <div class="adding_lecture_button_box">
            <button class="adding_lecture">新增</button>
        </div>
        <input class="deleting_lecture" type="submit" value="刪除"><br>
        <div class="showing_table_box">
            <table class="lecture_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">課堂名稱</th>
                        <th scope="col">導師</th>
                        <th scope="col">日期</th>
                        <th scope="col">時間</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>教名詞</td>
                        <td>Jason</td>
                        <td>星期五</td>
                        <td>7:00p.m
                            <input type="radio" id="教名詞" name="lecture" value="教名詞">
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
    </form>
</div>`;
    document.querySelector(".lecture_detail").addEventListener("click", () => {
        //if on this place ,then reload


        //if not , go to this page
        console.log("clicking")
        needReplaceRight.innerHTML = /**html */`<h3 class="title">所有課程</h3><br>
    <input class="available_lecture_only" type="submit" value="只顯示可開班"><br>
    <div class="all_lecture_box">
        <div class="showing_table_box">
            <table class="lecture_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">課堂名稱</th>
                        <th scope="col">導師</th>
                        <th scope="col">日期</th>
                        <th scope="col">時間</th>
                        <th scope="col">學生</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>教名詞</td>
                        <td>Jason</td>
                        <td>星期五</td>
                        <td>7:00p.m</td>
                        <td>Alex
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                開班
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">開班</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="/action_page.php" class="holding_lecture_form">
                                                <input type="text" id="title" name="title" placeholder="輸入連結"><br>
                                                <input type="submit" id="submit" value="確定">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    </nav>`;
    })

    needToChangeStyle.setAttribute("style", `${styles}`)
})

// 用戶管理
document.querySelector("#users_control").addEventListener("click", () => {
    needReplaceLeft.innerHTML = /**html */`<div class="system_button users_operation">
    <div class="button_img"><img src="/assets/admin/identity.gif" alt="refresh_lecture"></div>
    <div class="button_title">操作</div>
</div>`;
    needReplaceRight.innerHTML = /**html */`<h3 class="title">所有用家</h3><br>
<form action="/action_page.php" class="lecture_form">
    <div class="changing_identity_box">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit" class="searching"><img
                src="https://img.icons8.com/ios-glyphs/60/000000/search--v1.png" /></button>
        <button class="change_to_teacher">轉為老師</button>
        <button class="deleting_user">刪除</button><br>
        <div class="showing_table_box">
            <table class="lecture_table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">用戶名</th>
                        <th scope="col">身分</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Jason</td>
                        <td>導師<input type="radio" id="Jason" name="selecting_identity" value="Jason">
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
    needToChangeStyle.setAttribute("style", `${styles}`)
})

document.querySelector("#setting").addEventListener("click", () => {
    needReplaceLeft.innerHTML = /**html */`<div class="system_button changing_system">
    <div class="button_img"><img src="/assets/admin/system.gif" alt="refresh_lecture"></div>
    <div class="button_title">更改</div>
</div>`;
    needReplaceRight.innerHTML = /**html */`<div class="admin_changing_account">
    <form action="/action_page.php">
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
    needToChangeStyle.setAttribute("style", `${styles}`)
})