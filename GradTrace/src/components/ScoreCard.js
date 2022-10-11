import { StyleSheet, View } from "react-native";
import { Text, Card } from "@rneui/themed";

export default function ScoreCard({ item }) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View>
        <Text style={{ fontWeight: "bold", color: "red" }}>
          Nilai tugas belum masuk
        </Text>
        <Text>Course: {item[0].course}</Text>
        <Text>End semester exam: {item[0].score}</Text>
        <Text>Mid semester exam : {item[1].score}</Text>
        <Text>Exam 1 : {item[2].score}</Text>
        <Text>Exam 2 : {item[3].score}</Text>
        <Text>Final score : {item[4].score}</Text>
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
    marginBottom: 10,
    marginHorizontal: 15,
    marginVertical: 5,
  },
});
