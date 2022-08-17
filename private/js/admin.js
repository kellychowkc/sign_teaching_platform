import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

window.onload = () => {
  userNavbar();
  loadDifferentPage();
  footer();
};

function userNavbar() {
  document.querySelector("#header").innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
    <div class="container">
        <a href="../index.html"><img src="../assets/手語學堂logo.png" alt="logo" id="logo" id="logo" width="100" height="90"></a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <a class="nav-link" href="../index.html">手語簡介</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./teacherIntro.html">導師簡介</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./signTeaching.html">手語入門</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/html/teachingAI.html">手語教學</a>
                </li>
                <li class="nav-item" id="logout">
                    <a class="nav-link">登出
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5D281D" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </a>
                </li>
            </div>
        </div>
    </nav>
    `;
  logout();
}

function loadDifferentPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get("status");
  if (status === "teaching") {
    loadTeachingData();
  } else if (status === "usersControl") {
    getAllUser();
  } else if (status === "lectureDetail") {
    loadingLectureDetail();
  } else if (status === "lecture") {
    loadingLecture();
  } else if (status === "setting") {
    setting();
  }
}

const styles = /**css */ `padding: 30px;`;
const stylesTeaching = /**css */ `
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center; 
                flex-wrap: wrap;`;

const contentElement = document.getElementById("content_box");
let createLeftBox = document.createElement("div");
createLeftBox.className = "content_box left_box";
let createRightBox = document.createElement("div");
createRightBox.className = "content_box right_box";

let newContentLeft;
let newContentRight;

function removeChildElement(parent, target = 1) {
  if (Number(target)) {
    for (let i = 0; (i = parent.childElementCount); i++) {
      parent.removeChild(parent.firstElementChild);
    }
    return;
  }
  parent.removeChild(target);
}
async function deleting() {
  // different situation
  let params = new URLSearchParams(window.location.search);
  let status = params.get("status");
  const allChecked = document.querySelectorAll("input[name=checkbox]:checked");
  const checkArr = Array.from(allChecked).map((checkbox) => checkbox.value);
  let resp;
  if (status === "teaching") {
    resp = await fetch(`/admin/teachingData`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ checkedArr: checkArr }),
    });
  } else if (status === "usersControl") {
    resp = await fetch(`/admin/userData`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ checkedArr: checkArr }),
    });
  }
  let result = await resp.json();
  if (result.success === true) {
    Swal.fire({
      icon: "success",
      title: "成功",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  }
}

// 教學
const teachingNavButton = document.querySelector("#teaching");
teachingNavButton.addEventListener("click", async () => {
  // change bar font
  window.location.href = "admin.html?status=teaching";
  await loadTeachingData();
});

// init data and listening to search
async function loadTeachingData() {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page") || 1;
  const resp = await fetch(`/admin/teachingData?page=${page}`, { method: "GET" });
  const result = await resp.json();
  if (result.success === true) {
    showWord(result["current_page"], result["total_page"], result["data"], result["dataLength"]);

    document.querySelector(".deleting").addEventListener("click", () => {
      deleting();
    });

    document.querySelector(".submitVideo").addEventListener("click", (event) => {
      event.preventDefault();
      uploadFile();
    });

    const textInputElement = document.querySelector("input[name=search]");
    textInputElement.addEventListener("keyup", async function () {
      let text = textInputElement.value;
      console.log("this is text:", text);
      let resp = await fetch(`/admin/teachingData?page=${page}&text=${text}`, { method: "GET" });
      let result = await resp.json();
      showWord(result["current_page"], result["total_page"], result["data"]);
    });

    let tableBody = document.querySelector(".tbody");

    const showVideoButton = document.querySelectorAll(".itemsIndex");
    showVideoButton.forEach((item) =>
      item.addEventListener("click", () => {
        if (item.id) {
          showVideo(item.id);
        }
      })
    );
  }
}
// display chosen video
async function showVideo(label) {
  let resp = await fetch(`/admin/teachingVideo?label=${label}`, { method: "GET" });
  let result = await resp.json();

  const video_box = /**html */ `
    <div class="video_box">
    <div class="video">
        <h3 class="title">${result["data"]["label"]}</h3>
        <div class="close-container">
            <button class="close" style="text-align:center;padding-bottom:2px;padding-top:2px;">x</button>
        </div>
        <div class="ratio ratio-16x9">
            <iframe src="/assets/freeVideos/${result["data"]["sample_video"]}" title="${result["data"]["label"]} video"
                allowfullscreen></iframe>
        </div>
    </div>
</div>
`;
  document.querySelector(".video_container").innerHTML = video_box;
  document.querySelector(".close").addEventListener("click", () => {
    const video_box = document.querySelector(".video_box");
    video_box.remove();
  });
}

// display with init data or search data
function showWord(current_page, total_page, data, dataLength) {
  let items = ``;
  let pages = ``;
  let up = ``;
  let down = ``;
  if (data) {
    // init data
    if (typeof data[0] === "object") {
      removeChildElement(contentElement);
      if (current_page - 1 !== 0 || !(current_page + 1 > total_page)) {
        console.log("this is current_page:", current_page);
        up += `<a class="page-link" href="?status=teaching&page=${
          current_page - 1
        }" aria-label="Previous">`;
        down += ` <a class="page-link" href="?status=teaching&page=${
          current_page + 1
        }" aria-label="Next">`;
      } else {
        up += `<a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous">`;
        down += ` <a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next">`;
      }
      for (let i = 0; i < data.length; i++) {
        const title = data[i]["label"];
        const id = data[i]["id"];
        items += `
                <tr class="table-rows">
                    <td class="items itemsIndex" id="${title}">${id}</td>
                    <td class="items" id="${title}">${title}<input type="checkbox" name="checkbox"id="${title}" name="${title}" value="${title}"></td>
                </tr>`;
      }
      for (let i = 0; i < total_page; i++) {
        pages += `
                <li class="page-items"><a class="page-link" href="?status=teaching&page=${i + 1}">${
          i + 1
        }</a></li>`;
      }
      newContentLeft = `
                            <div class="system_buttons">
                                <div class="system_button adding_word">
                                    <div class="button_img"><img src="/assets/admin/add.gif" alt="adding_word"></div>
                                    <div class="button_title">新增詞語</div>
                                </div>
                            </div>
                            <div class="display_words">
                                <div class="title">已有詞語<span class="value_bg">${dataLength}</span></div>
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
                            </div>`;

      createLeftBox.innerHTML = newContentLeft;
      contentElement.appendChild(createLeftBox);

      const newContentRight = `
                    <form action="/action_page.php" class="content_form">
                        <div class="container uploadVideo">
                            <h1>上載影片</h1>
                            <hr /><br>


                            <label for="fn" class="uploading"><b>詞語： </b></label>
                            <input type="text" placeholder="輸入格式為Hksl_(english)" name="title" id="title" required />
                            <br><br>

                            <label for="file"><b>選擇上載文件 : </b></label>
                            <br>
                            <input type="file" name="myFile" id="myFile" accept="video/mp4">
                            <br>
                            <br>

                            <hr />
                            <input type="submit" class="submitVideo" value="上載"><br>

                        </div>
                    </form>`;
      createRightBox.innerHTML = newContentRight;
      contentElement.appendChild(createRightBox);
      const rightBox = document.querySelector(".right_box");
      rightBox.setAttribute("style", `${stylesTeaching}`);

      const showVideoButton = document.querySelectorAll(".itemsIndex");
      showVideoButton.forEach((item) =>
        item.addEventListener("click", () => {
          if (item.id) {
            showVideo(item.id);
          }
        })
      );

      const textInputElement = document.querySelector("input[name=search]");
      textInputElement.addEventListener("keyup", async function () {
        let text = textInputElement.value;
        console.log("this is text:", text);
        let resp = await fetch(`/admin/teachingData?page=${page}&text=${text}`, { method: "GET" });
        let result = await resp.json();
        showWord(result["current_page"], result["total_page"], result["data"]);
      });
    } else if (Array.isArray(data) && data[0].length !== 0) {
      console.log("this is searching data:", data);

      // table 1. delete children of parentElement; 2.create its first children
      const tableParent = document.querySelector("table");
      removeChildElement(tableParent);

      // pagination
      const pageParent = document.querySelector("nav.page_box");
      let createPageParent = document.createElement("ul");
      createPageParent.className = "pagination";
      removeChildElement(pageParent);

      for (let i = 0; i < data.length; i++) {
        const title = data[i];
        items += `
                    <tr class="table-rows">
                    <td class="items itemsIndex" id="${title}">${i + 1}</td>
                    <td class="items">${title}<input type="checkbox" name="checkbox" id="${title}" name="${title}" value="${title}"></td></tr>
                `;
      }

      for (let i = 0; i < total_page; i++) {
        pages += `
                <li class="page-items"><a class="page-link" href="?status=teaching&page=${i + 1}">${
          i + 1
        }</a></li>`;
      }

      if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
        up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${
          current_page - 1
        }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
        down += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${
          current_page + 1
        }" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;
      } else {
        up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
        down += ` <li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;
      }

      let pagination = `${up}${pages}${down}`;

      createPageParent.innerHTML = pagination;
      pageParent.appendChild(createPageParent);

      tableParent.innerHTML = items;
      const showVideoButton = document.querySelectorAll(".itemsIndex");
      showVideoButton.forEach((item) =>
        item.addEventListener("click", () => {
          if (item.id) {
            showVideo(item.id);
          }
        })
      );

      const textInputElement = document.querySelector("input[name=search]");
      textInputElement.addEventListener("keyup", async function () {
        let text = textInputElement.value;
        let resp = await fetch(`/admin/teachingData?page=${page}&text=${text}`, { method: "GET" });
        let result = await resp.json();
        showWord(result["current_page"], result["total_page"], result["data"]);
      });
    }
  } else {
    items = /**html */ `
        <tr class="table-rows">
            <td class="items">空</td>
        </tr>`;
    if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
      up += `<a class="page-link" href="?status=teaching&page=${
        current_page - 1
      }" aria-label="Previous">`;
      down += ` <a class="page-link" href="?status=teaching&page=${
        current_page + 1
      }" aria-label="Next">`;
    } else {
      up += `<a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous">`;
      down += ` <a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next">`;
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
                        <input type="text" placeholder="輸入格式為Hksl_(english).mp4" name="title" id="title" required />
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
    rightBox.setAttribute("style", `${stylesTeaching}`);
  }
}

