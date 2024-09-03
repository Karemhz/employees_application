import { useNavigation } from "@react-navigation/native"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomBottomSheet from "./BottomSheet/CustomBottomSheet"
import FilterView from "./FilterView"
import React, { useCallback, useMemo, useRef } from "react"
import { useSelector } from "react-redux"


const Header = ({title, backBtn, withFilter})=>{
    const { goBack } = useNavigation()
    const { all } = useSelector(state=>state.employees_data)
    const snapPoints = useMemo(() => ['70%'], [])
    const filterModalRef = useRef(null)
    const filterModalPress = useCallback(() => {
        filterModalRef.current?.present()
    }, []);
    const filterModalClose = useCallback(() => {
        filterModalRef.current?.close()
    }, []);
    

    return(
        <React.Fragment>
            {/* Filter */}
            <CustomBottomSheet 
                reference={filterModalRef} 
                title='Filter' 
                snapPoints={snapPoints}
            >
                <FilterView 
                    onClose={filterModalClose}
                />
            </CustomBottomSheet>
            {/* /* Container of header elements */}
            <View style={styles.header}>
              
                {/* Filter Button */}
                {all.length > 0 && withFilter && <TouchableOpacity 
                    style={[styles.btn, styles.right]}
                    onPress={filterModalPress}                    
                    >
                    <Ionicons name='filter-outline' size={25} color={'#000'}/>
                </TouchableOpacity>}
                {/* Header title */}
                <Text style={styles.headerText}>
                    {title}
                </Text>
                {/* Go Back Button */}
                {backBtn && <TouchableOpacity onPress={()=>goBack()} style={[styles.btn, styles.left]}>
                    <Icon name='chevron-left' size={25} color={'#000'}/>
                </TouchableOpacity>}
            </View>
        </React.Fragment>
    )
}



const styles = StyleSheet.create({
    header:{
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        position: 'absolute',
        alignItems: 'center',
        padding: 4
    },
    left: {
        left: 15,
    },
    right: {
        right: 15,
    },
    headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#525464'
    }
})



export default Header