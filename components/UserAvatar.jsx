import { View, StyleSheet, Text } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { colors } from "../util/colors"


const UserAvatar = ({name, id})=>{


    return(
        <View style={styles.centerView}>
            <View style={styles.avatar}>
                <FontAwesome name='user' size={75} color={colors.icons}/>
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {name}
                </Text>
                {id && <Text style={styles.id}>
                    ID: {id}
                </Text>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E2E0',
    },
    centerView: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    nameContainer: {
        marginVertical: 15
    },
    name: {
        color: colors.text,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
        maxWidth: 300
    },
    id: {
        color: colors.text,
        fontSize: 16,
        textAlign: 'center'
    },
})



export default UserAvatar