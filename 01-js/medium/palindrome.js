/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.replace(/[^a-z0-9]/ig, '').toLowerCase();
  const size = str.length;
  let j = size-1

  if (size === 0 || size === 1) {
    return true
  }

  for (let i = 0; i < j; i++,j--) {
    if (str[i]!==str[j]) {
      return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
