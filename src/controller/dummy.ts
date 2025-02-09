import logger from '@logger';
import { IServiceResponse } from '@models';
import { NextFunction, Response } from 'express';
import * as service from '@service/dummy';
import { responseBuilder } from '@helpers/response_builder';


const TAG = 'controller.dummy';

export async function getDummy(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + ".getDummy");
        const response: IServiceResponse = await service.getDummy();
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getDummy() `, error);
        next(error);
    }
}