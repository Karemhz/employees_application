import { StyleSheet, Text, TextInput, View } from "react-native"

const InputIdSearch = ({onChangeText, value})=>{



    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                ID
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="ID"
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                style={styles.input}
                keyboardType="numeric"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: 300,
        alignSelf: 'center',
        marginBottom: 10,
    },
    label: {
        color: '#000', 
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        width: 200,
        alignSelf: 'center',
        borderRadius: 4,
        textAlign: 'center',
        marginBottom: 10,
        borderColor: '#B0B0C3',
        color: '#000',
        height: 45
    }
})

export default InputIdSearch