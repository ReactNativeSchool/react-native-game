import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity
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

const Card = ({ onPress, selectedIndices, id, card }) => {
  if (selectedIndices.includes(id)) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={card} style={styles.cardImage} resizeMode="contain" />
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

class App extends React.Component {
  state = {
    selectedIndices: [],
    data: []
  };

  componentDidMount() {
    this.draw();
  }

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
      columns: row
    }));

    this.setState({ data });
  };

  handleCardPress = cardId => {
    this.setState(({ selectedIndices }) => {
      if (selectedIndices.length > 1) {
        return {};
      }

      if (selectedIndices.length === 1) {
        this.resetCards();
      }

      return {
        selectedIndices: [...selectedIndices, cardId]
      };
    });
  };

  resetCards = () => {
    setTimeout(() => {
      this.setState({ selectedIndices: [] });
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          {this.state.data.map(row => (
            <View key={row.name} style={styles.row}>
              {row.columns.map((card, index) => {
                const cardId = `${row.name}-${card}-${index}`;

                return (
                  <Card
                    key={cardId}
                    id={cardId}
                    onPress={() => this.handleCardPress(cardId)}
                    selectedIndices={this.state.selectedIndices}
                    card={card}
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
