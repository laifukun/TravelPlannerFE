export const retrieveRoute = (routeID) => {
    return fetch(`/routes/${routeID}`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get route information");
      }
      return response.json();
    });
  };