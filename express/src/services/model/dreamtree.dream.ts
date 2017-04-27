import * as express from 'express';
const app = express();
import { UserInfo } from '../../interface/user.info'
import { DreamDB } from '../../modules/database';

function getDreamTreeSubcribers(req, res, next)
{
  let sess = req.session as any;
  let userInfo: UserInfo = req.query;
  
  console.log(userInfo);

  if (!userInfo || !userInfo.username) {
    return res.status(400).end("wrong request, miss dst username\n");
  }

  if(userInfo.username !== sess.username as string){
    console.log('watch others database');
  }

  //get object info from backend database
  console.log("get ", req.originalUrl);

  DreamDB.get(req.originalUrl, sess.username, userInfo.username).then((value)=>{
    return res.status(200).end(value);
  });

}

app.get('/DreamTree/:id/Dream/:id', getDreamTreeSubcribers);

module.exports = app;