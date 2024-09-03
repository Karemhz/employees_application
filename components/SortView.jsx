import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import SelectItem from "./SelectItem"
import React from "react"
import { colors } from "../util/colors"
import { useNavigation } from "@react-navigation/native"


const SortView = ({selected, setSelected})=>{
    const { navigate } = useNavigation()
    return(
    <React.Fragment>
    <TouchableOpacity style={styles.createBtn} onPress={()=>navigate('EditEmployee')}>
        <Text style={styles.text}>Create New</Text>
    </TouchableOpacity>
    <View style={styles.container}>
        <Text style={styles.sortText}>Sort by: </Text>
        <View style={{flexDirection: 'row'}}>
            <SelectItem 
                text={'Name'} 
                selected={selected === 'name'}
                onPress={()=>setSelected('name')}
            />
            <SelectItem 
                text={'Age'} 
                selected={selected === 'age'}
                onPress={()=>setSelected('age')}
            />
            <SelectItem
                text={'Salary'} 
                selected={selected === 'salary'}
                onPress={()=>setSelected('salary')}
            />
        </View>
    </View>
    </React.Fragment>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 39
    },
    sortText: {
        color: '#000', 
        fontWeight: 'bold',
        marginLeft: 3
    },
    createBtn: {
        backgroundColor: colors.icons,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: '80%',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10
    },
    text: {
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default SortView