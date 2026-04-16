const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllBoisson = async () => {
    try {
        const boissons = await prisma.boisson.findMany({});
        return boissons; //array of boissons
    } catch (error) {
        console.log(error)
        return (catchPrismaClientError(error));
    }
}

//get all drinks label desc price and availability of a specific dispenser
const getAll = async (id) => {
    try {
        const boissons = await prisma.boissonDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
            },
            select: {
              boisson: true,
              prix: true,
              disponible : true,
            },
          });
          
        return boissons; //array of boissons
    } catch (error) {
        console.log(error)
        return (catchPrismaClientError(error));
    }
}
const getAllAvailable = async (id) => {
    try {
        const boissons = await prisma.BoissonDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
              disponible: true,
            },
            select: {
             
              prix: true,
            },
          });
        return boissons; //array of boissons
    } catch (error) {
        console.log(error)
        throw new Error('Error getting drinks');
    }
}



const getboissonById = async ( distributeurId,boissonId) => {
    try {
      const boisson = await prisma.BoissonDistributeur.findUnique({
        where: {
          idBoisson_idDistributeur: {
            idBoisson: parseInt(boissonId),
            idDistributeur: parseInt(distributeurId),
          },
        },
        select: {
          
          prix: true,
        },
      });
      
      return boisson;
    } catch (error) {
      console.log(error);
      return (catchPrismaClientError(error));
    }
  };
  

  const createboisson = async (label, description) => {
    try {
        const boisson = await prisma.Boisson.create({
            data: {
                label: label,
                description: description
            },
            select: {
                id: true,
                label: true,
                description: true
            }
        });
        return boisson;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
        
    }
}

const createboissonDistributeur = async (distributeurId,boissonId,prix) => {
    try {
        const boissonDistributeur = await prisma.boissonDistributeur.create({
            data: {
                idDistributeur: parseInt(distributeurId),
                idBoisson: parseInt(boissonId),
                prix: parseFloat(prix),
                disponible: true
            },
            select: {
                idDistributeur: true,
                idBoisson: true,
                prix: true,
                boisson: {
                    select: {
                        id: true,
                        label: true,
                        description: true,
                    }
                }
            }
        });
        return boissonDistributeur;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}


const deleteboisson = async (distributeurId,boissonId) => {
    try {
        const deletedboisson =await prisma.BoissonDistributeur.delete({
          where: {
            idBoisson_idDistributeur: {
              idBoisson: parseInt(boissonId),
              idDistributeur: parseInt(distributeurId),
            },
          },
            select: {
              idDistributeur: true,
              idBoisson: true,
              prix: true,
              boisson: {
                  select: {
                      id: true,
                      label: true,
                      description: true,
                  }
              }
          }
        });
        return deletedboisson;
    } catch (error) {
      return (catchPrismaClientError(error));
    }
}

const deleteAllboisson = async (id) => {
    try {
        const deletedboisson =await prisma.Boisson.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label:true,
                description:true
            }
        });
        return deletedboisson;
    } catch (error) {
        return null;
    }
}


const updateboisson = async (distributeurId,boissonId,label,description,prix,disponible) => {

    try {
        const updatedBoisson = await prisma.Boisson.update({
            where: {
                id: parseInt(boissonId)
            },
            data: {
                label:label,
                description: description
            }
        });

        const updatedBoissonDistributeur = await prisma.BoissonDistributeur.update({
          where: {
            idBoisson_idDistributeur: {
              idBoisson: parseInt(boissonId),
              idDistributeur: parseInt(distributeurId),
            },
          },
          data: {
            prix: prix,
            disponible: disponible,
          },
          select: {
            idDistributeur: true,
            idBoisson: true,
            prix: true,
            boisson: {
                select: {
                    id: true,
                    label: true,
                    description: true,
                    }
                  }
                }
        });
        if (updatedBoisson.count === 0 || updatedBoissonDistributeur.count === 0) return null
        else return 1  ;
    } catch (error) {
        console.log(error)
        return (catchPrismaClientError(error));
    }
}

module.exports = { getAllBoisson,getAll,getAllAvailable, getboissonById, createboisson,createboissonDistributeur, deleteboisson,deleteAllboisson, updateboisson }