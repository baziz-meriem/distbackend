const prisma= require('../../../../config/dbConfig');

const createTentativeVol=async (idDistributeur,position)=>{
    try{
        const tentativeVol= await prisma.tentativeVol.create({
            data:{
                idDistributeur:parseInt(idDistributeur),
                type:position
            }
        });
        return tentativeVol;
    }catch(error){
        console.log(error);
        return null;
    }
}

module.exports={createTentativeVol};