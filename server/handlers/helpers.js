

const routeNames = (data) => {
  const routes = [];

  //check if anything is recieved
  if (data.length > 0) {
    //loop through each array
    data.forEach(route => {
      //loop object keys and push route name
      Object.keys(route).forEach(key => {
        if (key !== "_id") {
          routes.push(key);
        };
      });
    });
    return routes;
  }
  else {
    return routes;
  };
};

module.exports = {
  routeNames,
}