const pdf = require('html-pdf');


function generatePDFReport(data) {
  return new Promise((resolve, reject) => {
    try {
 
      // HTML template for the PDF report
      const htmlTemplate = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                color: #333;
                padding: 20px;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
              }
              th {
                background-color: #ddd;
              }
              td.price {
                font-weight: bold;
              }
              p.last-sentence {
                font-size: 18px;
                margin-top: 40px;
              }
            </style>
          </head>
          <body>
            <h1>CONTRAT PUBLICITAIRE</h1>
            <table>
              <tr>
                <th>Ad Company</th>
                <th>NbVues</th>
                <th>Price per Region</th>
                <th>Total Price for Regions</th>
              </tr>
              ${data
                .map(
                  (item) => `
                  <tr>
                    <td>${item.annonce.nomAnnonceur}</td>
                    <td>${item.annonce.annonceRegions[0].NbVues}</td>
                    <td>
                      <ul>
                        ${item.annonce.annonceRegions
                          .map((region) => {
                            const totalPrice = region.TypePayment === 'par vue'
                              ? region.PrixAnnonce * item.annonce.annonceRegions[0].NbVues
                              : region.PrixAnnonce;

                            return `<li>${region.region}: ${totalPrice} DA (${region.TypePayment})</li>`;
                          })
                          .join('')}
                      </ul>
                    </td>
                    <td class="price">${item.annonce.annonceRegions.reduce(
                      (sum, region) => {
                        const totalPrice = region.TypePayment === 'par vue'
                          ? region.PrixAnnonce * item.annonce.annonceRegions[0].NbVues
                          : region.PrixAnnonce;

                        return sum + totalPrice;
                      },
                      0
                    )} DA</td>
                  </tr>
                `
                )
                .join('')}
            </table>
            <p class="last-sentence">Total Price of All Ads: <strong>DA ${data.reduce(
              (sum, item) => {
                const adTotalPrice = item.annonce.annonceRegions.reduce((s, region) => {
                  const totalPrice = region.TypePayment === 'par vue'
                    ? region.PrixAnnonce * item.annonce.annonceRegions[0].NbVues
                    : region.PrixAnnonce;

                  return s + totalPrice;
                }, 0);

                return sum + adTotalPrice;
              },
              0
            )}</strong></p>
          </body>
        </html>
      `;

      // Options for the PDF generation
      const options = {
        format: 'Letter',
        border: {
          top: '1in',
          right: '1in',
          bottom: '1in',
          left: '1in',
        },
      };

      // Generate the PDF using html-pdf
      pdf.create(htmlTemplate, options).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generatePDFReport;
