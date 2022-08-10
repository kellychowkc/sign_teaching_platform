
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function userInfoData() {
    document.querySelector("#userInfo").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayUserInfo", {method: "POST"});
        const result = await resp.json();
        if (result.success === false) {
            Swal.fire({
                icon: 'error',
                title: "資料失敗",
                showConfirmButton: false,
                timer: 1500
            }).then(function(){
                window.location.href = "/user.html";
            })
        } else {
            document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="col-md-7 col-lg-8 m-auto" id="userInfoData">
                <div id="userInfoTitle">
                    <div>
                        <h4 class="mb-3">個人資料</h4>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" id="editUserInfo">更改資料</button>
                        <button type="button" class="btn btn-primary" id="editUserPassword">更改密碼</button>
                    </div>
                </div>
                <form class="needs-validation" novalidate="">
                    <div class="row g-3" id="userInfoInput">
                        <div class="col-12">
                            <label for="username" class="form-label">用戶名稱</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="username" value="${result.username}" readonly>
                                <div class="invalid-feedback">
                                    Your username is required.
                                </div>
                            </div>
                        </div>
    
                        <div class="col-sm-6">
                            <label for="firstName" class="form-label">名字 ( First name )</label>
                            <input type="text" class="form-control" id="firstName" value="${result.firstName}" readonly>
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
    
                        <div class="col-sm-6">
                            <label for="lastName" class="form-label">姓氏 ( Last name )</label>
                            <input type="text" class="form-control" id="lastName" value="${result.lastName}" readonly>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
    
                        <div class="col-12">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" value="${result.email}" readonly>
                            <div class="invalid-feedback">
                                Valid email address is required.
                            </div>
                        </div>
    
                        <div class="col-12">
                            <label for="phoneNum" class="form-label">電話號碼</label>
                            <input type="tel" class="form-control" id="phoneNum" pattern="[0-9]{8}" value="${result.phoneNum}" readonly>
                            <div class="invalid-feedback">
                                Valid phone number is required.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            `;

            editUserInfo(result.username, result.firstName, result.lastName, result.email, result.phoneNum);
            editUserPassword();
        };
    })
}



export function editUserInfo(username, firstName, lastName, email, phoneNum) {
    document.querySelector("#editUserInfo").addEventListener("click", () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="col-md-7 col-lg-8 m-auto" id="userInfoData">
            <div id="userInfoTitle">
                <div>
                    <h4 class="mb-3">個人資料</h4>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="editUserInfo">更改資料</button>
                    <button type="button" class="btn btn-primary" id="editUserPassword">更改密碼</button>
                </div>
            </div>
            <form class="needs-validation" novalidate="">
                <div class="row g-3" id="userInfoInput">
                    <div class="col-12">
                        <label for="username" class="form-label">用戶名稱</label>
                        <div class="input-group has-validation">
                            <input type="text" class="form-control" id="username" value="${username}" required>
                            <div class="invalid-feedback">
                                Your username is required.
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <label for="firstName" class="form-label">名字 ( First name )</label>
                        <input type="text" class="form-control" id="firstName" value="${firstName}" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <label for="lastName" class="form-label">姓氏 ( Last name )</label>
                        <input type="text" class="form-control" id="lastName" value="${lastName}" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email" value="${email}" required>
                        <div class="invalid-feedback">
                            Valid email address is required.
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="phoneNum" class="form-label">電話號碼</label>
                        <input type="tel" class="form-control" id="phoneNum" pattern="[0-9]{8}" value="${phoneNum}" required>
                        <div class="invalid-feedback">
                            Valid phone number is required.
                        </div>
                    </div>
                    <button class="w-100 btn btn-primary btn-lg" type="submit">提交</button>
                </div>
            </form>
        </div>
        `;

        editUserPassword();
        submitNewUserInfo();
    })


    function submitNewUserInfo() {
        const submitForm = document.querySelector(".needs-validation");

        submitForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!submitForm.checkValidity()) {
                event.stopPropagation();
                submitForm.classList.add('was-validated');
                return;
            }
            const form = event.target;
            const formData = {};
            formData["username"] = form.username.value;
            formData["firstName"] = form.firstName.value;
            formData["lastName"] = form.lastName.value;
            formData["email"] = form.email.value;
            formData["phoneNum"] = form.phoneNum.value;
            const resp = await fetch("/userInfo/editUserInfo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await resp.json();
            if (result.success === true) {
                Swal.fire({
                    icon: 'success',
                    title: "更改成功",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.reload();
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "更改失敗",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.reload();
                })
            }
        })
    }
}




export function editUserPassword() {
    document.querySelector("#editUserPassword").addEventListener("click", () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="col-md-7 col-lg-8 m-auto" id="userInfoData">
            <div id="userInfoTitle">
                <div>
                    <h4 class="mb-3">更改密碼</h4>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="editUserInfo">更改資料</button>
                    <button type="button" class="btn btn-primary" id="editUserPassword">更改密碼</button>
                </div>
            </div>
            <form class="needs-validation" novalidate="">
                <div class="row g-3" id="userInfoInput">
                    <div class="col-12">
                        <label for="password" class="form-label">舊密碼</label>
                        <input type="password" class="form-control" id="oldPassword" placeholder="Password" required>
                        <div class="invalid-feedback">
                            Valid Password is required.
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="password" class="form-label">新密碼</label>
                        <input type="password" class="form-control" id="newPassword" placeholder="Password" required>
                        <div class="invalid-feedback">
                            Cannot use old Password.
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="confirmPassword" class="form-label">確認密碼</label>
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required>
                        <div class="invalid-feedback">
                            Password do not match.
                        </div>
                    </div>
                    <button class="w-100 btn btn-primary btn-lg" type="submit">提交</button>
                </div>
            </form>
        </div>
        `;

        editUserInfo();
        confirmPassword();
        submitNewUserPassword();
    });


    function confirmPassword() {
        const oldPass = document.querySelector("#oldPassword");
        const newPass = document.querySelector("#newPassword");
        const confirmPass = document.querySelector("#confirmPassword");

        newPass.addEventListener("keyup", () => {
            if (oldPass.value === newPass.value) {
                newPass.classList.remove("is-valid");
                newPass.classList.add("is-invalid");
            } else {
                newPass.classList.remove("is-invalid");
                newPass.classList.add("is-valid");
            }
        })
        confirmPass.addEventListener("keyup", () => {
            if (newPass.value !== confirmPass.value) {
                confirmPass.classList.remove("is-valid");
                confirmPass.classList.add("is-invalid");
            } else {
                confirmPass.classList.remove("is-invalid");
                confirmPass.classList.add("is-valid");
            }
        })
    }


    function submitNewUserPassword() {
        const submitForm = document.querySelector(".needs-validation");

        submitForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!submitForm.checkValidity()) {
                event.stopPropagation();
                submitForm.classList.add('was-validated');
                return;
            }
            const form = event.target;
            const formData = {};
            formData["oldPassword"] = form.oldPassword.value;
            formData["newPassword"] = form.newPassword.value;
            const resp = await fetch("/userInfo/editUserPassword");
            const result = await resp.json();
            if (result.success === true) {
                Swal.fire({
                    icon: 'success',
                    title: "更改成功",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.reload();
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "更改失敗",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function(){
                    window.location.reload();
                })
            }
        })
    }
}

