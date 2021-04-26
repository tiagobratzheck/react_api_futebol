import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'

import { List, ActivityIndicator } from 'react-native-paper';

import axios from 'axios';


export default function Partidas({ route, navigation }) {

    const { id } = route.params
    const [partidas, setPartidas] = useState([]);

    const fecthData = async () => {
        try {
            const result = await axios.get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases/${id}`, {
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
            setPartidas(rodadas.chaves)
        }
        fetchFases()
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.firstView}>
                <Text style={styles.text}>Lista de jogos</Text>
                <Image
                    style={styles.image}
                    source={require('../images/copa-do-brasil.png')}
                />
            </View>
            <View style={styles.secondView}>
                <Text style={styles.text}>Partidas</Text>
                <ScrollView>
                    {typeof partidas === "undefined" ?
                        <ActivityIndicator animating={true} color={'#178f25'} /> :
                        partidas.map(jogo => {
                            return (
                                <View style={styles.itemList}>
                                    <List.Item key={jogo.nome}
                                        style={styles.list}
                                        title={jogo.partida_ida.placar}
                                        titleStyle={[styles.textList], { fontSize: 14 }}
                                        descriptionStyle={styles.textList}
                                        description={jogo.partida_ida.data_realizacao + ' ' + jogo.partida_ida.hora_realizacao}
                                        left={props => <List.Icon style={styles.escudo} {...props} icon={{ uri: jogo.partida_ida.time_mandante.escudo }} />}
                                        right={props => <List.Icon style={styles.escudo} {...props} icon={{ uri: jogo.partida_ida.time_visitante.escudo }} />}
                                    />
                                </View>
                            );
                        })
                    }
                </ScrollView>
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
        marginBottom: 10,
        textAlign: 'center'
    },
    image: {
        width: 105,
        height: 105
    },
    itemList: {
        padding: 2,
        marginBottom: 3,        
        borderWidth: 3,
        borderColor: '#2f6930',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    list: {
        width: 350
    },
    textList: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    escudo: {
        width: 10,
        height: 10
    }
})
