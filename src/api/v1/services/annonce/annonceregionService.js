const prisma = require('../../../../config/dbConfig');

const getAllAnnonceRegions = async () => {
    try {
        const AnnonceRegions = await prisma.AnnonceRegion.findMany();
        return AnnonceRegions;
    } catch (error) {
        return null;
    }
};

const getOneAnnonceRegionByIdAnnonce = async (id) => {
    try {

        const AnnonceRegion = await prisma.AnnonceRegion.findMany({
            where: {
                idAnnonce: parseInt(id)
            }
        });
        return AnnonceRegion;
    } catch (error) {
        return null;
    }
}
const getOneAnnonceRegionByIdARegion = async (id) => {
    try {
        const AnnonceRegion = await prisma.AnnonceRegion.findMany({
            where: {
                idRegion: parseInt(id)
            }
        });
        return AnnonceRegion;
    } catch (error) {
        return null;
    }
}


const createAnnonceRegion = async ({ idAnnonce, idRegion, TypePayment, PrixAnnonce }) => {
    try {
        const AnnonceExists = await prisma.Annonce.findUnique({
            where: {
                id: parseInt(idAnnonce),
            },
        });
        if (AnnonceExists) {
            const RegionExists = await prisma.Region.findUnique({
                where: {
                    id: parseInt(idRegion),
                },
            });
            if (!RegionExists) { throw new Error('Region not found'); }
        }
        else {
            throw new Error('Annonce not found');
        }

        const AnnonceRegionExists = await prisma.AnnonceRegion.findFirst({
            where: {
                idAnnonce: parseInt(idAnnonce),
                idRegion: parseInt(idRegion)
            },
        });

        if (AnnonceRegionExists) {
            throw new Error('Annonce Region aleardy exsite');
        }

        const newAnnonceRegion = await prisma.annonceRegion.create({
            data: {
                annonce: {
                    connect: {
                        id: parseInt(idAnnonce)
                    }
                },
                region: {
                    connect: {
                        id: parseInt(idRegion)
                    }
                },
                TypePayment: TypePayment,
                PrixAnnonce: parseFloat(PrixAnnonce)
            }
        });
        return newAnnonceRegion;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

const updateAnnonceRegion = async ({ idAnnonce, idRegion }, { TypePayment, PrixAnnonce }) => {
    // check if the ID exists in the database

    const AnnonceExists = await prisma.Annonce.findUnique({
        where: {
            id: parseInt(idAnnonce),
        },
    });
    if (AnnonceExists) {
        const RegionExists = await prisma.Region.findUnique({
            where: {
                id: parseInt(idRegion),
            },
        });
        if (!RegionExists) { throw new Error('Region not found'); }
    }
    else {
        throw new Error('Annonce not found');
    }

    const AnnonceRegionExists = await prisma.AnnonceRegion.findFirst({
        where: {
            idAnnonce: parseInt(idAnnonce),
            idRegion: parseInt(idRegion)
        },
    });

    if (!AnnonceRegionExists) {
        throw new Error('Annonce Region not found');
    }

    try {
        const AnnonceRegion = await prisma.annonceRegion.update({
            where: {
                idAnnonce_idRegion: {
                    idAnnonce: parseInt(idAnnonce),
                    idRegion: parseInt(idRegion)
                },
            },
            data: {
                TypePayment: TypePayment,
                PrixAnnonce: parseFloat(PrixAnnonce)
            }
        });
        return AnnonceRegion;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

// incrementer nombre de vue d'une annonce
const incrementViews = async (idAnnonce, idRegion) => {
    try {
        const AnnonceRegionExists = await prisma.annonceRegion.findFirst({
            where: {
                idAnnonce: parseInt(idAnnonce),
                idRegion: parseInt(idRegion)
            },
        });

        if (AnnonceRegionExists == null) {
            const dafaultPrix = 0.0
            const defaultPaymentType = "fixe"

            createAnnonceRegion({ idAnnonce, idRegion, defaultPaymentType, dafaultPrix })
        }
        const annonceRegion = await prisma.annonceRegion.update({
            where: {
                idAnnonce_idRegion: {
                    idAnnonce: parseInt(idAnnonce),
                    idRegion: parseInt(idRegion)
                },
            },
            data:
            {
                NbVues:
                {
                    increment: 1,
                },
            },
        });
        return annonceRegion;
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
}

const deleteAnnonceRegion = async ({ idAnnonce, idRegion }) => {

    try {
        const AnnonceRegionExists = await prisma.AnnonceRegion.findFirst({
            where: {
                idAnnonce: parseInt(idAnnonce),
                idRegion: parseInt(idRegion)
            },
        });

        if (!AnnonceRegionExists) {
            throw new Error('Annonce Region not found');
        }

        const AnnonceRegion = await prisma.AnnonceRegion.delete({
            where: {
                idAnnonce_idRegion: {
                    idAnnonce: parseInt(idAnnonce),
                    idRegion: parseInt(idRegion)
                },
            },
        });

        return AnnonceRegion;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllAnnonceRegions,
    getOneAnnonceRegionByIdARegion,
    getOneAnnonceRegionByIdAnnonce,
    createAnnonceRegion,
    updateAnnonceRegion,
    deleteAnnonceRegion,

    incrementViews
}