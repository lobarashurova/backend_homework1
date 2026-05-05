console.log("SERVER FILE LOADED");
const express=require('express');
const usersApp=express();
usersApp.use(express.json());


usersApp.use((req, resp, next)=>{
    console.log(`method type :: ${req.method} :\n: body:`, req.body);
    next();
});


console.log("SERVER FILE LOADED2");

let users=[
    {"name": "Yorqinjon aka", 
     "role": "Backend mentor",
     "age": 99
    }
];

usersApp.post('/users', (req, resp)=>{
if(!req.body.name || !req.body.role){
    return resp.status(400).json({"error_message": "name and role are required fields"});
}
    const newUser={
        "name": req.body.name,
        "role": req.body.role,
        "age": req.body.age
    };
    users.push(newUser);
    resp.status(201).json(newUser);
});

console.log("SERVER FILE LOADED3");

usersApp.get('/users', (req, resp)=>{
    resp.json(users);
});


usersApp.get('/slow-users', (req, resp)=>{
    setTimeout(()=>{ resp.json(users);}, 2000);
});


usersApp.get('/users/:role',  (req, resp)=>{
    const role=req.params.role;
    const filteredUsers=users.filter(user=>user.role===role);
    resp.json(filteredUsers);
});

usersApp.listen(3000, ()=>{
    console.log("Hehey uje you are full backend dev, ukajon");
});
