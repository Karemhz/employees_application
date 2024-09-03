import { Image, Text, View, TextInput, StyleSheet } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from "../../util/colors"
const Input = ({
    label, 
    value,
    onChangeText,
    image,
    disabled,
    icon,
    type
})=>{

    return(
        <View style={styles.inputContainer}>
            <View style={styles.inputIconView}>
                {icon ? <FontAwesome name='user' size={35} color={colors.icons}/> : <Image source={image} style={styles.inputIcon}/>}
            </View>
            <View style={styles.inputLabelView}>
                <Text style={styles.label}>{label}</Text>
                <TextInput 
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    selectTextOnFocus={disabled ? false : true}
                    editable={disabled ? false : true}
                    keyboardType={type}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#979797',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4
    },
    inputIconView: {
        width: 70,
        height: 60,
        borderRightWidth: 1,
        borderColor: '#979797',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputIcon: {
        width: 30,
        height: 30
    },
    inputLabelView:{
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10
    },
    input: {
        height: 40,
        textAlign: 'left',
        color: '#fff'
    },
    label: {
        marginBottom: 2,
        marginLeft: 2,
        color: 'rgba(255,255,255,0.45)',
        fontWeight: 'bold'
    }
})

export default Input