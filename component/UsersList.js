import * as React from "react";
import { Button, DataTable } from "react-native-paper";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";
export const dataTableTitleStyle = {
  color: "white",
};

const Users = () => {
  const [users, setUsers] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuthContext();

  React.useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jwt = await getToken();
      const response = await fetch("http://192.168.1.168:1337/api/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      const dataJson = await response.json();
      setUsers(dataJson);
      setLoading(false);
    } catch (error) {
      console.error("Erreur API :", error);
      setLoading(false);
    }
  };
  const deleteSession = async (id) => {
    const jwt = await getToken();
    const filter = session.filter((item) => id === item.attributes.userId);
    console.log("filter", filter);
    fetch(`http://192.168.1.168:1337/api/sessions/${filter[0].id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  };
  const handleDelete = async (id) => {
    const jwt = await getToken();
    fetch(`http://192.168.1.168:1337/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(() => {
      fetchData();
      deleteSession(id);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerPosition}>
        <DataTable>
          <DataTable.Header style={styles.background}>
            <DataTable.Title style={styles.titleFirst}>
              <Text style={dataTableTitleStyle}>first Name</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleLast}>
              <Text style={dataTableTitleStyle}>Last Name</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titlePhone}>
              <Text style={dataTableTitleStyle}>pseudo </Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleEmail}>
              <Text style={dataTableTitleStyle}>Email</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleAddress}>
              <Text style={dataTableTitleStyle}>Address</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.titleAct}>
              <Text style={dataTableTitleStyle}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>
          {loading ? (
            <Text>Loading ...</Text>
          ) : (
            <>
              {users?.map((res) => {
                return (
                  <DataTable.Row key={res.id}>
                    <DataTable.Cell style={styles.titleFirst}>
                      {res.firstName}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.titleLast}>
                      {res.lastName}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.titlePhone}>
                      {res.username}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.titleEmail}>
                      {res.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.titleAddress}>
                      {res.address}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.titleAct}>
                      <Button
                        textColor="red"
                        icon="delete-outline"
                        mode="text"
                        onPress={() => handleDelete(res.id)}
                        style={styles.button}
                      ></Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </>
          )}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  titleFirst: {
    flex: 1.5,
  },
  titleLast: {
    flex: 1.5,
  },
  titleEmail: {
    flex: 1,
  },
  titlePhone: {
    flex: 1,
  },
  titleAddress: {
    flex: 1.5,
  },
  titleAct: {
    flex: 1,
  },
  centerPosition: {
    alignItems: "center",
  },
  background: {
    backgroundColor: "#2667FF",
    height: 60,
    alignItems: "center",
  },
  button: {
    color: "red",
    height: 25,
  },
});
