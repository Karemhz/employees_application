import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"

const OutlineButton = ({onPress, title, style, loading})=>{

    return(
        <TouchableOpacity 
            style={[styles.container, style ? style : {}]} 
            onPress={onPress}
            disabled={loading}
        >
             {loading ? <ActivityIndicator size={'small'} color={'#FF7074'}/> : <Text style={styles.text}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        width: 100, 
        borderWidth: 1, 
        borderColor: '#FF7074',
        borderRadius: 3
    },
    text: {
        color: '#FF7074', 
        fontSize: 16,
        fontWeight: 'bold'
    }
}) 


export default OutlineButton