import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function studentInfoData() {
  document.querySelector("#userInfo").addEventListener("click", async () => {
    const resp = await fetch("/userInfo/displayStudentInfo", { method: "POST" });
    const result = await resp.json();
    if (result.success === false) {
      Swal.fire({
        icon: "error",
        title: "資料失敗",
        showConfirmButton: false,
        timer: 1500,
      }).then(function () {
        window.location.href = "/user.html";
      });
    } else {
      const studentData = result.message;
      if (studentData) {
        document.querySelector("#userInfoDisplay").innerHTML = `
                <div class="container">
                    <div class="row flex-lg-nowrap">
                        <div class="col">
                            <div class="row">
                                <div class="col mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col d-flex justify-content-end">
                                                    <button class="btn btn-primary" id="editStudentInfo">更改資料</button>
                                                </div>
                                            </div>
                                            <div class="e-profile">
                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto" style="width: 200px;">
                                                            <div class="d-flex justify-content-center align-items-center rounded" >
                                                                <img id="image_preview" src="../assets/usersImages/student_icon.png" style="width:200px; height: 200px;" class="rounded rounded-circle">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                                                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap student-username" >${studentData["username"]}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="nav nav-tabs">
                                                    <li class="nav-item"><div class="active nav-link">個人資料</div></li>
                                                </ul>
                                                <div class="tab-content pt-3">
                                                    <div class="tab-pane active">
                                                        <form class="needs-validation form" novalidate="">
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>名字 ( First name )</label>
                                                                                <input class="form-control" type="text" name="fname" value="${studentData["first_name"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>姓氏 ( Last name )</label>
                                                                                <input class="form-control" type="text" name="lname" value="${studentData["last_name"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>E-mail</label>
                                                                                <input class="form-control" type="text" name="email" value="${studentData["email"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>電話號碼</label>
                                                                                <input class="form-control" type="number" name="phoneNum" value="${studentData["phone_num"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

        editStudentInfo();
      }
    }
  });
}

function editStudentInfo() {
  document.querySelector("#editStudentInfo").addEventListener("click", async () => {
    const resp = await fetch("/userInfo/displayStudentInfo", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
      const studentData = result.message;
      if (studentData) {
        document.querySelector(".e-profile").innerHTML = `
                <div class="row">
                    <div class="col-12 col-sm-auto mb-3">
                        <div class="mx-auto" style="width: 200px;">
                            <div class="d-flex justify-content-center align-items-center rounded" >
                                <img id="image_preview" src="../assets/usersImages/student_icon.png" style="width:200px; height: 200px;" class="rounded rounded-circle">
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap student-username">${studentData["username"]}</h4>
                        </div>
                    </div>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item"><div class="active nav-link">個人資料</div></li>
                </ul>
                <div class="tab-content pt-3">
                    <div class="tab-pane active">
                        <form class="needs-validation" id="newInfo" novalidate="">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>名字 ( First name )</label>
                                                <input class="form-control" type="text" name="fname" value="${studentData["first_name"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid first name is required.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label>姓氏 ( Last name )</label>
                                                <input class="form-control" type="text" name="lname" value="${studentData["last_name"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid last name is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>E-mail</label>
                                                <input class="form-control" type="text" name="email" value="${studentData["email"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid email address is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>電話號碼</label>
                                                <input class="form-control" type="number" name="phoneNum" value="${studentData["phone_num"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid phone number is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6 mb-3">
                                    <div class="mb-2"><b>更改密碼</b></div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>舊密碼</label>
                                                <input class="form-control" type="password" name="oldPass" id="oldPass" placeholder="••••••">
                                                <div class="invalid-feedback">
                                                    Valid Password is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>新密碼</label>
                                                <input class="form-control" type="password" name="newPass" id="newPass" placeholder="••••••">
                                                <div class="invalid-feedback">
                                                    Cannot use old Password.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>確認密碼</label>
                                                <input class="form-control" type="password" id="confirmPass" placeholder="••••••"> 
                                                <div class="invalid-feedback">
                                                    Password do not match.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex justify-content-end">
                                    <button class="btn btn-primary" type="submit">提交</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                `;

        confirmPassword();
        submitNewInfo();
      }
    }
  });
}

function confirmPassword() {
  const oldPass = document.querySelector("#oldPass");
  const newPass = document.querySelector("#newPass");
  const confirmPass = document.querySelector("#confirmPass");
  newPass.addEventListener("keyup", () => {
    if (oldPass.value === newPass.value) {
      newPass.classList.remove("is-valid");
      newPass.classList.add("is-invalid");
    } else {
      newPass.classList.remove("is-invalid");
      newPass.classList.add("is-valid");
    }
  });
  confirmPass.addEventListener("keyup", () => {
    if (newPass.value !== confirmPass.value) {
      confirmPass.classList.remove("is-valid");
      confirmPass.classList.add("is-invalid");
    } else {
      confirmPass.classList.remove("is-invalid");
      confirmPass.classList.add("is-valid");
    }
  });
}

function submitNewInfo() {
  const submitForm = document.querySelector("#newInfo");
  submitForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!submitForm.checkValidity()) {
      event.stopPropagation();
      submitForm.classList.add("was-validated");
      return;
    } else {
      const form = event.target;
      const formObject = {};
      formObject["fname"] = form.fname.value;
      formObject["lname"] = form.lname.value;
      formObject["email"] = form.email.value;
      formObject["phoneNum"] = form.phoneNum.value;
      formObject["oldPass"] = form.oldPass?.value;
      formObject["newPass"] = form.newPass?.value;
      const resp = await fetch("/userInfo/editStudentInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      const result = await resp.json();
      if (result.success === true) {
        Swal.fire({
          icon: "success",
          title: "更改成功",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "更改失敗",
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {
          window.location.reload();
        });
      }
    }
  });
}
