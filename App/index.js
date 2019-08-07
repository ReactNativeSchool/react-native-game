import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Animated
} from "react-native";

const screen = Dimensions.get("window");
const CARD_WIDTH = screen.width * 0.25;
const CARD_HEIGHT = screen.height * 0.168;

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

const getCardOffset = index => {
  switch (index) {
    case 0:
      return 1.2;
    case 2:
      return -1.2;
    default:
      return 0;
  }
};

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.offset = new Animated.Value(CARD_WIDTH * getCardOffset(props.index));
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      Animated.timing(this.offset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { onPress, selectedIndices, id, image, matchedPairs } = this.props;
    let displayImage = (
      <Image
        source={require("./assets/card-back.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
    );
    if (selectedIndices.includes(id) || matchedPairs.includes(image)) {
      displayImage = (
        <Image source={image} style={styles.cardImage} resizeMode="contain" />
      );
    }

    const offset = {
      transform: [
        {
          translateX: this.offset
        }
      ]
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={[styles.card, offset]}>
          {displayImage}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const getRowOffset = index => {
  switch (index) {
    case 0:
      return 1.5;
    case 1:
      return 0.5;
    case 2:
      return -0.5;
    case 3:
      return -1.5;
    default:
      return 0;
  }
};

class Row extends React.Component {
  offset = new Animated.Value(CARD_HEIGHT * getRowOffset(this.props.index));

  opacity = new Animated.Value(0);

  componentDidMount() {
    this.timeout = setInterval(() => {
      Animated.parallel([
        Animated.timing(this.offset, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const animationStyles = {
      opacity: this.opacity,
      transform: [
        {
          translateY: this.offset
        }
      ]
    };
    return (
      <Animated.View style={[styles.row, animationStyles]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

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
          if (image === currentSelection && !selectedIndices.includes(cardId)) {
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
          {this.state.data.map((row, rowIndex) => (
            <Row key={row.name} index={rowIndex}>
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
                    index={index}
                  />
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
