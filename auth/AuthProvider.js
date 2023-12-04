import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [sessions,setSessions]= useState();
  const [loading, setLoading] = React.useState(false);

  

  const fetchData = async () => {
    setLoading(true);
    const authToken = await getToken();
    try {

      const response = await fetch("http://192.168.1.168:1337/api/sessions", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const dataJson = await response.json();
      setSessions(dataJson.data);
    } catch (error) {
      console.error("Erreur API :", error);
    
    }finally{
      setLoading(false);
    }
  };

  const fetchLoggedInUser = async () => {
    setIsLoading(true);
    const authToken = await  getToken();
    try {
    	const response = await fetch("http://192.168.1.168:1337/api/users/me", {
    		headers: {
    			Authorization: `Bearer ${authToken}`,
    		},
    	});
    	const data = await response.json();
    	setUserData(data);
      console.log("user",data);
    } catch (error) {
    	console.error(error);
    } finally {
    	setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };

  const handleSession = (session) => {
    setSessions(session);
  };

  useEffect(() => {
      fetchLoggedInUser();
  }, []);
  
  useEffect(() => {
      fetchData();

  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading, session:sessions, setSession:handleSession, loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
