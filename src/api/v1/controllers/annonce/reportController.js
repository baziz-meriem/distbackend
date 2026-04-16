const { getReportAnnonces } = require("../../services/annonce/reportService");
const generatePDFReport = require('../../helpers/reportGenerator');
const { execSync } = require('child_process');

const generateReport = async (req, res) => {
  try {
    const { id } = req.params;

    const reportData = await getReportAnnonces(id);
    if (!reportData) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Error while retrieving Report Data',
      });
    }

  
    // Generate the PDF report
    const pdfBuffer = await generatePDFReport(reportData);

    // Set up the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Contract_Report.pdf"');

    // Send the PDF as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).send('Error generating PDF report: ' + error.message);
  }
};

module.exports = {
  generateReport,
};
