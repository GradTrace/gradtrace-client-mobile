import { StyleSheet, View } from "react-native";
import { Text, Card } from "@rneui/themed";

export default function ScoreCard({ item }) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View>


        <Text>Course: {item.scores[0].course}</Text>
        {item.scores.map((el, i) => {
          return <Text key={i}> {el.name}: {+el.score.toFixed(2)}</Text>
        }
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 1,
    shadowColor: "#item00",
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
