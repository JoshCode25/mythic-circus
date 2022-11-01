const utility = {

    getIndexByMarkValue(arr, value) { //finds index of item in given array based on given Mark value
    
        for (let i = 0; i < arr.length; i++) { //loops through given array comparing mark values to given value
    
            if (arr[i].mark === value) return i;
    
        }
    
        console.log("getIndexByMarkValue - value not found");
        return -1; //if the value isn't found, returns -1
    
    },
    
    getIndexByNameValue(arr, value) { //finds index of item in given array based on given name value

    
        for (let i = 0; i < arr.length; i++) { //loops through given array comparing name values to given value
    
            if (arr[i].name === value) return i;
    
        }
    
        console.log("getIndexByNameValue - value not found");
        return -1; //if the value isn't found, returns -1
    
    }
}

export default utility;