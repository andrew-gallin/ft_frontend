const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
        password: hashedPassword,
        location: args.userInput.location,
        spokenLanguageSkill: args.userInput.spokenLanguageSkill
      });
      const result  = await user.save()
      return{...result._doc, password:null, _id: result.id}
    }catch(err) {
        throw err
    }
  },
  //might be better to change both error messages to Invalid Credentials
  login: async ({email, password}) => {
    const user = await User.findOne({email: email})
    if (!user){
      throw new Error('User does not exist!')
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      throw new Error('Incorrect Password')
    }
    const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey',
      {expiresIn: '1h'});
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
}
