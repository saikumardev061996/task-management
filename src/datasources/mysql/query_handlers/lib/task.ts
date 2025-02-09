
import logger from "@logger";
import { PoolClient } from "pg";
import { fetchRecord, fetchRecords, saveRecord } from "@db/helpers/query_execution";
const TAG = 'data_store_mysql_lib_task';

export async function checkTaskTitleExist(connection : PoolClient,title : string): Promise<any> {
    logger.info(`${TAG}.checkTaskTitleExist()`);
    try{
        const query : string = `select * from task where title ILIKE '%${title}%'`;
        const result = await fetchRecord(connection, query, [])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.checkTaskTitleExist()`, error);
        throw error;
    }
}

export async function saveTask(connection : PoolClient, task) : Promise<any>{
    logger.info(`${TAG}.saveTask()`);
    try{
        const query : string = `INSERT INTO task (title, description, due_date) VALUES ($1, $2, $3)`
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

export async function getTasks(connection : PoolClient): Promise<any> {
    logger.info(`${TAG}.getTasks()`);
    try{
        const query : string = `select * from task`;
        const result = await fetchRecords(connection, query, [])
        return result
    }catch(error){
        logger.error(`Error occured in ${TAG}.getTasks()`, error);
        throw error;
    }
}