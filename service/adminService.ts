import { Knex } from "knex";
import { logger } from "../utility/logger";
import { hashPassword } from "../utility/hash";

export class AdminService {
    constructor(private knex: Knex) { }

    async loadTeachingData() {
        try {
            // const txn = await this.knex.transaction()
            const teachingData = await this.knex("sample_sign_language").select("*")
            console.log("this is teachingData:",teachingData)
            // console.log("this is teachingData:", teachingData)
            return teachingData;

        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }

    async deleteTeachingData(dataArr: string[]) {
        try {
            // const txn = await this.knex.transaction()
            let result;
            for (let data of dataArr) {
                result = await this.knex("sample_sign_language").where("label", data).del().returning("*")
            }
            return result;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async deleteUserData(dataArr: string[]) {
        try {
            // const txn = await this.knex.transaction()
            let result;
            for (let data of dataArr) {
                result = await this.knex("users").where("username", data).del().returning("*")
            }
            return result;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async uploadVideo(fields: {}, files: string) {
        try {
            // console.log("thi si fields:",fields)
            // console.log("thi si files:",files)
            const repeatedLabel = await this.knex("sample_sign_language").select("label","sample_video").where("label",fields)
            console.log("this is repeatedLabel",repeatedLabel)
            // const txn = await this.knex.transaction()
            // console.log("this is fields:", fields)
            // console.log("this is files:", files)
            if(repeatedLabel.length === 0){
                console.log("inserting")
                const uploadVideo = await this.knex.insert({ label: fields, sample_video: files }).into("sample_sign_language").returning("*")
                return uploadVideo;
            }
            return
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async loadTeachingVideo(label:string) {
        try {
           console.log("this is label:",label);
           const videoData = await this.knex("sample_sign_language").select("label","sample_video").where("label",label).first();
           return videoData;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async loadLectureData() {
        try {
            await this.knex()
            

        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async getAllUser(userId: number) {
        try {
            // const txn = await this.knex.transaction()
            const isAdmin = await this.knex("users").select("id").where("id", userId).first();
            const isAminId = isAdmin["id"];
            // console.log("this is isAdmin:", typeof(isAminId))
            
            const getAllUserData = await this.knex("users").select("username","identity").whereNot("id", isAminId);
            console.log("this is getAllUserData:", getAllUserData)
            // console.log("this is getAllUserData:", getAllUserData)
            return getAllUserData;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async changeToTeacher(checkedDataArr: string[]) {
        try {
            // const txn = await this.knex.transaction()
            console.log("this is checkedDataArr:", checkedDataArr)
            let result;
            let updatedUserID;
            for (let i = 0; i < checkedDataArr.length; i++) {
                updatedUserID = await this.knex("users").update("identity", "teacher").where("username", checkedDataArr[i]).returning("id")
                console.log("this is updatedUserID:", updatedUserID)
                result = await this.knex.insert({ teacher_image: "", teacher_description: "", user_id: updatedUserID["id"] }).into("teachers").returning("*");
            }
            return result
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }


    async updateAdminInfo(fields:{}, userId: number) {
        try {

            const hashedPassword = await hashPassword(fields["password"])
            console.log("this is email:", fields, userId)
            const result = await this.knex("users").update({ email: fields["email"], password: hashedPassword }).where("id", userId).returning("*")
            return result;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }

}