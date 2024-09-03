import { Image, View, StyleSheet } from "react-native"
import EmptyImage from '../assets/images/empty.jpeg'


const EmptyList = ()=>{
    return(
        <View style={styles.emptyView}>
            <Image source={EmptyImage} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyView: {
        height: 400, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    image: {
        width: 150, 
        height: 150,
        resizeMode: 'cover'
    }
})


export default EmptyList