import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'


const PrimaryButton = ({onPress, title, style, loading, disabled})=>{


    return(
        <TouchableOpacity 
            disabled={disabled}
            style={[styles.container, style ? style : {}]} 
            onPress={onPress}
        >
            {loading ? <ActivityIndicator size={'small'} color={'#fff'}/> : <Text style={styles.text}>
                {title}
            </Text>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 3,
        backgroundColor: '#20C3AF',
        width: 300,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginTop: 35
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default PrimaryButton