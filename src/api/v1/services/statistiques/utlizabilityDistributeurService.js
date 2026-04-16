const prisma = require('../../../../config/dbConfig');
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

//---------Get id des distributeurs d'un client
const getIdDistributeurByIdClient = async (clientId) => {
    try {
        const IdDistributeurs = await prisma.Distributeur.findMany({
            where: {
                idClient: clientId
            },
            select: {
                id: true
            }
        });
        return IdDistributeurs;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};

//----------Get Nombre de commande BY id distributeur selon periode
const getNbCmdByIdDistributeurByPeriode = async (distributeurId, periode) => {
    try {

        const nombreCommandesInDistributeur = await prisma.Commande.count({
            where: {
                idDistributeur: distributeurId,
                date: {
                    gte: periode.dateDebutFormated,
                    lte: periode.dateFinFormated,
                },
            }
        });
        return nombreCommandesInDistributeur;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};

//---------Get nombre de commande dans chaque distributeur d'un client (By Id Client)
const getNbCmdInDistributeursByIdClientByPeriode = async (clientId, periode) => {
    try {

        const distributeurs = await prisma.Distributeur.findMany({
            where: {
                idClient: clientId
            },
            select: {
                id: true
            }
        });

        var NbCmdTotale = 0;
        for (const distributeur of distributeurs) {
            const nombreCommandes = await getNbCmdByIdDistributeurByPeriode(distributeur.id, periode);
            NbCmdTotale += nombreCommandes;
        }

        return NbCmdTotale;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};

//----------Get Nombre de transaction(paiement) BY id distributeur
const getNbPayByIdDistributeurByPeriode = async (distributeurId, periode) => {
    try {
        const distributeur = await prisma.Distributeur.findUnique({
            where: {
                id: distributeurId,
            },
            include: {
                Commande: {
                    include: {
                        Payment: true,
                    },
                    where: {
                        date: {
                            gte: periode.dateDebutFormated,
                            lte: periode.dateFinFormated,
                        },
                    },
                },
            },
        });

        if (distributeur && distributeur.Commande.length > 0) {
            const paiements = distributeur.Commande.flatMap(commande => commande.Payment);
            return paiements.length;
        }
        return 0;

    } catch (error) {
        return catchPrismaClientError(error);
    }
};

//---------Get nombre de Transaction (paiement) dans chaque distributeur d'un client (By Id Client)
const getNbPayInDistributeursByIdClientByPeriode = async (clientId, periode) => {
    try {
        const distributeurs = await prisma.Distributeur.findMany({
            where: {
                idClient: clientId
            },
            select: {
                id: true
            }
        });

        var NbTrTotale = 0;

        for (const distributeur of distributeurs) {
            const nombrePays = await getNbPayByIdDistributeurByPeriode(distributeur.id, periode);
            NbTrTotale += nombrePays;
        }
        return NbTrTotale;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};

//---------------Taux d'utilisation: get nb cmd dans chaque distributeur grouper selon region d'un client (Bu id client)
//Get by IdClient les distributeurs (nb_cmd, ou nb_transaction) selon regions, car taux d'utlisation = Taux d'utilisation = (Nombre de distributeurs utilisés / Nombre total de distributeurs) x 100 

const getIdDistributeursInRegionsByIdClientByPeriode = async (clientId, periode) => {
    try {
        const data = await prisma.distributeur.findMany({
            where: {
                idClient: clientId
            },
            select: {
                id: true,
                region: true
            }
        })
        const distributeurs = {}
        data.forEach(item => {
            const regionId = item.region.id;
            const regionNom = item.region.nom;

            if (distributeurs[regionId]) {
                distributeurs[regionId].Distributeur.push({ id: item.id });
            } else {
                distributeurs[regionId] = {
                    id: regionId,
                    nom: regionNom,
                    Distributeur: [{ id: item.id }]
                };
            }
        });

        const regions = Object.values(distributeurs);
        console.log(regions);
        for (const region of regions) {
            var NbDistributeursInRegion = 0, // nombre de distributeurs dans cette region, we need this infos, and it's useful ll comparaison taux d'utlisation de nombre totla ede commande comprablement à nombre de distributeurs dans cette region 
                NbCmdsRegion = 0,   // nbs commandes dans cette region
                NbPaysRegion = 0,   // nbs commandes dans cette region
                DistrUtliser = 0;   //taux d'ulisatiion = nb_cmd/nb_distr_totale

            for (const distributeur of region.Distributeur) {
                const nombreCommandes = await getNbCmdByIdDistributeurByPeriode(distributeur.id, periode);
                const nombrePays = await getNbPayByIdDistributeurByPeriode(distributeur.id, periode);

                if (nombreCommandes > 0) {
                    DistrUtliser++;
                    NbCmdsRegion += nombreCommandes;
                    NbPaysRegion += nombrePays;
                }
                distributeur.nb_cmd = nombreCommandes;
                distributeur.nb_transaction = nombrePays;
            }
            NbDistributeursInRegion = region.Distributeur.length;

            region.NbDistributeursInRegion = NbDistributeursInRegion;
            region.DistrUtliser = DistrUtliser;
            region.DistrNonUse = (NbDistributeursInRegion - DistrUtliser);
            region.NbCmdsRegion = NbCmdsRegion;
            region.NbTransactionsRegion = NbPaysRegion;
            region.NbCmdsPerDistr = (NbCmdsRegion / NbDistributeursInRegion);
        }

        return regions;
    } catch (error) {
        return catchPrismaClientError(error);
    }
};



module.exports = {
    getIdDistributeurByIdClient,

    getNbCmdByIdDistributeurByPeriode,
    getNbCmdInDistributeursByIdClientByPeriode,

    getNbPayByIdDistributeurByPeriode,
    getNbPayInDistributeursByIdClientByPeriode,

    getIdDistributeursInRegionsByIdClientByPeriode
}