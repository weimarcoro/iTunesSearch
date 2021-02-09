import React from 'react'
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native'

const Card = ({info}) =>  {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image defaultSource={require('../assets/images/empty.png')}
                    source={{uri: info.image}} 
                    style={styles.img} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameLabel}>{info.name}</Text> 
                <Text style={styles.artistLabel}>{info.artist}</Text>
                <Text style={styles.priceLabel}>{`${info.currency} ${info.price}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRightColor: '#00A5FF',
        borderRightWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftColor: '#00A5FF',
        borderLeftWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    imageContainer: {
        width: '30%',
        height: Dimensions.get('window').width * 0.3,
        borderWidth: 0,
        borderRadius: 5,
        overflow: 'hidden'
    },
    textContainer: {
        flexDirection: 'column',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    img: {
        flex: 1
    },
    nameLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    artistLabel: {
        fontSize: 15
    },
    priceLabel: {
        fontWeight: 'bold',
        fontSize: 12
    }
})

export default Card