export const searchByKeyword = (keyword) => {
    return fetch(`/search/${keyword}`).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get search results");
      }
   
      return response.json();
    });
  };