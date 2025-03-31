import {View, Text, StyleSheet} from "react-native";


const Home_screen = () =>{
    return(
        <>
            <View>
                <Text style={styles.text}>
                    Home
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    text:{
        color: 'blue',
    },
});

export default Home_screen;
