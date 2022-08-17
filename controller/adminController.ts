import { Request, Response } from "express";
import { AdminService } from "../service/adminService";
import { logger } from "../utility/logger";

export class AdminController {
  constructor(private adminService: AdminService) {}

  loadTeachingData = async (req: Request, res: Response) => {
    try {
      const NUM_PER_PAGE = 5;
      let page = parseInt(req.query.page as string, 10);
      let text = req.query.text;
      let totalPageNum;
      if (isNaN(page)) {
        page = 1;
        totalPageNum = 1;
      }
      let result = await this.adminService.loadTeachingData();
      if (result!.length > 0) {
        let resultText: string[] = [];
        let searchedText: string[] = [];
        if (text && text.length !== 0) {
          page = 1;
          for (let i = 0; i < result!.length; i++) {
            let resultsLabel = result![i]["label"];
            resultText.push(resultsLabel);
          }
          resultText.filter((resultLabel: string) => {
            if (resultLabel.includes(text as any as string)) {
              searchedText.push(resultLabel);
            }
          });
          result = searchedText;
        }

        totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);

        if (page > totalPageNum) {
          res.status(400).json({ success: false, message: "invalid page number" });
          return;
        }

        const startingIndex = (page - 1) * NUM_PER_PAGE;
        const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);
        // has data
        res.status(200).json({
          success: true,
          current_page: page,
          total_page: totalPageNum,
          data: filterData,
          dataLength: result?.length,
        });
      } else if (result!.length === 0) {
        // Empty data
        res.status(200).json({ success: true, message: "Empty Data", dataLength: result?.length });
        return;
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  teachingVideo = async (req: Request, res: Response) => {
    try {
      let label = req.query.label as string;
      const result = await this.adminService.loadTeachingVideo(label);
      if (result) {
        res.status(200).json({ success: true, data: result });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  deleteTeachingData = async (req: Request, res: Response) => {
    try {
      const deleteWordArr = req.body.checkedArr;
      const result = await this.adminService.deleteTeachingData(deleteWordArr);
      if (result) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Fail to insert into database" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  deleteUserData = async (req: Request, res: Response) => {
    try {
      const deleteWordArr = req.body.checkedArr;
      const result = await this.adminService.deleteUserData(deleteWordArr);
      if (result!) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Fail to insert into database" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };

  getAllUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.session["user"].id as string, 10);
      const NUM_PER_PAGE = 10;
      let page = parseInt(req.query.page as string, 10);
      let text = req.query.text;
      if (isNaN(page)) {
        page = 1;
      }

      let result = await this.adminService.getAllUser(userId);

      if (result!.length > 0) {
        let totalPageNum;
        let resultText: object[] = [];
        let searchedText: Array<object> = [];
        if (text && text[0].length !== 0) {
          page = 1;
          for (let i = 0; i < result!.length; i++) {
            let resultsUsername = result![i]["username"];
            let resultsIdentity = result![i]["identity"];
            let resultId = result![i]["id"];
            resultText.push({ username: resultsUsername, identity: resultsIdentity, id:resultId });
          }
          resultText.filter((resultsUsername: {}) => {
            if (resultsUsername["username"].includes(text as any as string)) {
              searchedText.push({
                id: resultsUsername["id"],
                username: resultsUsername["username"],
                identity: resultsUsername["identity"],
              });
            }
          });
          result = searchedText;
        }

        totalPageNum = Math.ceil(result!.length / NUM_PER_PAGE);
        const startingIndex = (page - 1) * NUM_PER_PAGE;
        const filterData = result?.slice(startingIndex, startingIndex + NUM_PER_PAGE);
        if (page > totalPageNum) {
          res.status(400).json({ success: false, message: "invalid page number" });
          return;
        } else if (page === totalPageNum && text) {
          res.status(200).json({
            success: true,
            message: "Same page",
            current_page: page,
            total_page: totalPageNum,
            data: filterData,
          });
        } else {
          // has data
          res.status(200).json({
            success: true,
            message: "Get users",
            current_page: page,
            total_page: totalPageNum,
            data: filterData,
          });
        }
      } else if (result!.length === 0) {
        res.status(200).json({ success: true, message: "No user" });
      } else {
        res.status(400).json({ success: false, message: "Fail to insert into database" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  changeToTeacher = async (req: Request, res: Response) => {
    try {
      const checkedArr = req.body.checkedArr;
      await this.adminService.changeToTeacher(checkedArr);
      res.status(200).json({ success: true, message: "Success" });
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  uploadVideo = async (req: Request, res: Response) => {
    try {
      const form = req.form;
      const result = await this.adminService.uploadVideo(
        form!.fields["title"],
        form!.files.files["newFilename"]
      );
      if (result!) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Repeat label / video" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
  updateAdminInfo = async (req: Request, res: Response) => {
    try {
      const form = req.form;
      const userId = parseInt(req.session["user"].id as string, 10);
      const result = await this.adminService.updateAdminInfo(form!.fields, userId);
      if (result!) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, message: "Fail to insert into database" });
      }
    } catch (err) {
      logger.error(err.toString());
      res.status(500).json({ success: false, message: "Internal Server Error" });
      return;
    }
  };
}
