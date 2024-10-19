import { IGeneralRepository } from "./models/IGenaralRepository";
import { IUser } from "../../models/v1/IUser";
import { prisma } from "../../config";

export class GeneralRepository implements IGeneralRepository {

  async getBranches(): Promise<any[]> {
    return await prisma.av_branches_t.findMany();
  }
}
