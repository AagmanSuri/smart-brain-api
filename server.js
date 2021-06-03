import express from 'express';

const app = express();
//middelware
app.use(express.json());


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
]
}

app.get('/',(req,res)=>{
    res.send(database.users);
    
})

app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email && 
       req.body.password===database.users[0].password)
       {
        res.json('success');
    }else{
        res.status(400).json('failure');
    }
})

app.post('/register',(req,res)=>{
    const {email,name , password} = req.body;
    database.users.push({
        id:'125',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined: new Date()
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

app.listen(3000);

// '/' ===> root it is working 
// '/signin'===> Post - success/failure
// '/register' ==> Post - user
// '/profile/:id ==> get - user
// '/image ==>put-to inc enteries-entries
