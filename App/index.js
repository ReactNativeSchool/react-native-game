import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";

const screen = Dimensions.get("window");

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
    width: screen.width * 0.25,
    height: screen.height * 0.168
  }
});

const AVAILABLE_CARDS = [
  // clubs
  require("./assets/playing-cards/2_of_clubs.png"),
  require("./assets/playing-cards/3_of_clubs.png"),
  require("./assets/playing-cards/4_of_clubs.png"),
  require("./assets/playing-cards/5_of_clubs.png"),
  require("./assets/playing-cards/6_of_clubs.png"),
  require("./assets/playing-cards/7_of_clubs.png"),
  require("./assets/playing-cards/8_of_clubs.png"),
  require("./assets/playing-cards/9_of_clubs.png"),
  require("./assets/playing-cards/10_of_clubs.png"),
  require("./assets/playing-cards/ace_of_clubs.png"),
  require("./assets/playing-cards/jack_of_clubs.png"),
  require("./assets/playing-cards/queen_of_clubs.png"),
  require("./assets/playing-cards/king_of_clubs.png"),
  // diamonds
  require("./assets/playing-cards/2_of_diamonds.png"),
  require("./assets/playing-cards/3_of_diamonds.png"),
  require("./assets/playing-cards/4_of_diamonds.png"),
  require("./assets/playing-cards/5_of_diamonds.png"),
  require("./assets/playing-cards/6_of_diamonds.png"),
  require("./assets/playing-cards/7_of_diamonds.png"),
  require("./assets/playing-cards/8_of_diamonds.png"),
  require("./assets/playing-cards/9_of_diamonds.png"),
  require("./assets/playing-cards/10_of_diamonds.png"),
  require("./assets/playing-cards/ace_of_diamonds.png"),
  require("./assets/playing-cards/jack_of_diamonds.png"),
  require("./assets/playing-cards/queen_of_diamonds.png"),
  require("./assets/playing-cards/king_of_diamonds.png"),
  // hearts
  require("./assets/playing-cards/2_of_hearts.png"),
  require("./assets/playing-cards/3_of_hearts.png"),
  require("./assets/playing-cards/4_of_hearts.png"),
  require("./assets/playing-cards/5_of_hearts.png"),
  require("./assets/playing-cards/6_of_hearts.png"),
  require("./assets/playing-cards/7_of_hearts.png"),
  require("./assets/playing-cards/8_of_hearts.png"),
  require("./assets/playing-cards/9_of_hearts.png"),
  require("./assets/playing-cards/10_of_hearts.png"),
  require("./assets/playing-cards/ace_of_hearts.png"),
  require("./assets/playing-cards/jack_of_hearts.png"),
  require("./assets/playing-cards/queen_of_hearts.png"),
  require("./assets/playing-cards/king_of_hearts.png"),
  // spades
  require("./assets/playing-cards/2_of_spades.png"),
  require("./assets/playing-cards/3_of_spades.png"),
  require("./assets/playing-cards/4_of_spades.png"),
  require("./assets/playing-cards/5_of_spades.png"),
  require("./assets/playing-cards/6_of_spades.png"),
  require("./assets/playing-cards/7_of_spades.png"),
  require("./assets/playing-cards/8_of_spades.png"),
  require("./assets/playing-cards/9_of_spades.png"),
  require("./assets/playing-cards/10_of_spades.png"),
  require("./assets/playing-cards/ace_of_spades.png"),
  require("./assets/playing-cards/jack_of_spades.png"),
  require("./assets/playing-cards/queen_of_spades.png"),
  require("./assets/playing-cards/king_of_spades.png")
];

const Card = ({ onPress, selectedIndices, id, image, matchedPairs }) => {
  if (selectedIndices.includes(id) || matchedPairs.includes(image)) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={image} style={styles.cardImage} resizeMode="contain" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={require("./assets/card-back.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const initialState = {
  selectedIndices: [],
  matchedPairs: [],
  data: [],
  currentSelection: null,
  moveCount: 0
};

class App extends React.Component {
  state = initialState;

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    if (this.state.matchedPairs.length >= 6) {
      this.gameComplete();
    }
  }

  gameComplete = () => {
    Alert.alert(
      "Winner!",
      `You completed the puzzle in ${this.state.moveCount} moves!`,
      [
        {
          text: "Reset Game",
          onPress: () => this.setState({ ...initialState }, () => this.draw())
        }
      ]
    );
  };

  draw = () => {
    const possibleCards = [...AVAILABLE_CARDS];
    const selectedCards = [];
    for (let i = 0; i < 6; i += 1) {
      const randomIndex = Math.floor(Math.random() * possibleCards.length);
      const card = possibleCards[randomIndex];
      selectedCards.push(card);
      selectedCards.push(card);
      possibleCards.splice(randomIndex, 1);
    }

    selectedCards.sort(() => 0.5 - Math.random());

    const cardRow = [];
    const size = 3;
    let index = 0;

    while (index < selectedCards.length) {
      cardRow.push(selectedCards.slice(index, size + index));
      index += size;
    }

    const data = cardRow.map((row, i) => ({
      name: i,
      columns: row.map(image => ({ image }))
    }));

    this.setState({ data });
  };

  handleCardPress = (cardId, image) => {
    let callRecursively = false;
    this.setState(
      ({ selectedIndices, currentSelection, matchedPairs, moveCount }) => {
        let nextState = {};
        if (selectedIndices.length > 1) {
          callRecursively = true;
          return { selectedIndices: [] };
        }

        nextState.moveCount = moveCount + 1;
        if (selectedIndices.length === 1) {
          if (image === currentSelection) {
            nextState = {
              ...nextState,
              matchedPairs: [...matchedPairs, image],
              currentSelection: null
            };
          }
        } else {
          nextState.currentSelection = image;
        }

        nextState.selectedIndices = [...selectedIndices, cardId];

        return nextState;
      },
      () => {
        if (callRecursively) {
          this.handleCardPress(cardId, image);
        }
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          {this.state.data.map(row => (
            <View key={row.name} style={styles.row}>
              {row.columns.map((card, index) => {
                const cardId = `${row.name}-${card.image}-${index}`;

                return (
                  <Card
                    key={cardId}
                    id={cardId}
                    onPress={() => this.handleCardPress(cardId, card.image)}
                    selectedIndices={this.state.selectedIndices}
                    matchedPairs={this.state.matchedPairs}
                    image={card.image}
                  />
                );
              })}
            </View>
          ))}
        </SafeAreaView>
      </View>
    );
  }
}

export default App;
