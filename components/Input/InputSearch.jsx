import { View, StyleSheet, TextInput } from "react-native"
import Icon from 'react-native-vector-icons/Feather'

const InputSearch = ({value, onChangeText})=>{


    return(
        <View style={styles.inpContainer}>
            <Icon name='search' size={24} color={'#000'}/>
            <TextInput 
                style={styles.input}
                placeholder="Search by name"
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#B0B0C3'}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inpContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10, 
        backgroundColor: '#F7F7F7',
        borderColor: '#B0B0C3',
        borderRadius: 4,
        height: 45
    },
    input:{
        flex: 1,
        width: 250,
        marginLeft: 10,
        color: '#000'
    }
})



export default InputSearch