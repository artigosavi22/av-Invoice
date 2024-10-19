import { IUser } from "models/v1/IUser";
import { GeneralRepository } from "../../repository/v1/GeneralRepository";
import { IGeneralRepository } from "../../repository/v1/models/IGenaralRepository";

export class GeneralServices {
    private static instance: GeneralServices;
    private generalRepository: IGeneralRepository;

    constructor() {
        this.generalRepository = new GeneralRepository(); 
    }

    public static getInstance(): GeneralServices {
        if (!GeneralServices.instance) {
            GeneralServices.instance = new GeneralServices();
        }
        return GeneralServices.instance;
    }

    public async getBranches(): Promise<any> {
        try {
            return await this.generalRepository.getBranches();
        } catch (err) {
            throw err;
        }
    } 
}
