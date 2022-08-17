import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function navbarCreate() {
  document.querySelector("#header").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
  <div class="container">
      <a href="../index.html"><img src="../assets/手語學堂logo.png" alt="logo" id="logo" width="100" height="90"></a>
    
                          
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
       </button>

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
              <li class="nav-item" id="signIn-box">
                  <a class="nav-link" href="./login.html">登入
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
}

export function footerCreate() {
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

export async function checkIfLogIn() {
  const resp = await fetch("/status", { method: "GET" });
  const result = await resp.json();
  console.log("this is result:", result);
  if (result.success === true && result.message === "Status: log-in") {
    console.log("this is result:", result.message);
    if (result.identity === "user") {
      document.querySelector("#header").innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
            <div class="container">
                <a href="/index.html"><img src="/assets/手語學堂logo.png" alt="logo" id="logo" id="logo" width="100" height="90"></a>
          
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#475F73" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
            `;
    } else {
      document.querySelector("#header").innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
            <div class="container">
                <a href="/index.html"><img src="/assets/手語學堂logo.png" alt="logo" id="logo" id="logo" width="100" height="90"></a>
          
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
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
                              <a class="nav-link" href="/html/admin.html?status=teaching">網站管理</a>
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
            `;
    }
    logout();
    return true;
  } else {
    return false;
  }
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
              window.location.href = `/index.html`;
            });
          }
        }
      });
  });
}
