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
    buildNumber: "11",
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        "This app uses the photo library to allow picking a photo to post.",
    },
  },
  android: {
    package: "co.capulus.thimble",
    versionCode: 5,
    permissions: ["READ_EXTERNAL_STORAGE"],
    googleServicesFile: "./google-services.json",
  },
};

module.exports = () => {
  if (process.env.APP_ENV === "prod") {
    return {
      ...config,
      extra: {
        baseURL: "https://www.thimbleapp.co/v1/",
        shareURL: "https://www.thimbleapp.co/p/",
      },
    };
  } else {
    return {
      ...config,
      extra: {
        baseURL: "http://192.168.1.11:8000/v1/",
        shareURL: "http://192.168.1.11:8000/p/",
      },
    };
  }
};
