
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js'

export function teacherImage() {
    document.querySelector("#teacherImage").addEventListener("click", async () => {
        const resp = await fetch("/userInfo/displayTeacherImage", { method: "POST" });
        const result = await resp.json();
        if (result.success === true) {
            const data = result.message;
            const image = data["image"];
            const description = data["description"];
            document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="container">
                <div id="userInfoTitle">
                    <div>
                        <h4 class="mb-3">個人形象</h4>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" id="editImage">更改資料</button>
                    </div>
                </div>
                <div class="p-4 border border-secondary">
                    <div class="text-center">
                        <img id="image-preview" src="../assets/usersImages/${image}" style="width:400px" class="rounded rounded-circle" alt="">
                    </div>
                </div>
                <div class="p-4 border border-primary">
                <div class="text-center">
                <h4 class="mb-3 ">${description}</h4>
            </div>
                </div>
            </div>
            `;

            editTeacherImage();
        }
    })
}


function editTeacherImage() {
    document.querySelector("#editImage").addEventListener("click", async () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="container">
                <div class="p-4 border border-secondary">
                    <div class="text-center">
                        <img id="image_preview" src="" style="width:400px"
                            class="rounded rounded-circle" alt="">
                    </div>
                </div>
                <div class="p-4 border border-primary">
                    <form class="needs-validation"  enctype="multipart/form-data" novalidate="">
                        <div class="row g-3" id="userInfoInput">
                            <div class="col-12">
                                <label for="text" class="form-label">自我介紹</label>
                                <input type="text" class="form-control" id="description" placeholder="description">
                                <div class="invalid-feedback">
                                    At least One Input.
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="file" class="form-label">新形象</label>
                                <input type="file" class="form-control" id="image" accept="image/*">
                                <div class="invalid-feedback">
                                    At least One Input.
                                </div>
                            </div>
                            <div class="text-end">
                            <button type="submit" class="btn btn-primary mt-3">提交</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        const newImage = document.querySelector("#image");
        const imagePreview = document.querySelector("#image_preview");
        newImage.onchange = () => {
            const [file] = newImage.files
            if (file) {
                imagePreview.src = URL.createObjectURL(file)
            }
        }
        uploadTeacherData();
    })
}



function uploadTeacherData() {
    const updateData = document.querySelector(".needs-validation");
    updateData.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData();
        formData.append("description", form.description.value);
        formData.append("image", form.image.files[0]);
        const resp = await fetch("/userInfo/editTeacherData", {
            method: "POST",
            body: formData,
        })
        const result = await resp.json();
        console.log(result)
        // if (result.success === true) {
        //     Swal.fire({
        //         icon: 'success',
        //         title: "更改成功",
        //         showConfirmButton: false,
        //         timer: 1500
        //     }).then(() => {
        //         window.location.reload();
        //     })
        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: "更改失敗",
        //         showConfirmButton: false,
        //         timer: 1500
        //     }).then(() => {
        //         window.location.reload();
        //     })
        // }
    })
}

