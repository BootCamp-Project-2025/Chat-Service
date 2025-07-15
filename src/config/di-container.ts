import { container } from "tsyringe";
import ApiClient from "../infrastructure/http/ApiClient";

container.register("ApiClient", {
  useValue: new ApiClient(
    process.env.API_BASE_URL || "http://localhost:300/api"
  ),
});
