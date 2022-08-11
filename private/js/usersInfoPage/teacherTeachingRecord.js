
export function teacherTeachingRecord() {
    document.querySelector("#teachingRecord").addEventListener("click", () => {
        document.querySelector("#userInfoDisplay").innerHTML = `
        <div class="container text-center">
            <div class="col-md-7 col-lg-8 m-auto">
                <h4 class="mb-3">教學記錄</h4>
            </div>
            <div class="row row-cols-2" id="teacherTeaching"></div>
        </div>
        `;

        displayTeachingRecord();
    })
}



async function displayTeachingRecord() {
    const resp = await fetch("/userInfo/displayTeachingRecord", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        const teachingData = result.message;
        if (!teachingData) {
            document.querySelector("#teacherTeaching").innerHTML = `
            <div class="text-center">
                <h3 class="display-4 fw-normal">沒有課堂記錄</h3>
            </div>
            `;
        } else {
            for (let student of teachingData) {
                document.querySelector("#teacherTeaching").innerHTML += `
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">開課日期 : ${student["teachingDate"]}</h5>
                            <p class="card-text">學生 : ${student["studentName"]} , 課堂狀況 : ${student["status"]}</p>
                        </div>
                    </div>
                </div>
                `;
            }
        }
    }

}