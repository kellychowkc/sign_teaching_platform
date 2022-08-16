import { userInfoData } from "./usersInfoData.js";
import { teacherTimeTable } from "./teachersTimeTable.js";
import { displayBookingTable } from "./studentLessonBooking.js";
import { teacherImage } from "./teacherImage.js";
import { displayLearningRecord } from "./studentLearnRecord.js";
import { teacherTeachingRecord } from "./teacherTeachingRecord.js";
import { startLessonForStudent } from "./studentStartLesson.js";
import { startLessonForTeacher } from "./teacherStartLesson.js";
import { displayDashboard } from "./learningDashboard.js";

export async function studentSidebar() {
  document.querySelector("#userInfoList").innerHTML = `
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
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
            <div class="nav-link link-dark" id="learningRecord">
                <svg class="bi pe-none me-2" width="16" height="16">
                    <i class="fa-brands fa-leanpub"></i>
                </svg>
                購買課堂
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
        <li class="nav-item">
        <div class="nav-link link-dark" id="dashboard">
            <svg class="bi pe-none me-2" width="16" height="16">
                <i class="fa-solid fa-chalkboard"></i>
            </svg>
            課堂記錄
        </div>
    </li>
    </ul>
</div>
    `;

  userInfoData();
  displayBookingTable();
  displayLearningRecord();
  startLessonForStudent();
  displayDashboard();
}

export async function teacherSidebar() {
  document.querySelector("#userInfoList").innerHTML = `
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
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
            <div class="nav-link link-dark" id="teacherImage">
                <svg class="bi pe-none me-2" width="16" height="16">
                <i class="fa-solid fa-user-pen"></i>
                </svg>
                個人形象
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
    `;

  userInfoData();
  teacherImage();
  teacherTimeTable();
  teacherTeachingRecord();
  startLessonForTeacher();
}
