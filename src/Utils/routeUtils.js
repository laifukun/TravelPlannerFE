export const getRouteDetailsById = (routeId) => {
    return fetch(`/routes/${routeId}`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get Route details");
      }   
      return response.json();
    });
  };

export const getAllRoutes = () => {
    return fetch(`/routes`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get All Routes");
      }   
      return response.json();
    });
  }; 

export const deleteRoute = (routeId) => {
    return fetch(`/routes/${routeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status !== 202) {
        throw Error("Fail to delete route");
      }
    });
  };


  export const saveRoute = (data) => {
    return fetch(`/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.status !== 201) {
        throw Error("Fail to save route");
      }
    });
  };

  export const updateRoute = (data) => {
    return fetch(`/routes}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.status !== 202) {
        throw Error("Fail to update route");
      }
    });
  };


  export const getAllUserPlans = () => {
    return fetch(`/plans`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get All Routes");
      }   
      return response.json();
    });
  }; 

  export const savePlan = (data) => {
    return fetch(`/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.status !== 201) {
        throw Error("Fail to save route");
      }
    });
  };

  export const deletePlan = (planId) => {
    return fetch(`/plans/${planId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status !== 202) {
        throw Error("Fail to delete route");
      }
    });
  };