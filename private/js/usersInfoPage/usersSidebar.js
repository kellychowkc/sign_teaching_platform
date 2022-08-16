import { teacherInfoData } from "./teacherInfoData.js";
import { studentInfoData } from "./studentInfoData.js";
import { teacherTimeTable } from "./teachersTimeTable.js";
import { displayBookingTable } from "./studentLessonBooking.js";
import { teacherTeachingRecord } from "./teacherTeachingRecord.js";
import { startLessonForStudent } from "./studentStartLesson.js";
import { startLessonForTeacher } from "./teacherStartLesson.js";
import { displayDashboard } from "./learningDashboard.js";
import { displayPackages } from "./packages.js";


export async function studentSidebar() {
  document.querySelector("#userInfoList").innerHTML = `
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
        <div class="sidebar">
            <a href="./userInfo.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi pe-none me-2" width="40" height="32">
                    <img src="../assets/usersImages/student_icon.png" rel="mages" id="usersImages" />
                </svg>
                <span class="fs-4">用戶資訊</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <div class="nav-link link-dark" id="userInfo">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-file-pen"></i>
                        </svg>
                        個人資料
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link link-dark" id="lessonBooking">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-person-chalkboard"></i>
                        </svg>
                        預約課堂
                    </div>
                </li>
                <li  class="nav-item">
                    <div class="nav-link link-dark" id="buyPackages">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-brands fa-leanpub"></i>
                        </svg>
                        購買課堂
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link link-dark" id="dashboard">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-chalkboard"></i>
                        </svg>
                        學習進度
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link link-dark" id="startLesson">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </svg>
                        準備開課
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `;

  studentInfoData();
  displayBookingTable();
  displayPackages();
  startLessonForStudent();
  displayDashboard();

  hiddenSidebar();
}


export async function teacherSidebar() {
  document.querySelector("#userInfoList").innerHTML = `
    <div class="sidebar_wrapper d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
        <div class="sidebar">
            <a href="./userInfo.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi pe-none me-2" width="40" height="32">
                    <img src="../assets/usersImages/teacher_icon.png" rel="mages" id="usersImages" />
                </svg>
                <span class="fs-4">用戶資訊</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <div class="nav-link link-dark" id="userInfo">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-file-pen"></i>
                        </svg>
                        個人資料
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link link-dark" id="timeTable">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-business-time"></i>
                        </svg>
                        時間管理
                    </div>
                </li>
                <li  class="nav-item">
                    <div class="nav-link link-dark" id="teachingRecord">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-person-chalkboard"></i>
                        </svg>
                        教學記錄
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link link-dark" id="startLesson">
                        <svg class="bi pe-none me-2" width="16" height="16">
                            <i class="fa-solid fa-chalkboard"></i>
                        </svg>
                        準備開課
                    </div>
                </li>
            </ul>
        </div>
        <div class="menu"><i id="sideIcon" class="fa-solid fa-caret-right fa-2x"></i></div>
    </div>
    `;

  teacherInfoData();
  teacherTimeTable();
  teacherTeachingRecord();
  startLessonForTeacher();

  hiddenSidebar();
}


function hiddenSidebar() {
    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector("#sideIcon").classList.toggle("fa-caret-right fa-caret-left");
        document.querySelector(".sidebar_wrapper").classList.toggle("show_sidebar");
        document.querySelector("body").classList.toggle("push_body");
    })
}