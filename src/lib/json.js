export default {
  getJsonFromUrl(url) {
    return fetch(`${url}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(`Failed to load json file at ${url}`);
      });
  },
};