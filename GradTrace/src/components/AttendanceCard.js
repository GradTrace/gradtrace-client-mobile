import { StyleSheet, View } from "react-native";
import { Text, Card, Button, Avatar } from "@rneui/themed";
import moment from "moment";

export default function AttendanceCard({ item }) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.card}>
        <View>
          {/* <Avatar
            size={50}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/591/591576.png",
            }}
          /> */}
        </View>
        <View style={styles.content}>
          <Text style={styles.date}>
            {moment(item.dateAndTime).format("dddd, Do MMMM YYYY")}
          </Text>
          <Text style={styles.attendance}>Present</Text>
        </View>
        {/* <View style={{ marginStart: 12 }}>
          <Button title={"Detail"} />
        </View> */}
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
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
  attendance: {
    fontSize: 14,
  },
});
