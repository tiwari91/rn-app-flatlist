import { AsyncStorage, NetInfo, Platform } from "react-native";

const isNetworkConnected = () => {
  if (Platform.OS === "ios") {
    return new Promise(resolve => {
      const handleFirstConnectivityChangeIOS = isConnected => {
        NetInfo.isConnected.removeEventListener(
          "change",
          handleFirstConnectivityChangeIOS
        );
        resolve(isConnected);
      };
      NetInfo.isConnected.addEventListener(
        "change",
        handleFirstConnectivityChangeIOS
      );
    });
  }

  return NetInfo.isConnected.fetch();
};

const getLocalData = url => {
  return AsyncStorage.getItem(url).then(data => {
    if (data !== null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });
};

const saveData = (url, data) => {
  AsyncStorage.setItem(url, JSON.stringify(data));
};

const getRemoteData = url => {
  return fetch(url).then(response => response.json());
};

export const getPeople = () => {
  const url = "https://swapi.co/api/people";
  return isNetworkConnected()
    .then(isConnected => {
      if (!isConnected) {
        return getLocalData(url);
      }
      return getRemoteData(url);
    })
    .then(data => {
      saveData(url, data);
      return data;
    });
};
