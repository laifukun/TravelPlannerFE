export const login = (credential) => {
    const loginUrl = `/users/login?username=${credential.username}&password=${credential.password}`;
   
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: "include",
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to log in");
      }
    });
  };

  export const register = (data) => {
    const registerUrl = `/users/register`;
   
    return fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     // credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 201) {
        throw Error("Fail to register");
      }
    });
  };

  export const getUserInfo = (username) => {
    return fetch(`/users/${username}`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get All Routes");
      }   
      return response.json();
    });
  }; 