import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (ZodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction)=>{
    try {
     
        if(req.body.data){
            req.body = JSON.parse(req.body.data)
        }
        req.body =  await ZodSchema.parseAsync(req.body)
        next()
    } catch (error) {
        next(error)
    }
}