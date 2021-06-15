module.exports = () => {
  if (process.env.APP_ENV === "prod") {
    return {
      extra: {
        baseURL: "https://thimbleapp.co/v1/",
      },
    };
  } else {
    return {
      extra: {
        baseURL: "http://192.168.1.11:8000/v1/",
      },
    };
  }
};
