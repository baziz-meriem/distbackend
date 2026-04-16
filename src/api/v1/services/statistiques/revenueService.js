const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getRevenueClient = async (id, period) => {
    try {
        const commandes = await prisma.commande.findMany({
            where: {
                distributeur: {
                    idClient: parseInt(id)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                }
            }
        })
        const montantTotal = commandes.reduce((acc, curr) => acc + curr.Payment[0].montant, 0)
        return montantTotal
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}

const getRevenueDistributeur = async (id, period) => {
    // get all the commandes with the id of the distribution
    try {
        const commandes = await prisma.commande.findMany({
            where: {
                distributeur: {
                    id: parseInt(id)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                }
            }
        })
        const montantTotal = commandes.reduce((acc, curr) => acc + curr.Payment[0].montant, 0)
        return montantTotal
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}
const getRevenueBoisson = async (id, clientId, period) => {
    try {
        // get all the commandes with the id of the boisson
        const commandes = await prisma.commande.findMany({
            where: {
                idBoisson: parseInt(id),
                distributeur: {
                    idClient: parseInt(clientId)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                }
            }
        })
        const montantTotal = commandes.reduce((acc, curr) => acc + curr.Payment[0].montant, 0)
        return montantTotal
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}

const getRevenueClientByDistributeur = async (id, period) => {
    try {
        const commandes = await prisma.commande.findMany({
            where: {
                distributeur: {
                    idClient: parseInt(id)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                idDistributeur: true,
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                }
            },
        })
        const sums = {};

        commandes.forEach(obj => {
            const idDistributeur = obj.idDistributeur;
            const montant = obj.Payment[0]?.montant || 0;

            if (sums[idDistributeur]) {
                sums[idDistributeur] += montant;
            } else {
                sums[idDistributeur] = montant;
            }
        });
        const result = Object.keys(sums).map(key => ({
            idDistributeur: parseInt(key),
            revenu: sums[key]
        }));
        return result
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}

const getRevenueClientByBoisson = async (id, period) => {
    try {
        const commandes = await prisma.commande.findMany({
            where: {
                distributeur: {
                    idClient: parseInt(id)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                idBoisson: true,
                boisson:{
                    select:{
                        label:true,
                    }
                },
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                }
            },
        })
        const sums = {};

        commandes.forEach(obj => {
            const idBoisson = obj.idBoisson;
            const montant = obj.Payment[0]?.montant || 0;

            if (sums[idBoisson]) {
                sums[idBoisson] += montant;
            } else {
                sums[idBoisson] = montant;
            }
        });
        const result = Object.keys(sums).map(key => ({
            idBoisson: parseInt(key),
            nom:commandes.find(commande=>commande.idBoisson===parseInt(key)).boisson.label,
            revenu: sums[key]
        }));
        return result
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}

const getRevenueClientByRegion = async (id, period) => {
    try {
        const commandes = await prisma.commande.findMany({
            where: {
                distributeur: {
                    idClient: parseInt(id)
                },
                date: {
                    gte: new Date(period.dateDebut),
                    lte: new Date(period.dateFin)
                }
            },
            select: {
                Payment: {
                    where: {
                        etat: 'réussi'
                    },
                    select: {
                        montant: true
                    }
                },
                distributeur:{
                    select:{
                        idRegion:true,
                        region:{
                            select:{
                                nom:true,
                            }
                        }
                    }
                    
                }
            },
        })
        const sums = {};

        commandes.forEach(obj => {
            const idRegion = obj.distributeur.idRegion;
            const montant = obj.Payment[0]?.montant || 0;

            if (sums[idRegion]) {
                sums[idRegion] += montant;
            } else {
                sums[idRegion] = montant;
            }
        });
        const result = Object.keys(sums).map(key => ({
            idRegion: parseInt(key),
            nom:commandes.find(commande=>commande.distributeur.idRegion===parseInt(key)).distributeur.region.nom,
            revenu: sums[key]
        }));
        return result
    } catch (error) {
        console.log(error)
        return catchPrismaClientError(error)
    }
}


module.exports = {
    getRevenueClient,
    getRevenueDistributeur,
    getRevenueBoisson,
    getRevenueClientByDistributeur,
    getRevenueClientByBoisson,
    getRevenueClientByRegion
}