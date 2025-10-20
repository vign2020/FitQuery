const func1 = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 200);
};

const func1_1 = (a, b) => {
  return new Promise((resolve, reject) => {
    resolve(a + b);
  });
};

// callback function : a function that is passed as an argumenet to another fundtion so that it could be executed after the completion of a task(an async task)

//pyramid of doom or callback hell
// func1(1, 2, (result) => {
//   func1(result, 2, (result2) => {
//     func1(result2, 2, (result3) => {
//       console.log(result3);
//     });
//   });
// });

//promises
// func1_1(1, 2)
//   .then((result) => {
//     return func1_1(result, 2);
//   })
//   .then((result2) => {
//     return func1_1(result2, 2);
//   })
//   .then((result3) => {
//     return func1_1(result3, 2);
//   })
//   .then((result4) => console.log(result4));

//async await
const sumfunction = async () => {
  const res1 = await func1_1(1, 2);
  const res2 = await func1_1(res1, 2);
  const res3 = await func1_1(res2, 2);
  console.log(res3);
};
sumfunction();
