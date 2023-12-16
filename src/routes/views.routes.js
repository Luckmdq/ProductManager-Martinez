import { Router } from "express";

const views=Router();
let data={};

views.get('/', (req,res)=>{
    data={title:"home"}
    return res.render("home",data);
})

views.get('/realtimeproducts', (req,res)=>{
    data={title:"productos"}
    return res.render("realTimeProducts",data);
})


export default views