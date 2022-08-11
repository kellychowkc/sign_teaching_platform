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