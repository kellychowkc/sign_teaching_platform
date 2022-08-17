import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";

export async function displayPackages() {
  document.querySelector("#buyPackages").addEventListener("click", () => {
    document.querySelector("#userInfoDisplay").innerHTML = `
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-xl-5 col-lg-6 col-md-8">
                        <div class="section-title text-center title-ex1">
                            <h2>課堂卷</h2>
                        </div>
                    </div>
                </div>
                <div class="row" id="packagesList">
                </div>
            </div>
        `;

    displayPackagesList();
  });
}

async function displayPackagesList() {
  const resp = await fetch("/userInfo/displayPackagesRecord", { method: "POST" });
  const result = await resp.json();
  if (result.success === true) {
    const data = result.message;
    if (data.length === 0) {
      document.querySelector("#buyLessonList").innerHTML = `
            <div class="text-center">
                <h3 class="display-4 fw-normal">暫時沒有任何課堂卷可以選擇</h3>
            </div>
            `;
    } else {
      for (let packages of data) {
        let descriptionArr = packages["packageDescription"].split(", ");
        let descriptionStr = ``;
        for (let description of descriptionArr) {
          descriptionStr += `
                    <li>${description}</li>
                    `;
        }
        document.querySelector("#packagesList").innerHTML +=
          `
                <div class="col-md-4 packagesList">
                    <div class="price-card ">
                        <h2>${packages["packageName"]}</h2>
                        <p class="price"><span>${packages["packagePrice"]}</span></p>
                        <ul class="pricing-offers">
                            ` +
          descriptionStr +
          `
                        </ul>
                        <a href="#" class="btn btn-primary btn-mid buyBtn" value="${packages["packageId"]}">購買</a>
                    </div>
                </div>
                `;
        buyPackages();
      }
    }
  }
}

function buyPackages() {
  document.querySelectorAll(".buyBtn").forEach((item) => {
    item.addEventListener("click", async () => {
      const packageId = parseInt(item.getAttribute("value"));
      const resp = await fetch("/userInfo/displayPackagesRecord", { method: "POST" });
      const result = await resp.json();
      if (result.success === true) {
        const data = result.message;
        if (data.length > 0) {
          for (let packages of data) {
            if (packages["packageId"] === packageId) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons
                .fire({
                  title: `是否要購買[ ${packages["packageName"]} ]?`,
                  text: `$${packages["packagePrice"]}`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "是",
                  cancelButtonText: "否",
                  reverseButtons: true,
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = `./paypal.html?id=${packages["packageId"]}`;
                  }
                });
            }
          }
        }
      }
    });
  });
}
