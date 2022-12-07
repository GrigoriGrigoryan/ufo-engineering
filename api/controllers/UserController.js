module.exports = {
  insertUserData: async function (req, res) {
    const userData = req.body;
    if(userData.length < 5000) {

      await User.createEach(userData);
    } else if (userData.length > 5000 && userData.length <= 10000) {

      await Promise.all([await User.createEach(userData.slice(0, 5000)), await User.createEach(userData.slice(5000))]);
    } else {
      throw new Error('The server could not handle more than adding 10,000 users at once');
    }


    const allUsers = await User.find();

    const doc = await sails.helpers.pdfGenerator.with({data: allUsers});

    doc.pipe(res);
    doc.end();
  },

  generateUsersList: async function (req, res) {
    const Chance = require('chance');


    const chanceObj = new Chance();
    const generateUser = () =>
      ({
        firstname: chanceObj.name(),
        lastname: chanceObj.last(),
        email: chanceObj.email(),
        phoneNumber: chanceObj.phone(),
        location: chanceObj.address(),
        link: chanceObj.url()
      });


     const usersList = Array.from({length: 10000}, generateUser);

    res.send(usersList);
  }

};
