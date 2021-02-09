import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native'
import { useState } from 'react/cjs/react.development'
import Card from '../components/Card'

const ResultsScreen = ({ navigation, route }) => {
    const [numberItems, setNumberItems] = useState(10)
    const { data } = route.params
    const [page, setPage] = useState(0)
    const [orderAsc, setOrderAsc] = useState(true)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100, height: 20 }}>
                    <Text>{orderAsc ? 'A-Z' : 'Z-A'}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={orderAsc ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setOrderAsc(prev => !prev)}
                        value={orderAsc}
                    />
                </View>
            ),
        })
    }, [navigation, orderAsc]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.itemContainer}>
                {
                    data.sort((a, b) => {
                        if (a.name < b.name) { return orderAsc ? -1 : 1; }
                        if (a.name > b.name) { return orderAsc ? 1 : -1; }
                        return 0;
                    }).slice((page * numberItems), (page * numberItems) + numberItems).map((item) => (
                        <Card key={item.id} info={item} />
                    ))
                }
            </ScrollView>
            <View style={styles.control}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity disabled={page === 0} style={styles.button} onPress={() => setPage(page - 1)} >
                        <Text style={styles.inputText} >{"<< "}</Text>
                    </TouchableOpacity>
                    <Text style={styles.inputText}>{`Showing... ${page * numberItems + 1} to ${(page * numberItems) + numberItems} of ${data.length} items`}</Text>
                    <TouchableOpacity disabled={(page + 1) * numberItems >= data.length} style={styles.button} onPress={() => setPage(page + 1)} >
                        <Text style={styles.inputText} >{" >>"}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setNumberItems(data.length)
                    setPage(0)
                }} >
                    <Text style={styles.inputText} >Show All</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    itemContainer: {
        flex: 1,
    },
    button: {
        borderRadius: 8,
    },
    inputText: {
        color: '#00A5FF',
        fontWeight: '400',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    control: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default ResultsScreen