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
            let text = req.query.text;
            let totalPageNum;
            // console.log("this is text:", text)
            if (isNaN(page)) {
                page = 1;
                totalPageNum = 1;
            }
            let result = await this.adminService.loadTeachingData();

            if (result!.length > 0) {
                // console.log("this is loadTeachingData:", result)
                // console.log("this is no:", result)
                let resultText: string[] = [];
                let searchedText: string[] = [];
                if (text && text.length !== 0) {

                    page = 1;
                    for (let i = 0; i < result!.length; i++) {
                        let resultsLabel = result![i]["label"];
                        resultText.push(resultsLabel)
                    }
                    resultText.filter((resultLabel: string) => {
                        if (resultLabel.includes(text as any as string)) {
                            searchedText.push(resultLabel)
                        }
                    })
                    result = searchedText;
                }

                totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE)

                if (page > totalPageNum) {
                    console.log("this is page")
                    res.status(400).json({ success: false, message: "invalid page number" });
                    return;
                }

                const startingIndex = (page - 1) * NUM_PER_PAGE;
                const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);
                 // has data
                 console.log("has data")
                 res.status(200).json({ success: true, current_page: page, total_page: totalPageNum, data: filterData });

            }else if(result!.length === 0) {
                // Empty data
                console.log("empty")
                res.status(200).json({ success: true, message: "Empty Data" });
                return;
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    teachingVideo = async (req: Request, res: Response) => {
        try {
            let label = req.query.label as string;
            const result = await this.adminService.loadTeachingVideo(label)
            console.log("this is result:", result)
            if(result){
                res.status(200).json({ success: true, data: result});
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    deleteTeachingData = async (req: Request, res: Response) => {
        try {
            const deleteWordArr = req.body.checkedArr;
            const result = await this.adminService.deleteTeachingData(deleteWordArr)
            if (result) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Fail to insert into database" });
            }
        }
        catch (err) {
            logger.error(err.toString())
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    deleteUserData = async (req: Request, res: Response) => {
        try {
            const deleteWordArr = req.body.checkedArr;
            const result = await this.adminService.deleteUserData(deleteWordArr)
            if (result!) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Fail to insert into database" });
            }
        }
        catch (err) {
            logger.error(err.toString())
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }

    loadLectureData = async (req: Request, res: Response) => {
        try {
            const result = await this.adminService.loadLectureData();
            console.log("loadTeachingData", result)
            // if (result?.length === 0) {
            //     // Empty data
            //     console.log("empty")
            //     res.status(200).json({ success: true, message: "Empty Data" });
            //     return;
            // }else{
            //     // has data
            //     console.log("has data")
            //     res.status(200).json({ success: true, data: result });
            // }

        }
        catch (err) {
            // logger.error(err.toString());
            // res.status(500).json({ success: false, message: "Internal Server Error" })
            // return;
        }
    }

    getAllUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.session["user"].id as string, 10);
            const NUM_PER_PAGE = 5;
            let page = parseInt(req.query.page as string, 10);
            let text = req.query.text;
            // console.log("this is text:", text)
            if (isNaN(page)) {
                page = 1;
            }

            let result = await this.adminService.getAllUser(userId);
            console.log("this is result from server:",result)

            if (result!.length > 0) {
                let totalPageNum;
                let resultText: object[] = [];
                let searchedText: Array<object> = [];
                if (text && text[0].length !== 0) {

                    page = 1;
                    for (let i = 0; i < result!.length; i++) {
                        let resultsUsername = result![i]["username"];
                        let resultsIdentity = result![i]["identity"];
                        resultText.push({username:resultsUsername,identity:resultsIdentity})
                    }
                    resultText.filter((resultsUsername: {}) => {
                        if (resultsUsername["username"].includes(text as any as string)) {
                            searchedText.push({username:resultsUsername["username"],identity:resultsUsername["identity"] })
                        }
                    })
                    result = searchedText;
                }

                totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);
                const startingIndex = (page - 1) * NUM_PER_PAGE;
                const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);
                if (page > totalPageNum) {
                    res.status(400).json({ success: false, message: "invalid page number" });
                    return;
                }else if (page === totalPageNum && text) {
                    console.log("this is filterData:",filterData)
                    res.status(200).json({ success: true, message: "Same page",current_page: page, total_page: totalPageNum, data: filterData })
                } else {
                    // has data
                    console.log("user")
                    res.status(200).json({ success: true, message:"Get users",current_page: page, total_page: totalPageNum, data: filterData });
                }
               
            } else if(result!.length === 0){
                console.log("no user")
                res.status(200).json({ success: true, message: "No user"});
            }else{
                res.status(400).json({ success: false, message: "Fail to insert into database" });
            }

        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    changeToTeacher = async (req: Request, res: Response) => {
        try {
            console.log("this is hiii:");
            const checkedArr = req.body.checkedArr;
            console.log("this is changeToTeacher111:", checkedArr)
            const result = await this.adminService.changeToTeacher(checkedArr);
            console.log("this is changeToTeacher222:", checkedArr)
            if (result!) {
                res.status(200).json({ success: true ,message: "Success"})
            } else {
                res.status(400).json({ success: false, message: "Fail to insert into database" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    uploadVideo = async (req: Request, res: Response) => {
        try {
            const form = req.form;
            // console.log("this is form:", form!.files.files["newFilename"])
            const result = await this.adminService.uploadVideo(form!.fields["title"], form!.files.files["newFilename"])
            // console.log("this is result:",result)
            if (result!) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Repeat label / video" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
    updateAdminInfo = async (req: Request, res: Response) => {
        try {
            const form = req.form;
            const userId = parseInt(req.session["user"].id as string, 10);
            console.log("this is form:", form)
            console.log("this is fields:", form!.fields)
            const result = await this.adminService.updateAdminInfo(form!.fields, userId)
            if (result!) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Fail to insert into database" });
            }
        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }
}

