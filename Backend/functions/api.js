import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import {connectDb, callUser} from '../sever'
const api = express();
const router = express.Router();

router.get('/hello', (req, res) =>{
    connectDb()
    callUser()
}
 );

api.use('/.netlify/functions/api', router);

module.exports.handler = serverless(api);