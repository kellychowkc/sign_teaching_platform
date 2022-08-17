import { UserService } from "../../service/userService";
import { UserController } from "../userController";
import type { Knex } from "knex";
import type { Request, Response } from "express";
import { checkPassword } from "../../utility/hash";

jest.mock("../../service/userService");
jest.mock("../../utility/logger.ts");
jest.mock("../../utility/hash.ts")

describe("userService", () => {
  let service: UserService;
  let controller: UserController;
  let req: Request;
  let res: Response;

  beforeEach(() => {

    service = new UserService({} as Knex);
    service.logIn = jest.fn(() => Promise.resolve(
      {
        id: 2,
        username: "anna",
        password: "1234",
        first_name: "anna",
        last_name: "Hussell",
        email: "ahusselloc@latimes.com",
        phone_num: 81448569,
        identity: "student"
      },
    ))
    req = {
      params: {},
      query: {},
      body: {},
      session: {},
    } as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any as Response;
    (checkPassword as jest.Mock).mockResolvedValue(true);
    controller = new UserController(service);
  });

  it("logIn - failed with no password", async () => {
    req.body = { username: "anna" }
    await controller.logIn(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false, message: "invalid username/password" });
  });

  it("logIn - failed with no username", async () => {
    req.body = { password: "1234" }
    await controller.logIn(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ success: false, message: "invalid username/password" });
  });

  it("logIn - success", async () => {
    req.body = { username: "anna", password: "1234" }
    await controller.logIn(req, res);
    expect(service.logIn).toBeCalledTimes(1);
    expect(service.logIn).toBeCalledWith("anna");
    expect(res.json).toBeCalledWith({ success: true, message: "success", identity: "student" });
  });

});
