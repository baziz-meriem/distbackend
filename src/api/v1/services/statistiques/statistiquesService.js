const prisma = require('../../../../config/dbConfig');

const getFixedPannesByMonth = async (req, res) => {
  try {
    const am = Number(req.params.idAM);
    const year = Number(req.params.year);
    const pannesByMonth = await prisma.$queryRaw`
      SELECT to_char("dateFinTraitement", 'Month') AS month, COUNT(*) AS count
      FROM "Tache" JOIN "Anomalie" on "Tache"."idAnomalie" = "Anomalie"."id"
      WHERE EXTRACT(YEAR FROM "dateFinTraitement") = ${year} and "Tache"."idAM" = ${am}
      GROUP BY month
    `;
    // Convert bigInt values to number
    const pannesByMonthString = pannesByMonth.map(({ month, count }) => ({
      month: month,
      count: Number(count),
    }));

    return pannesByMonthString;

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error in getFixedPannesByMonth' });
  }
};


const getFixedPannesByYear = async (req,res) => {
  try {
    const am = Number(req.params.idAM)    
    const pannesByYear = await prisma.$queryRaw`
      SELECT to_char("dateFinTraitement", 'YYYY') AS year, COUNT(*) AS count
      FROM "Tache" JOIN "Anomalie" on "Tache"."idAnomalie" = "Anomalie"."id" 
      WHERE "Tache"."idAM" = ${am}
      GROUP BY year
    `;
    // Convert bigInt values to number
    const pannesByYearString = pannesByYear.map(({ year, count }) => ({
      year: year,
      count: Number(count),
    }));

    const seenObjects = new Set();
    // Convert the result to a string using a replacer function that removes circular references
    const jsonString = JSON.stringify(pannesByYearString, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seenObjects.has(value)) {
          return;
        }
        seenObjects.add(value);
      }
      return value;
    });


    return JSON.parse(jsonString); //to convert json string to an object

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error in getFixedPannesByMonth' });
  }

}

const getFixedPannesByWeek = async (req, res) => {
  try {
    const am = Number(req.params.idAM)    
    const year = Number(req.params.year)
    const pannesByWeek = await prisma.$queryRaw`
      SELECT to_char("dateFinTraitement", 'IW') AS week, COUNT(*) AS count
      FROM "Tache" JOIN "Anomalie" on "Tache"."idAnomalie" = "Anomalie"."id" 
      WHERE EXTRACT(YEAR FROM "dateFinTraitement") = ${year} and "Anomalie"."idTypeAnomalie" = 1 and "Tache"."idAM" = ${am}
      GROUP BY week
    `;
    // Convert bigInt values to number
    const pannesByWeekString = pannesByWeek.map(({ week, count }) => ({
      week: week,
      count: Number(count),
    }));

    const seenObjects = new Set();
    // Convert the result to a string using a replacer function that removes circular references
    const jsonString = JSON.stringify(pannesByWeekString, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seenObjects.has(value)) {
          return;
        }
        seenObjects.add(value);
      }
      return value;
    });


    return JSON.parse(jsonString); //to convert json string to an object

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error in getFixedPannesByMonth' });
  }
};



  
  
  

module.exports = {
    getFixedPannesByMonth,
    getFixedPannesByYear,
    getFixedPannesByWeek
}