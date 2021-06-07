import express from 'express';
import cors from 'cors';
// const knex = require('knex')
import knex from 'knex';

const db = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'Password@123',
      database : 'smartbrain'
    }
  });
db.select('*').from("users").then(data=>{
    console.log(data)})
.catch((er)=>{
    console.log(er,"errrrrrrr")
})

  const app = express();
//middelware
app.use(express.json());
app.use(cors());

const database = {
   users : [
    {
        id:'123',
        name:"john",
        email:"john@gmail.com",
        password:"cookies",
        entries:0,
        joined:new Date()

    },
    {
        id:'124',
        name:"sally",
        email:"sally@gmail.com",
        password:"password",
        entries:0, 
        joined:new Date()

    }
],
login:[
    {
        id:'987',
        hash:'',
        email:"john@gmail.com"
    }
]
}

app.get('/',(req,res)=>{
    res.send(database.users);
    
})

app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email && 
       req.body.password===database.users[0].password)
       {
        // res.json('success');
        res.json(database.users[0]);
    }else{
        res.status(400).json('failure');
    }
})

app.post('/register',(req,res)=>{
    const {email,name , password} = req.body;
    // database.users.push({
    //     id:'125',
    //     name:name,
    //     email:email,
    //     entries:0,
    //     joined: new Date()
    // })

    db('users').insert({
        name:name,
        email:email,
        joined:new Date()
    }).then(response=>{
        
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id===id){
            found=true;
           return res.send(user)
        }
        
    });
    if(!found){
        res.status(400).json('not found')
    }
})

app.put('/image',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id===id){
            found=true;
            user.entries++;
           return res.json(user.entries)
        }
        
    });
    if(!found){
        res.status(400).json('not found')
    }
})

app.listen(3001);

// '/' ===> root it is working 
// '/signin'===> Post - success/failure
// '/register' ==> Post - user
// '/profile/:id ==> get - user
// '/image ==>put-to inc enteries-entries
