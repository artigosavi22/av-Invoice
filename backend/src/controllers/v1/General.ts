import { Response } from "express";
// import { Logger } from "../../config";

import { GeneralServices } from "../../services/v1/GeneralServices";
import { AuthenticatedRequest } from "../../models/v1/Generals";

const general = new GeneralServices();

async function getUser(req: AuthenticatedRequest, res: Response): Promise<any> {
  try {
    const data = await general.getUser(req.body);
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
}

export { getUser };
