let arr = [3, 6, -4, 8, 6, -7];

function findMissingNumber(arr) {
  let num = 9;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    return i;
    // console.log(arr[i]);
    for (let j = 0; j < arr.length; j++) {
      if (!arr[i] === num[j]) {
        return j;
      }
    }
  }
  newArr.push[j];
  return newArr;

  //   for (let j = 1; i < n; j++) {
  //     console.log(j);
  //   }
}

findMissingNumber(arr);
// conslole.log(findMissingNumber(arr));
