import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Button, IconButton } from 'react-native-paper';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem vindo!</Text>
            <Image
                style={styles.image}
                source={require('../images/copa-do-brasil.png')}
            />
            <Button style={styles.button}
                icon="soccer"
                mode="contained"
                onPress={() => navigation.navigate('fases')}>
                Ver fases
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#178f25',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    button: {
        marginTop: 40,
        backgroundColor: '#178f25',
        width: 180,
        height: 50,
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200
    }
})
