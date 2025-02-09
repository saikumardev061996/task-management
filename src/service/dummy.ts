import { HttpStatusCodes } from "@constants/status_codes";
import logger from "@logger";
import { IServiceResponse, ServiceResponse } from "@models";


const TAG = 'services.dummy';

export async function getDummy(): Promise<IServiceResponse> {
    logger.info(TAG + '.getDummy');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Data fetched successfull");
    try {
        serviceResponse.data = {"message": "dummy"};
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getDummy() `, error);
        serviceResponse.addServerError(`Failed to fetch data due to tech difficulties`);
    }
    return serviceResponse;
}