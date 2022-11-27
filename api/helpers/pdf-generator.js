const PDFDocument = require('pdfkit-table');
module.exports = {

  friendlyName: 'Pdf Generator',

  description: 'Return a doc',

  inputs: {

    data: {
      type: 'ref',
    }
  },

  fn: async function (inputs, exits) {

      let doc = new PDFDocument({ margin: 30, size: 'A4' });

      const table = {
        title: 'UFO Engineering',
        subtitle: 'Staff',
        headers: [
          { label: 'firstname', property: 'firstname', width: 60, renderer: null },
          { label: 'lastname', property: 'lastname', width: 60, renderer: null },
          { label: 'email', property: 'email', width: 60, renderer: null },
          { label: 'phone_number', property: 'phoneNumber', width: 60, renderer: null },
          { label: 'location', property: 'location', width: 60, renderer: null },
          { label: 'link', property: 'link', width: 60, renderer: null },
        ],
        datas: inputs.data,
      };

      doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font('Helvetica').fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
      });

    return exits.success(doc);
  }

};
