
const { backendCall } = require('./backendCall')

//Takes an optional user object with PARAMS :()
//Returns an array with lessonsObj and optionally compoletedLessonObj (if passed a registered user)

//Inital call to lessons
export async function lessonGather(context, user = null){    

    let answerLanguage = "English (US)"
    let promptLanguage = "Portuguese (BRA)"
    
    user != null ? user.spokenLanguageSkill.length !== 0 ? answerLanguage = user.spokenLanguageSkill[0].language : answerLanguage="English (US)"  : answerLanguage="English (US)"
    
    
    let lessonObj = {
        lessons: null,
        completedLessons: null
    }

    let requestBody = {
        query: `
          query{
          lessons(promptLanguage:"${promptLanguage}", answerLanguage:"${answerLanguage}") {
              _id
              title
              promptLanguage
              difficulty
            }
          }
        `
      }

    //send to the backend
    try{
        let resData = await backendCall(requestBody);
        lessonObj.lessons = await resData.data.lessons
      }catch(err) {
        throw(err)
      }

      if(context.userId){
        requestBody = {
          query: `
            query{
                completedLessons(userID:"${context.userId}"){
                score
                _id
                user{
                    username
                    _id
                }
                lesson{
                  _id
                  title
                  difficulty
                }
                updatedAt
                }
            }
          `
        }
          //send to the backend
        try{
          let resData = await backendCall(requestBody);
          lessonObj.completedLessons = await resData.data.completedLessons
        }catch(err) {
          throw (err)
        }
            
      }
      return lessonObj
}