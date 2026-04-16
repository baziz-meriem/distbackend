const { createCategorie, deleteCategorie, getCategorieById, getAllCategories, updateCategorie  } = require('../../services/annonce/categorieService');
const {  validateId } = require('../../validators/inputValidation');

const getAllHandler = async (req, res) => {
    const Categories = await getAllCategories();
    return res.status(200).json({ status: 'success', data: Categories });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    const Categorie = await getCategorieById(valideId);
    if (!Categorie) {
        return res.status(404).json({ status: 'Not Found', message: 'Categorie not found' });
    }
    return res.status(200).json({ status: 'success', data: Categorie });
}

const postHandler = async (req, res) => {

    const { sexe, TrancheAge} = req.body
    
    const newCategorie = await createCategorie( { sexe, TrancheAge} );
    if( !newCategorie )
    {
        return res.status(400).json({ status: 'Bad Request', message: newCategorie });
    }

    return res.status(201).json({ status: 'success', data: newCategorie });
}

const putHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);

    const { sexe, TrancheAge} = req.body


    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const updatedCategorie = await updateCategorie(valideId, { sexe, TrancheAge} );
    if( !updatedCategorie  )
    {
        return res.status(400).json({ status: 'Bad Request', message: updatedCategorie });
    }
    return res.status(200).json({ status: 'success', data: updatedCategorie });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedCategorie = await deleteCategorie(valideId);
    if( !deletedCategorie )
    {
        return res.status(400).json({ status: 'Bad Request', message: deletedCategorie });
    }
    return res.status(200).json({ status: 'success', data: deletedCategorie });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}