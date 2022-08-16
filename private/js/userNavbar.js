import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function userNavbar() {
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
    `;

  logout();
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
