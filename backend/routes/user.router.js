const { Router } = require("express");
const { UserModel } = require("../models/user.model");

const usersRoutes = Router();

usersRoutes.get("/", (req, res) => {
  res.send("amit");
});

usersRoutes.post("/addusers", async (req, res) => {

  try{
    let users= (req.body.results)
    // console.log(users)
    
    for(let i=0; i<users.length; i++){
        const user =await new UserModel({
            photo: users[i].picture.large,
            firstName: users[i].name.first,
            lastName: users[i].name.last,
            gender: users[i].gender,
            email: users[i].email,
            country: users[i].location.country,
            city: users[i].location.city
          });
          // console.log(user)
          await user.save();
    }

  res.status(200).send("added");
  }catch(err){
     res.status(400).send({Error:"Try after sometging"})
  }
    
});





usersRoutes.delete("/delete",async(req,res)=>{
  try{
     let x= await UserModel.deleteMany()
     if(x.acknowledged){

       res.status(200).send("deleted")
     }else{
      res.status(400).send({Error: "Something Error"})
     }
  }
  catch(err){

  }
})


usersRoutes.get("/getdata",async(req,res)=>{

  let pageNumber = req.query.page || 1;
  let {gender,country,search}= req.query
    // console.log(req.query)
    if(search){
      let allusers=await UserModel.find({firstName
        :req.query.search}) .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
    .limit(10);
  return  res.send(allusers)
    }
    let allusers=await UserModel.find(req.query) .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
    .limit(10);

    // console.log(allusers)
    let totalPages= await UserModel.find(req.query).count()
    totalPages= Math.ceil(totalPages/10)
    // console.log(totalPages)
    res.status(200).send({allusers,totalPages})
})

usersRoutes.get("/country",async(req,res)=>{
  let country= []
  let allusers=await UserModel.find()
  for(let i=0; i<allusers.length; i++){
    if(!country.includes(allusers[i].country)){
      country.push(allusers[i].country)
    }
  }
  // console.log(country)
  res.send(country)
})





module.exports={
    usersRoutes
}