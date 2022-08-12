import { navbarCreate } from "/js/navbar.js";

window.onload = async () => {
  await navbarCreate();
  getSignLabel();
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
