import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

import { Button, ActivityIndicator } from 'react-native-paper';

import axios from 'axios';


export default function Fases({ navigation }) {

    const [fases, setFases] = useState([]);

    const fecthData = async () => {
        try {
            const result = await axios.get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases`, {
                headers: {
                    'Authorization': `Bearer ${'sua chave da api aqui'}`
                }
            })
            return result.data
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchFases = async () => {
            const rodadas = await fecthData()
            setFases(rodadas.slice(0, 2))
        }
        fetchFases()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.firstView}>
                <Text style={styles.text}>Fases da competição</Text>
                <Image
                    style={styles.image}
                    source={require('../images/copa-do-brasil.png')}
                />
            </View>
            <View style={styles.secondView}>
                <Text style={styles.text}>lista de fases</Text>
                {typeof fases === "undefined" ?
                    <ActivityIndicator animating={true} color={'#178f25'} /> :
                    fases.map(value => {
                        return (
                            <View key={value.fase_id}>
                                <Button style={styles.button}
                                    icon="soccer"
                                    mode="contained"
                                    onPress={() => navigation.navigate('partidas', {
                                        id: value.fase_id
                                    })}>
                                    {value.fase_id}
                                </Button>
                            </View>
                        );
                    })
                }
            </View>
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
    firstView: {
        flex: 1,
        marginTop: 45,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondView: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#178f25',
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10
    },
    image: {
        width: 105,
        height: 105
    },
    button: {
        marginTop: 10,
        backgroundColor: '#178f25',
        width: 180,        
        height: 50,
        justifyContent: 'center'
    }

})
