"use strict";

const formatSign = (sign) => {
  const splited = sign.split("_");
  splited.shift();
  return splited.join(" ");
};

export const initVideoSeleciton = async () => {
  /**
   * table
   * fetch available data
   * selection sign buffer
   * map available data to table
   */

  const label_list = await $.getJSON("../assets/teachingAI/label_list.json");
  const label_list_chin = await $.getJSON("../assets/teachingAI/label_list_chin.json");

  console.log(label_list_chin);
  const handleSelectSign = (group, input) => {
    window.recoil["selectSign"] = input;
    let pickerGroup = document.getElementsByClassName(group);

    for (var i = 0; i < pickerGroup.length; i++) {
      pickerGroup[i].classList.remove("active");
    }
    let picker = document.getElementById(input);
    console.log("picker: ", picker);
    picker.classList.add("active");

    const signLanguage = input.split("_")[0];
    const videoSrc = "../assets/teachingAI/videos/" + signLanguage + "/" + input + ".mp4";

    const outputVideo = document.getElementById("demo-video");
    outputVideo.src = videoSrc;
  };

  // add hksl selection list
  const hksl_table = document.createElement("div");
  hksl_table.classList.add("hksl-sign-table");
  $(".demo-section-sign-wrapper-sign-table-wrapper").append(hksl_table);

  for (const hksl_sign of label_list.HKSL_LABELS) {
    const hksl_button = document.createElement("button");
    hksl_button.classList.add("hksl-sign-button");
    hksl_button.setAttribute("id", hksl_sign);

    hksl_button.addEventListener("click", () => {
      console.log("click: ", hksl_sign);
      handleSelectSign("hksl-sign-button", hksl_sign);
    });
    $(".hksl-sign-table").append(hksl_button);
  }

  //translate into chin
  const hksl_button_chin = document.querySelectorAll(".hksl-sign-button");
  for (let i = 0; i < label_list_chin.HKSL_LABELS.length; i++) {
    hksl_button_chin[i].innerHTML = label_list_chin.HKSL_LABELS[i];
  }
};
