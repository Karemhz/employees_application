import { StyleSheet, Text, View } from "react-native"
import RangeSlider from "../Slider/RangeSlider";
import { useState } from "react";

const InputSlider = ({label, min = 0, max = 0, onChangeValue, value})=>{
    return(
        <View style={styles.container}>
            <View style={styles.labelView}>
                <Text style={styles.label}>
                    {label}
                </Text>
            </View>
             <RangeSlider
                sliderWidth={300}
                min={min}
                max={max}
                step={1}
                onValueChange={onChangeValue}
                firstPosition={value.position}
                secondPosition={value.position2}
            />
            <View style={styles.valueContainer}>
                <Text style={styles.text}>{value.min} / {min}</Text>
                <Text style={styles.text}>{value.max} / {max}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'center',
        width: 305,
        marginBottom: 20
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10 
    },
    text: {
        color: '#000',
        fontWeight: 'bold'
    },
    labelView: {
        marginBottom: 10
    },
    label: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    }
})

export default InputSlider