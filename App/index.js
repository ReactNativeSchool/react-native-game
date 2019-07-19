import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions
} from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CB48F",
    flex: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: screen.height * 0.3
  },
  card: {},
  cardImage: {
    width: screen.width * 0.3,
    height: screen.height * 0.21,
    borderColor: "#fff",
    borderWidth: 5,
    borderRadius: 3
  }
});

const Row = () => (
  <View style={styles.row}>
    <View style={styles.card}>
      <Image
        source={require("./assets/card-back.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </View>
    <View style={styles.card}>
      <Image
        source={require("./assets/card-back.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </View>

    <View style={styles.card}>
      <Image
        source={require("./assets/card-back.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </View>
  </View>
);

const App = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <SafeAreaView>
      <Row />
      <Row />
      <Row />
    </SafeAreaView>
  </View>
);

export default App;
