const bcrypt = require('bcryptjs')

const User = require('../../models/users.js')

module.exports = {
  users: async () => {
    return User.find()
    .then(users => {
      return users.map(_user => {
        return {
          ..._user._doc,
          _id: _user.id
        }
      })
    }).catch(err =>{
      throw err
    })
  },
  createUser: async (args) => {
    try{
      const existingUser = await User.findOne({email:args.userInput.email})
      if (existingUser){
        throw new Error('User email exists already')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPassword
      });
      const result  = await user.save()
      return{...result._doc, password:null, _id: result.id}
    }catch(err) {
        throw err
    }
  }
}
