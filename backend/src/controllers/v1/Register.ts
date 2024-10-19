import { Response } from "express";
// import { Logger } from "../../config";
// import { User } from "../../services/v1/User";
import { AuthenticatedRequest } from "../../models/v1/Generals";

// const userServices = new User();


async function register(req: AuthenticatedRequest, res: Response): Promise<any> {
  try {
    // const data = await userServices.getBranches();
    res.status(200).json();
  } catch (error) {
    throw error;
  }
}

export { 
    register
};
