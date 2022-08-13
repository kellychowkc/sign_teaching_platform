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
            if (isNaN(page)) {
                page = 1;
            }
            let result = await this.adminService.loadTeachingData();

            let totalPageNum;
            let resultText: string[] = [];
            let searchedText: string[] = [];
            if (text && text[0].length !== 0) {
            
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
            } else {
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
    deleteTeachingData = async (req: Request, res: Response) => {
        try {
            const deleteWordArr = req.body.checkedArr;
            await this.adminService.deleteTeachingData(deleteWordArr)
           res.status(200).json({ success: true});
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
            await this.adminService.deleteUserData(deleteWordArr)
           res.status(200).json({ success: true});
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
            if (isNaN(page)) {
                page = 1;
            }

            const result = await this.adminService.getAllUser(userId);
            const totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);
            if (page > totalPageNum) {
                res.status(400).json({ success: false, message: "invalid page number" });
                return;
            }
            const startingIndex = (page - 1) * NUM_PER_PAGE;
            const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);

            if (result?.length === 0) {
                // Empty data
                res.status(200).json({ success: true, message: "Empty Data" });
                return;
            } else {
                // has data
                res.status(200).json({ success: true, current_page: page, total_page: totalPageNum, data: filterData });
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
            // console.log("this is form:", typeof (form!.files.files["newFilename"]))
            await this.adminService.uploadVideo(form!.fields["title"], form!.files.files["newFilename"])
            res.status(200).json({ success: true});
        }
        catch (err) {
            logger.error(err.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" })
            return;
        }
    }



}

