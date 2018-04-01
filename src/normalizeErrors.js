// this util takes in an array of errors
// [{ path: '', message: ''}]
// and returns an object
/*
{
    email: ['error1', 'error2'...]
}
*/

export default errors =>
  errors.reduce((acc, cv) => {
    if (cv.path in acc) {
      acc[cv.path].push(cv.message);
    } else {
      acc[cv.path] = [cv.message];
    }

    return acc;
  }, {});

