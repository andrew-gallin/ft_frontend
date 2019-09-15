exports.objArrayToString = (array) => {
    let arrayOfObjectStrings = array.map((obj) => {
        let json = JSON.stringify(obj)
        return json.replace(/"([^(")"]+)":/g,"$1:");
        //return json.replace(/\"([^(\")"]+)\":/g,"$1:");
      });
    let singleString = (arrayOfObjectStrings.join(', '));
 
    return String("[" + singleString+ "]");
}