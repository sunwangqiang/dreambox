import * as express from 'express';
const app = express();
import { userAdmin, UserInfo } from '../../modules/useradmin';


function getDreamTreeSubcribers(req, res, next)
{
    userAdmin.listUser().then((userInfo)=>{
        return res.status(200).end(JSON.stringify(userInfo));
    });
}

app.get('/api/DreamTree/Subcribers', getDreamTreeSubcribers);

module.exports = app;