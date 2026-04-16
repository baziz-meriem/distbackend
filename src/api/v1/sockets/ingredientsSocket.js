const {updateProductDistributeur,getProductByLabel}= require('../services/resourceManagement/produitService');

const waterHandler=async (socket,data)=>{
        product = await getProductByLabel("water")   
        //console.log('product got from bdd',product)
if(product ){
        const updatedata = {
                "quantite":parseFloat(data.water),
                "label": product.label
              };
        const id = product.id
        await updateProductDistributeur(1,id,updatedata);//I assume the Distributeur we have is Distributeur1        
        }
        else console.log("err updating water level in db")
}
const sugarHandler=async (socket,data)=>{

        product = await getProductByLabel("sugar")   
        console.log('product got from bdd',product)
        
if(product.id ){
        const updatedata = {
                "quantite":parseFloat(data.sugar),
                "label": product.label
              };
        const id = product.id
        await updateProductDistributeur(1,id,updatedata);//I assume the Distributeur we have is Distributeur1
        }
       else console.log("err updating sugar level in db")
}
const milkHandler=async (socket,data)=>{
        product = await getProductByLabel("milk")   
        //console.log('product got from bdd',product)
if(product ){
        const updatedata = {
                "quantite":parseFloat(data.milk),
                "label": product.label
              };
        const id = product.id
        await updateProductDistributeur(1,id,updatedata);//I assume the Distributeur we have is Distributeur1        
        }
        else console.log("err updating milk level in db")
}
const coffeeHandler =async (socket,data)=>{
        product = await getProductByLabel("coffee")   
        //console.log('product got from bdd',product)
if(product ){
        const updatedata = {
                "quantite":parseFloat(data.coffee),
                "label": product.label
              };
        const id = product.id
        await updateProductDistributeur(1,id,updatedata);//I assume the Distributeur we have is Distributeur1        
        }
       else  console.log("err updating coffee level in db") 
}

module.exports = {
    waterHandler,
    milkHandler,
    sugarHandler,
    coffeeHandler};