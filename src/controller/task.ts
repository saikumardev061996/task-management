import { IServiceResponse } from '@models';
import {NextFunction, Response} from 'express'
import * as Service from '@service/taskMangement'
import { responseBuilder } from '@helpers/response_builder';
import logger from '@logger';
const TAG = 'controller.task';

export async function saveTask(req: any, res : Response, next : NextFunction) : Promise<void>{
    try{
        logger.info(TAG + "saveTask()");
        const response : IServiceResponse = await Service.saveTask(req.body);
        responseBuilder(response, res, next, req);
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveTask()`, error);
        next(error)
    }
}

export async function getTasks(req: any, res : Response, next : NextFunction) : Promise<void>{
    try{
        logger.info(TAG + "getTasks()");
        const response : IServiceResponse = await Service.getTasks();
        responseBuilder(response, res, next, req);
    }catch(error){
        logger.error(`Error occured in ${TAG}.getTasks()`, error);
        next(error)
    }
}