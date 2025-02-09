
import log from '@logger';
import { getMongoConnection } from '@mongodb/helpers/database';
import {connectionPool} from '@db/helpers/database';
import initializeRoutes from '@routes/initializer';
import { Application } from 'express';
import serverLoader from './server';


export async function initializeApp(app: Application) {
    try {
        // await getMongoConnection();
        await connectionPool();
        serverLoader(app);
        initializeRoutes(app);
    } catch (error) {
        log.error('ERROR occurred in initializeApp().', error);
        throw error;
    }
}
