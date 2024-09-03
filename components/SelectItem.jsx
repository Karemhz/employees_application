import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors } from '../util/colors'


const SelectItem = ({selected, onPress, text})=>{
    return(
        <TouchableOpacity 
            style={[styles.container, selected ? styles.selected : {}]}
            onPress={onPress}
        >
            <Text style={[styles.text, !selected &&  {color: '#000'}]}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
        marginRight: 2
    },
    text: {
        color: '#fff',
    },
    selected: {
        backgroundColor: colors.icons
    }
})

export default SelectItem