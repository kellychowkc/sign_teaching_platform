import { Knex } from "knex";
import { logger } from "../utility/logger";

export class AdminService {
    constructor(private knex: Knex) { }

    async loadTeachingData() {
        try {

            const teachingData = await this.knex("sample_sign_language").select("*")
            // console.log("this is teachingData:", teachingData)
            return teachingData;

        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }

    async loadLectureData() {
        try {

            const loadLectureData = await this.knex("lessons").select("*");
            
            // console.log("this is teachingData:", teachingData)
            return loadLectureData;

        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async getAllUser(userId:number){
        try {
            const isAdmin = await this.knex("users").select("id").where("id",userId).first();
            const isAminId = isAdmin["id"];
            // console.log("this is isAdmin:", typeof(isAminId))
            // console.log("this is isAdmin:", isAminId)
            const getAllUserData = await this.knex("users").select("*").whereNot("id",isAminId);
            // console.log("this is getAllUserData:", getAllUserData)
            return getAllUserData;
        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }
    async uploadVideo(fields:{}, files:string) {
        try {
            console.log("this is fields:", fields)
            console.log("this is files:", files)
            await this.knex.insert({label: fields, sample_video: files}).into("sample_sign_language")


        }
        catch (err) {
            logger.error(err.toString());
            return;
        }
    }


}