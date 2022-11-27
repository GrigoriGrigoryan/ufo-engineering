module.exports = {
  insertUserData: async function (req, res) {
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      link: req.body.link
    }).fetch();

    const allUsers = await User.find();

     const doc = await sails.helpers.pdfGenerator.with({data: allUsers});

    doc.pipe(res);
    doc.end();
  }
};
