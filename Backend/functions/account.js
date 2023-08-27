//User related logic

import express, { Router } from 'express';
import { call } from 'function-bind';
import serverless from 'serverless-http';
import Auth from '../src/auth.js'

let api = express();
api.use(express.json()) 
const router = express.Router();

router.post('/signup', (req, res) =>{
    //let j=JSON.parse(JSON.stringify(req.body))
    let jsonReq=req.body
    console.log("geting data "+jsonReq+" "+" "+jsonReq.username)
    let dbServer= new Auth()
    dbServer.createUser(jsonReq,res)
}
 );

api.use('/.netlify/functions/account', router);

module.exports.handler = serverless(api);