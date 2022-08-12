import { Request, Response } from "express";
import { AdminService } from "../service/adminService";
import { logger } from "../utility/logger";


export class AdminController {
    constructor(private adminService: AdminService) { }

    loadTeachingData = async (req: Request, res: Response) => {
        try {
            // console.log("loadTeachingData")
            const NUM_PER_PAGE = 5;
            let page = parseInt(req.query.page as string, 10);
            if(isNaN(page)){
                page = 1;
            }

            const result = await this.adminService.loadTeachingData();
            const totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);
            if(page > totalPageNum){
                res.status(400).json({ success: false, message: "invalid page number" });
                return;
            }
            const startingIndex = (page - 1) * NUM_PER_PAGE;
            const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);
            if (result!.length === 0) {
                // Empty data
                console.log("empty")
                res.status(200).json({ success: true, message: "Empty Data" });
                return;
            }else{
                // has data
                console.log("has data")
                res.status(200).json({ success: true, current_page: page, total_page: totalPageNum, data: filterData });
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }

    loadLectureData = async (req: Request, res: Response) => {
        try {
            // console.log("loadTeachingData")
            const result = await this.adminService.loadLectureData();
            if (result?.length === 0) {
                // Empty data
                console.log("empty")
                res.status(200).json({ success: true, message: "Empty Data" });
                return;
            }else{
                // has data
                console.log("has data")
                res.status(200).json({ success: true, data: result });
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    getAllUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            console.log("this is userId", userId);
            const NUM_PER_PAGE = 5;
            let page = parseInt(req.query.page as string, 10);
            if(isNaN(page)){
                page = 1;
            }

            const result = await this.adminService.getAllUser(userId);
            const totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);
            if(page > totalPageNum){
                res.status(400).json({ success: false, message: "invalid page number" });
                return;
            }
            const startingIndex = (page - 1) * NUM_PER_PAGE;
            const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);

            if (result?.length === 0) {
                // Empty data
                console.log("empty")
                res.status(200).json({ success: true, message: "Empty Data" });
                return;
            }else{
                // has data
                console.log("has data:", result)
                res.status(200).json({ success: true, current_page: page, total_page: totalPageNum, data: filterData  });
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    uploadVideo = async(req:Request, res:Response)=>{
        try {
            const form = req.form;
            console.log("this is form:", typeof(form!.files.files["newFilename"]))
            await this.adminService.uploadVideo(form!.fields["title"],form!.files.files["newFilename"])
        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    

    // displayUserInfo = async (req: Request, res: Response) => {
    //     try {
    //         const userId = parseInt(req.session["user"].id as string, 10);
    //         const userData: Array<{}> = await this.userInfoService.getUserData(userId);
    //         if (userData.length === 0) {
    //             res.status(401).json({ success: false, message: "Not This User" });
    //             return;
    //         }
    //         const userInfo = { "username": userData[0]["username"], "firstName": userData[0]["first_name"], "lastName": userData[0]["last_name"], "email": userData[0]["email"], "phoneNum": userData[0]["phone_num"] };
    //         res.status(200).json(userInfo);
    //     }
    //     catch (err) {
    //         logger.error(err.toString());
    //         res.status(400).json({ success: false, message: "Display Error" })
    //         return;
    //     }
    // }


    // editUserInfo = async (req: Request, res: Response) => {
    //     try {
    //         const userId = parseInt(req.session["user"].id as string, 10);
    //         const username = req.session["user"].username as string;
    //         const newData: { username: string, firstName: string, lastName: string, email: string, phoneNum: number } = req.body;
    //         console.log(newData)
    //         const result = await this.userInfoService.editUserInfo(userId, username, newData);
    //         if (result === false) {
    //             res.status(400).json({ success: false, message: "Edit Error" });
    //             return;
    //         } else {
    //             res.status(200).json({ success: true, message: "Edit Success" });
    //         }
    //     }
    //     catch (err) {
    //         logger.error(err.toString());
    //         res.status(400).json({ success: false, message: "Edit Error" })
    //         return;
    //     }
    // }


    // editUserPassword = async (req: Request, res: Response) => {
    //     try {
    //         console.log(req.body)
    //         const userId = parseInt(req.session["user"].id as string, 10);
    //         const password: { oldPassword: string, newPassword: string } = req.body;
    //         const result = await this.userInfoService.editUserPassword(userId, password);
    //         if (result === false) {
    //             res.status(400).json({ success: false, message: "Edit Error" });
    //             return;
    //         } else {
    //             res.status(200).json({ success: true, message: "Edit Success" });
    //         }
    //     }
    //     catch (err) {
    //         logger.error(err.toString());
    //         res.status(400).json({ success: false, message: "Edit Error" })
    //         return;
    //     }
    // }


    // displayCalendarData = async (req: Request, res: Response) => {
    //     try {
    //         const userId = parseInt(req.session["user"].id as string, 10);
    //         const userIdentity = req.session["user"].identity as string;
    //         const calendarData = await this.userInfoService.getCalendarData(userId, userIdentity);
    //         if (calendarData) {
    //             let result = [];
    //             for (let calender of calendarData) {
    //                 const lessonYear = calender["start"].substring(6, 10);
    //                 const lessonMonth = calender["start"].substring(3, 5);
    //                 const lessonDay = calender["start"].substring(0, 2);
    //                 const lessonTime = calender["start"].substring(12, );
    //                 const lessonDate = lessonYear + "-" + lessonMonth + "-" + lessonDay + "T" + lessonTime;
    //                 result.push({ title: calender["title"], start: lessonDate });
    //             }
    //             res.status(200).json({ success: true, message: result });
    //         }

    //     }
    //     catch (err) {
    //         logger.error(err.toString());
    //         res.status(400).json({ success: false, message: "Display Error" })
    //         return;
    //     }
    // }
}

