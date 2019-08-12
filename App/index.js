import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { AVAILABLE_CARDS } from "./data/availableCards";

const screen = Dimensions.get("window");
const CARD_WIDTH = Math.floor(screen.width * 0.25);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * (323 / 222));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CB48F",
    flex: 1
  },
  safearea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 10
  },
  card: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 5,
    borderRadius: 3
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT
  }
});

class Card extends React.Component {
  render() {
    const { onPress } = this.props;
    const displayImage = null;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>{displayImage}</View>
      </TouchableOpacity>
    );
  }
}

class Row extends React.Component {
  render() {
    return <View style={styles.row}>{this.props.children}</View>;
  }
}

const initialState = {
  data: [],
  moveCount: 0
};

class App extends React.Component {
  state = initialState;

  handleCardPress = () => {};

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          {this.state.data.map((row, rowIndex) => (
            <Row key={row.name} index={rowIndex}>
              {row.columns.map((card, index) => {
                const cardId = `${row.name}-${card.image}-${index}`;

                return (
                  <Card key={cardId} onPress={() => this.handleCardPress()} />
                );
              })}
            </Row>
          ))}
        </SafeAreaView>
      </View>
    );
  }
}

export default App;
