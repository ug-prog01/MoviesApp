import {dbConnection,executeQuery} from '../connections.js'
import Constants from '../constants.js'
class Auth{

    constructor(){
        this.API_KEY='api_key=2e65e5f5c5ba081b6ec96ea651bafe73';
        this.Request_API_URL="https://api.themoviedb.org/3/authentication/token/new"
    }

    createUser(req,res){
        console.log("server "+req+" "+req.username+" "+req.password)
        let userName=req.username
        let pass=req.password
        let email=req.email
        console.log("server "+req+" "+userName+" "+pass)
        let query_st=`insert into users (username,email,pass) values ("${userName}","${email}","${pass}")`
        executeQuery(query_st).then((data)=>{
            
                fetch(this.Request_API_URL+this.API_KEY).then(res=>{
                    console.log(res)
        }).catch((error)=>{
            console.log('error',error)
            return error;
        });

        })
        
        
        // var query = dbConnection.query(query_st, function (err, result) {
        //   if (err) {
        //     console.log(err.toString());
        //     res.status(500).send(err.toString());
        //   } else {
        //     console.log(result)
        //     res.json(result); 
        //     console.log("user created")
            
        //   }
        //});
        let sessionId=this.getSessionId(email)
      }
    
      getSessionId(){
        console.log("creating session Id")
      }
      getAllUser(res) {
        var query = this.con.query('SELECT * from Users', function (err, result) {
          if (err) {
            console.log(err.toString());
            res.status(500).send(err.toString());
          } else {
            console.log(result)
            res.json(result);
            
          }
        });
      }
}
module.exports=Auth