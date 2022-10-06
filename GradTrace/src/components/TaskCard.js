import { StyleSheet, View } from "react-native";
import { Text, Card, Avatar, Button } from "@rneui/themed";

export default function TaskCard() {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.card}>
        <View>
          <Avatar
            size={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2941/2941552.png",
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.subject}>Biology</Text>
          <Text style={styles.deadline}>Deadline: 5 Sept 2022</Text>
        </View>
        <View style={{ marginStart: 12 }}>
          <Button title={"Submit"} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom: 2,
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    marginStart: 12,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deadline: {
    fontSize: 14,
  },
});
