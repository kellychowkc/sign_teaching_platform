import { Knex } from "knex";
import { logger } from "../utility/logger";
import { hashPassword } from "../utility/hash";

export class AdminService {
  constructor(private knex: Knex) {}

  async loadTeachingData() {
    try {
      const teachingData = await this.knex("sample_sign_language").select("*");
      return teachingData;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }

  async deleteTeachingData(dataArr: string[]) {
    try {
      let result;
      for (let data of dataArr) {
        result = await this.knex("sample_sign_language").where("label", data).del().returning("*");
      }
      return result;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }
  async deleteUserData(dataArr: string[]) {
    try {
      let result;
      for (let data of dataArr) {
        result = await this.knex("users").where("username", data).del().returning("*");
      }
      return result;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }
  async uploadVideo(fields: {}, files: string) {
    try {
      const repeatedLabel = await this.knex("sample_sign_language")
        .select("label", "sample_video")
        .where("label", fields);
      if (repeatedLabel.length === 0) {
        const uploadVideo = await this.knex
          .insert({ label: fields, sample_video: files })
          .into("sample_sign_language")
          .returning("*");
        return uploadVideo;
      }
      return;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }
  async loadTeachingVideo(label: string) {
    try {
      const videoData = await this.knex("sample_sign_language")
        .select("label", "sample_video")
        .where("label", label)
        .first();
      return videoData;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }

  async getAllUser(userId: number) {
    try {
      const isAdmin = await this.knex("users").select("id").where("id", userId).first();
      const isAminId = isAdmin["id"];

      const getAllUserData = await this.knex("users")
        .select("username", "identity", "id")
        .whereNot("id", isAminId);
      return getAllUserData;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }
  async changeToTeacher(checkedDataArr: string[]) {
    try {
      let updatedUserId;
      for (let i = 0; i < checkedDataArr.length; i++) {
        const userData = await this.knex("users")
          .select("id", "identity")
          .where("username", checkedDataArr[i])
          .returning("*")
          .first();
        if (userData["identity"] === "student") {
          updatedUserId = await this.knex("users")
            .select("id")
            .update("identity", "teacher")
            .where("id", userData["id"])
            .returning("id");
          await this.knex
            .insert({
              teacher_image: "teacher_icon.png",
              teacher_description: "nothing",
              user_id: updatedUserId[0]["id"],
            })
            .into("teachers");
        } else {
          updatedUserId = await this.knex("users")
            .select("id")
            .update("identity", "student")
            .where("id", userData["id"])
            .returning("id");
          await this.knex("teachers").where("user_id", updatedUserId[0]["id"]).del();
        }
      }
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }

  async updateAdminInfo(fields: {}, userId: number) {
    try {
      const hashedPassword = await hashPassword(fields["password"]);
      const result = await this.knex("users")
        .update({ email: fields["email"], password: hashedPassword })
        .where("id", userId)
        .returning("*");
      return result;
    } catch (err) {
      logger.error(err.toString());
      return;
    }
  }
}
