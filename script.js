// codepen link :- https://codepen.io/Manan-Telrandhe-the-typescripter/pen/jEONymE


// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
    // Write your code here
    let s = -Infinity;
    let l = -Infinity;
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] > l) {
        s = l;
        l = array[i];
      } else if (array[i] > s && array[i] < l) {
        s = array[i];
      }
    }
    return s;
  }
  
  // Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
  function calculateFrequency(string) {
    // Write your code here
    let freq = {};
  
    for (let i = 0; i < string.length; i++) {
      let ch = string[i];
  
      if (ch >= "a" && ch <= "z") {
        if (freq[ch] === undefined) {
          freq[ch] = 1;
        } else {
          freq[ch] = freq[ch] + 1;
        }
      }
    }
    return freq;
  }
  
  // Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
  function flatten(unflatObject) {
    // Write your code here
    let ans = {};
  
    function helper(obj, prefix) {
      for (let key in obj) {
        let newk = prefix + key;
  
        if (typeof obj[key] === "object") {
          helper(obj[key], newk + ".");
        } else {
          ans[newk] = obj[key];
        }
      }
    }
    helper(unflatObject, "");
    return ans;
  }
  
  // Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
  function unflatten(flatObject) {
    // Write your code here
    let ans = {};
  
    for (let key in flatObject) {
      let sepkey = key.split(".");
      let curr = ans;
      for (let i = 0; i < sepkey.length - 1; i++) {
        curr[sepkey[i]] = curr[sepkey[i]] || {};
        curr = curr[sepkey[i]];
      }
      curr[sepkey[sepkey.length - 1]] = flatObject[key];
    }
    return ans;
  }
  