import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = async() => {
	return await AsyncStorage.getItem("jwt");
};

export const setToken = async (token) => {
	if (token) {
		 await AsyncStorage.setItem("jwt", token);
	}
};

export const removeToken = async () => {
	// AsyncStorage.removeItem("jwt");
   await AsyncStorage.clear()
};