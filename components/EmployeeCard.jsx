import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from "../util/colors"
const EmployeeCard = ({
    id,
    employee_name,
    employee_salary,
    employee_age,
    profile_image
})=>{
    const { navigate } = useNavigation()

    const onPress = ()=>{
        navigate('EmployeeDetails', {
            employee_name,
            employee_age,
            employee_salary,
            id
        })
    }

    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.imageContainer}>
                <FontAwesome name='user' size={28} color={colors.icons}/>
            </View>
            <Text numberOfLines={1} style={styles.employee_name}>{employee_name}</Text>
            <Icon name='chevron-right' size={25} color={'#000'}/>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#E2E2E0',
        marginTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    imageContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E2E0',
        borderColor: '#979797',
    },
    employee_name: {
        fontSize: 15,
        fontWeight: 'bold',
        maxWidth: 200,
        textAlign: 'center',
        color: colors.text,
    }
})


export default EmployeeCard