// upload file
async function uploadFile() {
  let form = document.querySelector(".content_form");
  const files = document.getElementById("myFile").files;
  const formData = new FormData();
  const field = form.title.value;

  if (files.length > 1 || files.length === 0 || field.length === 0) {
    Swal.fire({
      icon: "error",
      title: "請輸入所有資料",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  } else if (field.substring(0, 5) !== "Hksl_") {
    Swal.fire({
      icon: "error",
      title: "格式須為'Hksl_'",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  formData.append("title", form.title.value);
  formData.append("files", files[0]);

  const resp = await fetch("/admin/video", {
    method: "POST",
    body: formData,
  });
  const result = await resp.json();
  if (result.success === true) {
    Swal.fire({
      icon: "success",
      title: "成功",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  }
}

// 用戶管理
document.querySelector("#users_control").addEventListener("click", () => {
  // change bar font
  window.location.href = "admin.html?status=usersControl";
});
// get init data and search request
async function getAllUser() {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page") || 1;
  const resp = await fetch(`/admin/userData?page=${page}`, { method: "GET" });
  const result = await resp.json();
  if (result.success === true && result.message === "Get users") {
    // init data
    usersControl(result["current_page"], result["total_page"], result["data"]);
    // searching
    const textInputElement = document.querySelector("input[name=search]");
    textInputElement.addEventListener("keyup", async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const page = queryParams.get("page") || 1;
      let text = textInputElement.value;
      const resp = await fetch(`/admin/userData?page=${page}&text=${text}`, { method: "GET" });
      const result = await resp.json();
      if (result.success === true) {
        showSearchUser(result["current_page"], result["total_page"], result["data"]);
      }
    });
  } else if (result["message"] === "No user") {
    usersControl();
  }
}
function showSearchUser(current_page, total_page, userData) {
  let items = ``;
  let pages = ``;
  let up = ``;
  let down = ``;
  // table 1. delete children of parentElement; 2.create its first children
  const tableParent = document.querySelector("tbody");
  removeChildElement(tableParent);

  // pagination
  const pageParent = document.querySelector("nav.page_box");
  let createPageParent = document.createElement("ul");
  createPageParent.className = "pagination";
  removeChildElement(pageParent);

  for (let i = 0; i < userData.length; i++) {
    const userName = userData[i]["username"];
    const userIdentity = userData[i]["identity"];
    const userId = userData[i]["id"];
    items += `
                <tr class="table-rows"> <th scope="row">
                  ${userId}
                </th><td>${userName}</td> <td>${userIdentity} <input type="checkbox" name="checkbox" id="${userName}" name="${userName}" value="${userName}">
                </td></tr>
            `;
  }

  for (let i = 0; i < total_page; i++) {
    pages += `
            <li class="page-items"><a class="page-link" href="?status=teaching&page=${i + 1}">${
      i + 1
    }</a></li>`;
  }

  if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
    up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${
      current_page - 1
    }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    down += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${
      current_page + 1
    }" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;
  } else {
    up += `<li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    down += ` <li class="page-item"><a class="page-link" href="?status=teaching&page=${current_page}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;
  }

  let pagination = `${up}${pages}${down}`;

  createPageParent.innerHTML = pagination;
  pageParent.appendChild(createPageParent);

  tableParent.innerHTML = items;
}
// display with init data
function usersControl(current_page = 1, total_page = 1, userData = 1) {
  let items = ``;
  let pages = ``;
  let dataLength = userData.length;

  // if there are data
  if (typeof userData !== Number) {
    for (let i = 0; i < userData.length; i++) {
      const userName = userData[i]["username"];
      const userIdentity = userData[i]["identity"];
      const userId = userData[i]["id"];
      items += `
                <tr class="table-rows">
                    <th scope="row">${userId}</th>
                    <td>${userName}</td>
                    <td>${userIdentity} <input type="checkbox" name="checkbox" id="${userName}" name="${userName}" value="${userName}">
                    </td>
                </tr>`;
    }
    for (let i = 0; i < total_page; i++) {
      pages += `
            <li class="page-item"><a class="page-link" href="?status=usersControl&page=${i + 1}">${
        i + 1
      }</a></li>`;
    }
  } else {
    items = ` <tr class="table-rows">
                <th scope="row">空</th>
                <td>空</td>
                <td>空</td>
            </tr>`;
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
  let up = ``;
  let down = ``;
  if (current_page - 1 !== 0 && !(current_page + 1 > total_page)) {
    up += `<a class="page-link" href="?status=usersControl&page=${
      current_page - 1
    }" aria-label="Previous">`;
    down += ` <a class="page-link" href="?status=usersControl&page=${
      current_page + 1
    }" aria-label="Next">`;
  } else {
    up += `<a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Previous">`;
    down += ` <a class="page-link" href="?status=usersControl&page=${current_page}" aria-label="Next">`;
  }
  const newContentRight = `
                <h3 class="title">所有用戶<span class="value_bg">${dataLength}</span></h3><br>
                <div class="lecture_form">
                    <div class="changing_identity_box">
                        <input type="text" placeholder="Search.." name="search">
                        <button type="submit" class="searching"><img src="/assets/admin/searching.png" /></button>
                        <button class="change_to_teacher">切換角色</button>
                        <button class="deleting deleting_user">刪除</button><br>
                        <div class="showing_table_box">
                            <table class="lecture_table">
                                <thead>
                                    <tr class="table-title">
                                        <th scope="col">#</th>
                                        <th scope="col">用戶名</th>
                                        <th scope="col" class="identity">身分</th>
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

  rightBox.setAttribute("style", `${styles}`);

  document.querySelector(".deleting").addEventListener("click", () => {
    deleting();
  });
  document.querySelector(".change_to_teacher").addEventListener("click", () => {
    changeToTeacher();
  });
}
// change identity
async function changeToTeacher() {
  let params = new URLSearchParams(window.location.search);
  let status = params.get("status");
  const allChecked = document.querySelectorAll("input[name=checkbox]:checked");
  const checkArr = Array.from(allChecked).map((checkbox) => checkbox.value);
  const resp = await fetch("/admin/userData", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ checkedArr: checkArr }),
  });
  const result = await resp.json();
  if (result.success === true) {
    Swal.fire({
      icon: "success",
      title: "成功",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
    return;
  }
  Swal.fire({
    icon: "error",
    title: result.message,
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    location.reload();
  });
}

// setting
document.querySelector("#setting").addEventListener("click", () => {
  window.location.href = "admin.html?status=setting";
  setting();
});
// init display
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
  const newContentRight = `
                <div class="admin_changing_account">
                    <form action="/action_page.php" class="setting_form">
                        <label for="email">郵箱:</label><br>
                        <input type="email" id="email" name="email" placeholder="輸入新郵箱" required><br>
                        <label for="password">密碼:</label><br>
                        <input type="password" id="password" name="password" placeholder="輸入新密碼" required><br>
                        <label for="password">確認密碼:</label><br>
                        <input type="password" id="confirm_password" name="confirm_password" placeholder="重複輸入新密碼" required><br>
                        <div class="form_button">
                            <input type="submit" id="submit" value="確定">
                        </div>
                    </form>
                </div>`;
  createRightBox.innerHTML = newContentRight;
  contentElement.appendChild(createRightBox);

  //adding style
  const rightBox = document.querySelector(".right_box");
  rightBox.setAttribute("style", `${styles}`);

  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    changeAdminInfo();
  });
}
// changeAdminInfo
async function changeAdminInfo() {
  let adminForm = document.querySelector(".setting_form");
  const adminFormData = new FormData();

  if (adminForm.password.value !== adminForm.confirm_password.value) {
    Swal.fire({
      icon: "error",
      title: "密碼不相同",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  } else if (
    adminForm.email.value === "" ||
    adminForm.password.value === "" ||
    adminForm.confirm_password.value === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "請輸入所有資料",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  adminFormData.append("email", adminForm.email.value);
  adminFormData.append("password", adminForm.password.value);
  adminFormData.append("confirm_password", adminForm.confirm_password.value);

  const resp = await fetch("/admin/info", {
    method: "POST",
    body: adminFormData,
  });
  const result = await resp.json();
  if (result.success === true) {
    Swal.fire({
      icon: "success",
      title: "成功",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.reload();
    });
  }
}

function footer() {
  document.querySelector("#footer").innerHTML = `
    <div class="row container mx-auto pt-5">
                <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
                    <img src="/assets/手語學堂logo.png" alt="logo" width="100" height="90">
                    <p>中心開辦手語培訓課程，以鼓勵健聽人士學習手語，並掌握基本的對話技巧及相關的文化知識，使他們能夠與聽障人士溝通，以建立共融社會。</p>
                </div>
                <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
                    <h5 class="pb-2">關於我們</h5>   
                    <ul class="text-uppercase list-unstyled">
                        <li><a href="#"></a>免責聲明</li>
                        <li><a href="#"></a>私隱聲明</li>
                        <li><a href="#"></a>退款政策</li>
                        <li><a href="#"></a>網頁指南</li>
                    </ul>
                </div>
                <div class="footer-one col-lg-4 col-md-6 col-12 mb-3">
                    <h5 class="pb-2">聯絡我們</h5>   
                    <div>
                        <h6 class="text-uppercase">電話</h6>
                        <p>(852) 1234-5678</p>
                    </div>
                    <div>
                        <h6 class="text-uppercase">電郵</h6>
                        <p>contact_info@signAcademy.com</p>
                    </div>
                    <div>
                        <h6 class="text-uppercase">辦公室地址</h6>
                        <p>新界荃灣福來邨永樂樓地下
                            7-10號(荃灣港鐵站A3出口)</p>
                    </div>
                </div>
            </div>
            <div class="copyright mt-5">
                <div class="row container mx-auto">
                    <div class="col-lg-4 col-md-6 col-12 text-nowrap mb-2">
                        <p> © 2022 手語學堂 版權所有 不得轉載 </p>
                    </div>
                </div>
            </div>
      `;
}

function logout() {
  document.querySelector("#logout").addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "是否登出?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetch("/logout");
          const result = await resp.json();

          if (result.success === false) {
            Swal.fire({
              icon: "error",
              title: "登出失敗",
              title: result.message,
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              window.location.reload();
            });
            return;
          } else {
            Swal.fire({
              icon: "success",
              title: "登出成功",
              showConfirmButton: false,
              timer: 1500,
            }).then(function () {
              window.location.href = "/index.html";
            });
          }
        }
      });
  });
}
