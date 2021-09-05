// CRUD Functionality
const { user } = require('./models');

// CREATE new User
async function makeUser(name, age, email) {
    try {
        const newUser =  await user.create({name, age, email});
        let parsedUser = newUser.toJSON();
        console.log(parsedUser.name);
    } catch {
        console.log(err);
    }
}
// makeUser('Molik Kidd',32,'mzk@forsure.com');

// READ OR CREATE USER
// searches for user first if not present, it creates and adds the user
async function findOrCreateUser(name, age, email) {
    try {
        const [currentUser, created] = await user.findOrCreate({
            where: { name },
            defaults: { age, email }
        });
        console.log('USER: ', currentUser);
        console.log('WAS USER: ', created);
    } catch (error) {
        console.log(error);
    }
}
// findOrCreateUser('HolyMoly DonutShop', 45, 'HOLYMDS@yupdonuts.com');
// findOrCreateUser('Betty Muller', 30, 'Emilia_Kub@hotmail.com');

// READ User
// grabs the first instance of the matched name
async function findUserByName(name) {
    try {
        const foundUser = await user.findOne({
            where: {name},
        });
        console.log(foundUser);
    } catch (err) {
        console.log(err);
    }
}

// findUserByName('HolyMoly DonutShop');

async function fetchAllUsers() {
    // cant use toJSON on an array but you can on an object
    // you have to map thru the array first then toJSON each object
    try {
        const allUsers = await user.findAll({});
        const parsedUsers = allUsers.map(u => u.toJSON());
        console.log(parsedUsers);
    } catch (error) {
        console.log(error)
    }
}

// fetchAllUsers();
// update user, if multiple users than it will update them all with the same data
// so update off of a unqiue attribute, i.e. email or username. 
async function updateUser(name, age, email) {
    try {
        // returns a number show how many rows where updated.
        const numberOfRowsUpdate = await user.update({email, age}, {
            // more unique attribute
            // where: {email}
            // or
            where: {name}
        });
        console.log(numberOfRowsUpdate);
    } catch (error) {
        console.log(error)
    }
}

// updateUser('Molik Kidd', 33,'mzk@forsure.com')

// Delete Users
async function deleteUser(email) {
    try {
      let deleteUserData = await user.destroy({
          where: {email}
      });  
    //   returns a number of how many users where deleted
      console.log(deleteUserData)
    } catch (error) {
        console.log(error);
    }
}
// DONT DELETE ACCOUNTs, use true or false to turn profile active to inactive. 
// you can delete post but not users. 
deleteUser('Emilia_Kub@hotmail.com')