import { Response } from "express";
// import { Logger } from "../../config";

import { GeneralServices } from "../../services/v1/GeneralServices";
import { AuthenticatedRequest } from "../../models/v1/Generals";

const general = new GeneralServices();


async function getBranches(req: AuthenticatedRequest, res: Response): Promise<any> {
  try {
    console.log("Hello");
    const data = await general.getBranches();
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
}

export { 
  getBranches
};
