import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'

const fakeData = [{
    name: 'Test Album',
    artist: 'Test Artist',
    price: '9.99$',
    image: 'https://picsum.photos/200'
}, {
    name: 'Test Album 2',
    artist: 'Test Artist 2',
    price: '9.99$',
    image: 'https://picsum.photos/200'
}]

const IndexScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    handleSearch = () => {
        if (searchText) {
            const text = encodeURIComponent(searchText)
            requestSearch(text)
        }
    }

    requestSearch = async (txt) => {
        setLoading(true)

        fetch(`https://itunes.apple.com/search?term=${txt}&entity=album`)
            .then((response) => response.json())
            .then((json) => {
                if (json.resultCount == 0) {
                    alert('No results found.')
                } else {
                    const tempData = json.results.map(r => (
                        {
                            id: r.collectionId,
                            name: r.collectionName,
                            artist: r.artistName,
                            price: r.collectionPrice,
                            image: r.artworkUrl100,
                            currency: r.currency
                        }
                    ))

                    navigation.navigate('Results', { data: tempData })
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false)
            });
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'rgba(0,0,0,0.5)']}
                style={styles.gradient}
            />
            <TextInput style={styles.input} autoCorrect={false} autoFocus={true}
                placeholder="Text to search"
                value={searchText}
                onChangeText={(txt) => setSearchText(txt)} />
            <TouchableOpacity disabled={loading} style={styles.button} onPress={handleSearch}>
                <Text style={styles.inputText} >{loading ? 'Searching...' : 'Search'}</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A5FF',
        color: '#FFFFFF',
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.19)',
        borderRadius: 8,
        color: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        fontSize: 16
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
    },
    inputText: {
        color: '#00A5FF',
        fontWeight: '700',
        fontSize: 18,
    },
})

export default IndexScreen