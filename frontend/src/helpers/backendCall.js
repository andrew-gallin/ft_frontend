//Takes in a request body string and returns jsonified data from the graphql call
exports.backendCall = (requestBody) => {

    // let backendURL = '/graphql/graphql'
    let backendURL = 'http://localhost:8000/graphql'


    return fetch(backendURL, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!')
            }
            return res.json();
          })
          .then(resData => {
            return resData})
          .catch(err => {
            console.log(err)
          })
}