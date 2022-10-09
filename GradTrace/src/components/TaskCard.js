import { StyleSheet, View } from "react-native";
import { Text, Card, Avatar, Button } from "@rneui/themed";
import moment from "moment";

export default function TaskCard({ item, navigation }) {
  const goToUpload = () => {
    navigation.navigate("Upload", {
      id: item.id,
    });
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.card}>
        <View>
          <Avatar
            size={50}
            source={{
              uri: item.Course.icon,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.subject}>{item.Course.name}</Text>
          <Text>{item.name}</Text>
          <Text style={styles.deadline}>
            Deadline: {moment(item.deadline).format("dddd, Do MMMM YYYY")}
          </Text>
        </View>
        {/* <View style={{ marginStart: 12 }}>
          {item.AssignmentGrades[0].url === "none" ? (
            <Button title={"Submit"} />
          ) : (
            <Text>Submitted</Text>
          )}
        </View> */}
        <Text>{item.AssignmentGrades.url}</Text>
        <Button title={"submit"} onPress={() => goToUpload()} />
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
