
import logger from "@logger";
import { PoolClient } from "pg";
import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from "@db/helpers/query_execution";
const TAG = 'data_store_mysql_lib_task';

export async function checkTaskTitleExist(connection : PoolClient,title : string): Promise<any> {
    logger.info(`${TAG}.checkTaskTitleExist()`);
    try{
        const query : string = `select * from tasks where title ILIKE '%${title}%' and completed_at IS NULL`;
        const result = await fetchRecord(connection, query, [])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.checkTaskTitleExist()`, error);
        throw error;
    }
}

export async function checkTaskIdExist(connection : PoolClient, taskId : number) : Promise<any>{
    logger.info(`${TAG}.checkTaskIdExist()`);
    try{
        const query : string = `select * from tasks where task_id = $1`;
        const result = await fetchRecord(connection, query, [taskId]);
        return result;
    }catch(error){
        logger.error(`Error occured in ${TAG}.checkTaskIdExist()`, error);
        throw error;
    }
}

export async function saveTask(connection : PoolClient, task) : Promise<any>{
    logger.info(`${TAG}.saveTask()`);
    try{
        const query : string = `INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3)`
        const result = await saveRecord(connection, query, [
            task.title,
            task.description,
            task.dueDate
        ])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveTask()`, error);
        throw error;
    }
}

export async function getTasks(connection : PoolClient, search? : string): Promise<any> {
    logger.info(`${TAG}.getTasks()`);
    try{
        let query : string = `select * from tasks`
        if(search){
            query = query + ` WHERE title ILIKE '%${search}%' OR description ILIKE '%${search}%'`
        }
        
        const result = await fetchRecords(connection, query, [])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.getTasks()`, error);
        throw error;
    }
}

export async function updateTask(connection : PoolClient, task : any, taskId : number) : Promise<any>{
    logger.info(`${TAG}.updateTask()`);
    try{
        const query : string = `UPDATE tasks SET title = $1, description = $2, due_date = $3, updated_at = NOW() WHERE task_id = $4`
        const result = await updateRecord(connection, query, [
            task.title,
            task.description,
            task.dueDate,
            taskId 
        ])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateTask()`, error);
        throw error;
    }
}

export async function updateTaskStatus(connection : PoolClient, taskId : number, taskStatus : string) : Promise<any>{
    logger.info(`${TAG}.updateTaskStatus()`);
    try{
        const query : string = `UPDATE tasks SET status = $1, completed_at = NOW() WHERE task_id = $2`
        const result = await updateRecord(connection, query, [
            taskStatus,
            taskId 
        ])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateTaskStatus()`, error);
        throw error;
    }

}

export async function deleteTask(connection : PoolClient, taskId : number) : Promise<any>{
    logger.info(`${TAG}.deleteTask()`);
    try{
        const query : string = `DELETE FROM  tasks  WHERE task_id = $1`
        const result = await deleteRecord(connection, query, [
            taskId 
        ])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteTask()`, error);
        throw error;
    }
}