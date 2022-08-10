
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
                    <form id="updateTeacherData" method="post" enctype="multipart/form-data">
                        <input type="text" name="description" id="description" class="form-control" placeholder="description" />
                        <input type="file" name="image" id="image" class="form-control" accept="image/*">
                        <div class="text-end">
                            <button type="submit" class="btn btn-primary mt-3" form="updateTeacherData">Upload</button>
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
                uploadTeacherImage();
            }
        }
    })
}


function uploadTeacherImage() {
    document.querySelector("#updateTeacherData").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData();
        formData.append("teacherDescription", form.description?.value);
        formData.append("teacherImage", form.image?.files[0]);
        console.log(form.image.files[0]);
        const resp = await fetch("/userInfo/editTeacherData", {
            method: 'POST',
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

