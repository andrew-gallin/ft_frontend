exports.backendMutation = (requestBody) => {
    const backendURL = 'http://localhost:8000/graphql'


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