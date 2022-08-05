import { UserService } from "../../service/userService";
import { UserController } from "../userController";
import type { Knex } from "knex";
import type { Request, Response } from "express";

jest.mock("../../service/userService");

describe("userService", () => {
    let service: UserService;
    let controller: UserController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new UserService({} as Knex);
        controller = new UserController(service);
        req = {
            params: {},
            query: {},
            body: {}
        } as Request;
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as any as Response;
    })

    it("logIn - success",async () => {
        await controller.logIn(req,res);
        expect(service.logIn).toBeCalled();
        expect(res.json).toBeCalledWith({ message: "success" });
    })

    it("logIn - failed with error from service"), async ()=>{
        await controller.logIn(req,res);
        expect(service.logIn).toBeCalled();
        expect(res.json).toBeCalledWith({ success: false, message: "internal server error" });
    }
})

