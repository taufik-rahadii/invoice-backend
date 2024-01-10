import { ArgsType } from "@nestjs/graphql";
import { CreateServiceDto } from "./create-service.dto";

@ArgsType()
export class UpdateServiceDto extends CreateServiceDto {}