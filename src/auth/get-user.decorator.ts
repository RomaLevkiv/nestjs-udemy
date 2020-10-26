import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator( (data: unknown, ctx: ExecutionContext): User => {
    console.log(ctx.switchToHttp());
    
    const request = ctx.switchToHttp().getRequest()
    return request.user
})