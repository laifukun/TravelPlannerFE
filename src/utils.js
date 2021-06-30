export const login = (credential) => {
    // 请求数据
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
   
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // credentials保证request带上cookie
    }).then((response) => { // 如果http请求成功返回，进行如下操作
      if (response.status !== 200) {
        throw Error("Fail to log in");
      }
    });
<<<<<<< HEAD
};

export const register = (data) => {
  const registerUrl = `/signup`;
 
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
=======
  };

  export const getRoute = () => {
    return fetch("/routes").then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get shopping cart data");
      }
   
      return response.json();
    });
  };
>>>>>>> fe0dbcbd4dc13e2f7a82354965c562935a8128a2
