import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image
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
    const { onPress, image, isVisible } = this.props;
    let displayImage = (
      <Image
        source={image}
        style={styles.cardImage}
        resizeMode="contain"
      />
    );

    if (!isVisible) {
      displayImage = (
        <Image
          source={require('./assets/card-back.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )
    }

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

  componentDidMount() {
    this.draw();
  }

  draw = () => {
    const possibleCards = [...AVAILABLE_CARDS];
    const selectedCards = [];

    for(let i = 0; i < 6; i +=1) {
      const randomIndex = Math.floor(Math.random() * possibleCards.length);
      const card = possibleCards[randomIndex];

      selectedCards.push(card);
      selectedCards.push(card);

      possibleCards.splice(randomIndex, 1);
    }

    selectedCards.sort(() => 0.5 - Math.random())

    const cardRow = [];
    const columnSize = 3;
    let index = 0;

    while (index < selectedCards.length) {
      cardRow.push(selectedCards.slice(index, columnSize + index))
      index += columnSize;
    }

    const data = cardRow.map((row, i) => {
      return {
        name: i,
        columns: row.map(image => ({ image }))
      };
    })

    this.setState({ data });
  };

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
                  <Card key={cardId} onPress={() => this.handleCardPress()} image={card.image} isVisible={index < 1} />
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
