const config = {
  name: "Thimble",
  slug: "thimble",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/app_icon.png",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "co.capulus.thimble",
    buildNumber: "1.0.0",
  },
  android: {
    package: "co.capulus.thimble",
    versionCode: 1,
  },
};

module.exports = () => {
  if (process.env.APP_ENV === "prod") {
    return {
      ...config,
      extra: {
        baseURL: "https://thimbleapp.co/v1/",
      },
    };
  } else {
    return {
      ...config,
      extra: {
        baseURL: "http://192.168.1.11:8000/v1/",
      },
    };
  }
};
