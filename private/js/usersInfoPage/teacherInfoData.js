import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export function teacherInfoData() {
  document.querySelector("#userInfo").addEventListener("click", async () => {
    const resp = await fetch("/userInfo/displayTeacherInfo", { method: "POST" });
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
      const teacherData = result.message;
      if (teacherData) {
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
                                                    <button class="btn btn-primary" id="editTeacherInfo">更改資料</button>
                                                </div>
                                            </div>
                                            <div class="e-profile">
                                                <div class="row">
                                                    <div class="col-12 col-sm-auto mb-3">
                                                        <div class="mx-auto" style="width: 200px;">
                                                            <div class="d-flex justify-content-center align-items-center rounded" >
                                                                <img id="image_preview" src="../assets/usersImages/${teacherData["teacher_image"]}" style="width:200px; height: 200px;" class="rounded rounded-circle">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                                                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap teacher-username">${teacherData["username"]}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="nav nav-tabs">
                                                    <li class="nav-item"><div class="active nav-link">個人資料</div></li>
                                                </ul>
                                                <div class="tab-content pt-3">
                                                    <div class="tab-pane active">
                                                        <form class="needs-validation form" enctype="multipart/form-data" novalidate="">
                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>名字 ( First name )</label>
                                                                                <input class="form-control" type="text" name="fname" value="${teacherData["first_name"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>姓氏 ( Last name )</label>
                                                                                <input class="form-control" type="text" name="lname" value="${teacherData["last_name"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>E-mail</label>
                                                                                <input class="form-control" type="text" name="email" value="${teacherData["email"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col">
                                                                            <div class="form-group">
                                                                                <label>電話號碼</label>
                                                                                <input class="form-control" type="number" name="phoneNum" value="${teacherData["phone_num"]}" readOnly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col mb-3">
                                                                            <div class="form-group">
                                                                                <label>自我介紹</label>
                                                                                <textarea class="form-control" name="description" rows="5" placeholder="${teacherData["teacher_description"]}" readOnly></textarea>
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

        editTeacherInfo();
      }
    }
  });
}

function editTeacherInfo() {
  document.querySelector("#editTeacherInfo").addEventListener("click", async () => {
    const resp = await fetch("/userInfo/displayTeacherInfo", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
      const teacherData = result.message;
      if (teacherData) {
        document.querySelector(".e-profile").innerHTML = `
                <div class="row">
                    <div class="col-12 col-sm-auto mb-3">
                        <div class="mx-auto" style="width: 200px;">
                            <div class="d-flex justify-content-center align-items-center rounded" >
                                <img id="image_preview" src="../assets/usersImages/${teacherData["teacher_image"]}" style="width:200px; height: 200px;" class="rounded rounded-circle">
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap teacher-username">${teacherData["username"]}</h4>
                            <div class="mt-2 form-group">
                                <label>更改形象</label>
                                <input type="file" class="form-control" form="newInfo" name="image" id="image" accept="image/*">
                            </div>
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
                                                <input class="form-control" type="text" name="fname" value="${teacherData["first_name"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid first name is required.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label>姓氏 ( Last name )</label>
                                                <input class="form-control" type="text" name="lname" value="${teacherData["last_name"]}" required>
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
                                                <input class="form-control" type="text" name="email" value="${teacherData["email"]}" required>
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
                                                <input class="form-control" type="number" name="phoneNum" value="${teacherData["phone_num"]}" required>
                                                <div class="invalid-feedback">
                                                    Valid phone number is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col mb-3">
                                            <div class="form-group">
                                                <label>自我介紹</label>
                                                <textarea class="form-control" name="description" rows="5" required>${teacherData["teacher_description"]}"</textarea>
                                                <div class="invalid-feedback">
                                                Valid description is required.
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

        const newImage = document.querySelector("#image");
        const imagePreview = document.querySelector("#image_preview");
        newImage.onchange = () => {
          const [file] = newImage.files;
          if (file) {
            imagePreview.src = URL.createObjectURL(file);
          }
        };
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
      const formData = new FormData();
      formData.append("fname", form.fname.value);
      formData.append("lname", form.lname.value);
      formData.append("email", form.email.value);
      formData.append("phoneNum", form.phoneNum.value);
      formData.append("description", form.description.value);
      formData.append("oldPass", form.oldPass?.value);
      formData.append("newPass", form.newPass?.value);
      formData.append("image", form.image?.files[0]);
      const resp = await fetch("/userInfo/editTeacherInfo", {
        method: "POST",
        body: formData,
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
