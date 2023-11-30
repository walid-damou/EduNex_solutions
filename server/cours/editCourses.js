const db = require("../../config/database");

const { Cours } = db.models;
module.exports=async (req,res)=>{
const {id,nom,desc}  =req.body
	if(!id || !nom || !desc){

	return res.send({status:false,msg:"Error Empty Fields"})

	}
const cours= await Cours.findOne({
	 where:{
		id
	 }
})
	if(!cours){
return res.send({status:true,msg:"Course Not Found"})
	}
cours.set({
	nom:nom.trim(),description:desc
 }
)
await cours.save()

return res.send({status:true,msg:"Update Done"})



}
