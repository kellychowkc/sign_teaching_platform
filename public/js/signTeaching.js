import { navbarCreate } from "/js/navbar.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";


window.onload = () => {
  navbarCreate();
  getSignLabel();
  checkIfLogIn()
};

async function getSignLabel() {
  const resp = await fetch("/sign", {
    method: "GET",
  });
  const result = await resp.json();
  const signList = result.sign;

  drawSignList(signList);
}

function drawSignList(signList) {
  const formatSign = (sign) => {
    const splited = sign.split("_");
    splited.shift();
    return splited.join(" ");
  };

  const handleSelectSign = (group, input) => {
    let pickerGroup = document.getElementsByClassName(group);

    for (var i = 0; i < pickerGroup.length; i++) {
      pickerGroup[i].classList.remove("active");
    }
    let picker = document.getElementById(input);
    console.log("picker: ", picker);
    picker.classList.add("active");

    const outputVideo = document.getElementById("demo-video");
    let videoSrc;
    for (const signLanguage of signList) {
      if (signLanguage.label == input) {
        videoSrc = signLanguage.sample_video;
      }
    }
    console.log(videoSrc);
    outputVideo.src = "/assets/freeVideos/" + videoSrc;
    console.log(outputVideo.src);
  };

  const hksl_table = document.createElement("div");
  hksl_table.classList.add("hksl-sign-table");
  document.querySelector(".demo-section-sign-wrapper-sign-table-wrapper").append(hksl_table);

  for (let i = 0; i < signList.length; i++) {
    const hksl_sign = signList[i].label;
    console.log(hksl_sign);
    const hksl_button = document.createElement("button");
    hksl_button.classList.add("hksl-sign-button");
    hksl_button.setAttribute("id", hksl_sign);
    hksl_button.innerHTML = formatSign(hksl_sign);

    hksl_button.addEventListener("click", () => {
      console.log("click: ", hksl_sign);
      handleSelectSign("hksl-sign-button", hksl_sign);
    });
    document.querySelector(".hksl-sign-table").append(hksl_button);
  }
}

async function checkIfLogIn(){
  const resp = await fetch("/status", {method: "GET"});
  const result = await resp.json();
  console.log("this is result:", result)
  if(result.success === true && result.message === "Status: log-in"){
      console.log("this is result:", result.message)
      document.querySelector("#header").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
  <div class="container">
      <a href="/index.html"><img src="/assets/手語學堂logo.png" alt="logo" id="logo" id="logo" width="100" height="90"></a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">

              <li class="nav-item">
                  <a class="nav-link" href="/index.html">手語簡介</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/html/teacherIntro.html">導師簡介</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/html/signTeaching.html">手語入門</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/html/teachingAI.html">手語教學</a>
              </li>
              <li class="nav-item">
                    <a class="nav-link" href="/html/userInfo.html">用戶資訊</a>
              </li>
              <li class="nav-item" id="logout">
                  <a class="nav-link" href="#">登出
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#5D281D" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                          <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                  </a>
              </li>
          </div>
      </div>
  </nav>
  `
  logout()
  };
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
              window.location.href = `http://localhost:8080/`;
            });
          }
        }
      });
  });
}