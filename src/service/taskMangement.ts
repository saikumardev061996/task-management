import { IServiceResponse, ServiceResponse } from "@models";
import logger from "@logger";
import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection } from "@db/helpers/transaction";
import{Task} from '@db/queries'
const TAG = 'service.taskMangements';

export async function saveTask(task:any) {
    logger.info(TAG + '.saveTask()');
    const serviceResponse : IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, "Task added successfully");
    let connection = null;
    try{
        connection = await getConnection();
        const isTitleExist = await Task.checkTaskTitleExist(connection,task.title)
        if(isTitleExist){
            serviceResponse.addBadRequestError('Title alredy exist');
            return serviceResponse;
        }
        if(!task.dueDate) {
            task.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }
        const taskDetails = await Task.saveTask(connection, task);
        serviceResponse.data = {'taskDetails' : taskDetails}
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveTask()`, error);
        serviceResponse.addBadRequestError('Failed to save task due to tech difficulties');

    }finally{
        await releaseConnection(connection);
    }
    return serviceResponse

}
export async function getTasks() {
    logger.info(TAG + '.saveTask()');
    const serviceResponse : IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "Task details fetched  successfully");
    let connection = null;
    try {
        connection = await getConnection();
        const taskDetails = await Task.getTasks(connection);
        const tasks = taskDetails.map(task => {
            let status = 'Pending';
            const taskDueDate = new Date(task.due_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            taskDueDate.setHours(0, 0, 0, 0);

            if (task.completed_at) {
                status = 'Completed';
            } else if (taskDueDate < today) {
                status = 'Overdue';
            } else if (taskDueDate.getTime() === today.getTime()) {
                status = 'Due Today';
            }
            return { ...task, status };
        });
        serviceResponse.data = tasks;
    }catch(error){
        logger.error(`Error occured in ${TAG}.getTasks()`, error);
        serviceResponse.addBadRequestError('Failed to save task due to tech difficulties');

    }finally{
        await releaseConnection(connection);
    }
    return serviceResponse
    
}