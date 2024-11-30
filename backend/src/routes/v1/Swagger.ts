
import { Router } from "express";
import swaggerAuth from "../../middlewares/v1/SwaggerAuthMiddleware";
import swaggerUi from "swagger-ui-express";
import { SwaggerService } from "../../services/v1/SwaggerService";

const swaggerservice = new SwaggerService();
const router =Router();
router.use(
    "/swagger",
    swaggerAuth,
    swaggerUi.serve,
    swaggerservice.setupSwagger()
  );

export default router;