import {  ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";


export class paginationDto{
    @ApiPropertyOptional()
    @IsOptional()
    page?: number = 1

    @ApiPropertyOptional()
    @IsOptional()
    limit?: number = 10
}