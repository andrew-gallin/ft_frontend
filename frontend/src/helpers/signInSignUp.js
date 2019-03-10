//Takes in a userDataObj and whether this is a login or a signup and returns login data
export async function signInSignUp(userObj, isLogin) {
    const {objArrayToString } = require('../helpers/objArrayToString')
    const { backendCall } = require('../helpers/backendCall')
    const {email, username, password, location, languages_learning, languages_spoken} = userObj
    let loginData;
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `
    }
    if (!isLogin) {
      let leanguages_learning_sting = objArrayToString(languages_learning)
      let languages_spoken_sting = objArrayToString(languages_spoken)
      requestBody ={
         query: `
           mutation{
             createUser(userInput:{email: "${email}", username: "${username}", password: "${password}", location: "${location}", spokenLanguageSkill: ${languages_spoken_sting}, learningLanguageSkill: ${leanguages_learning_sting}}){
               _id
               email
             }
           }
         `
       }
       try{
        await backendCall(requestBody);
        let loginBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}"){
                  userId
                  token
                  tokenExpiration
                }
              }
            `
          }
        loginData = await backendCall(loginBody);
        }catch (err){
         throw new Error(err)
        }
    }else{
        try{
            loginData =  await backendCall(requestBody);
            
        }catch (err){
            throw new Error(err)
        }
    }
    return loginData.data
} 
