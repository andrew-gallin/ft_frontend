// Takes in an array of lessons objects and a user object and returns an array of the below objects
// Reccomended: Lessons sorted by closesness to user reported skill. Never completed and as much as 10 points "tougher"
// Keep Practicing: Lessons sorted by practice score (a function of time since last completion and the score history)
// -Initial, you need an average score >90 for 3 most recent scores 100's, otherwise sorted by time since last completion
// Help another:
// -Lessons that require feedback form a user 

//completed lessons is a array of lessons a user has completed

//Logic -> Split out new lessons and completed lessons into two arrs of lessons
//Sort new lessons according difficulty proximity to user skill level
//Sort completed lessons by score & recency


//Inital call to lessons
exports.lessonSort = (lessonsArr, user, completedLessonArr = null) =>{
    let sortedLessons = {
        reccomended: [],
        keepPracticing:[]
    }

    
    if (completedLessonArr != null){
        sortedLessons.reccomended = neverCompletedLessonArrBuilder(lessonsArr, completedLessonArr)
        sortedLessons.keepPracticing = completedLessonArr
    }
    
    return sortedLessons
}

//Takes an array of lessons and completedLessons and returns an array of lessons that have never been comepleted
function neverCompletedLessonArrBuilder(lessonsArr, completedLessonArr){
    let newLessons = lessonsArr.filter((lesson) => {
        return !completedLessonArr.some((completedLesson) => {
            //returns true if lesson id matches any lesson id in completedLessonArr
            return completedLesson.lesson._id === lesson._id
        })
    })
    return newLessons
}