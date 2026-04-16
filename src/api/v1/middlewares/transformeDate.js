//----convertir une chaine de caratere sous forme (AAAA-MM-DD) en instance de type date accepter par prisma
function convertDate( dateString ) {
    if( dateString != null)
    {
        const [year, month, day] = dateString.split('-');
        return new Date(year, month - 1, day);
    }
    else return null;
}

module.exports = { convertDate };