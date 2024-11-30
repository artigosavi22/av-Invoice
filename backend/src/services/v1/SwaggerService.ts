import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

export class SwaggerService {
    private swaggerDocument :any;
    constructor(){
        this.swaggerDocument = JSON.parse(
            fs.readFileSync(path.join(__dirname,"../../swagger/V1_swagger.json"), "utf-8")
        );

        this.swaggerDocument.serve= [
            {
                url:process.env.BACKEND_URL
            }
        ];
    }

    public setupSwagger(){
        return swaggerUi.setup(this.swaggerDocument);
    }
}