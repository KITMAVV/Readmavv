import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home_screen from "./src/screens/home_screen.tsx";

function App(): React.JSX.Element {
  return (
      <>
    <View>
        <Text style={styles.red}>
            Hello World
        </Text>
    </View>
          <Home_screen/>
      </>
  );
}

const styles = StyleSheet.create({
    red:{
        color: 'red',
    },
});

export default App;
