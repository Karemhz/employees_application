import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import CustomBackdrop from './CustomBackdrop'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'

const CustomBottomSheet = ({
    reference,
    snapPoints,
    title,
    children
})=>{
    
    const onClose = ()=>{
        if(reference)
            reference.current?.close()
    }

    return(
        <BottomSheetModal
        backgroundStyle={{backgroundColor: '#fff'}}
        ref={reference}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        index={0}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backdropComponent={({ animatedIndex, style })=><CustomBackdrop 
            animatedIndex={animatedIndex} 
            style={style} 
            backdropRef={reference} 
        />}>
        
        <View style={styles.header}>
            <CloseBtn onClose={onClose}/>
            {title && <Text 
                style={styles.title}
            >{title}</Text>}
        </View>
           <ScrollView>
           {children}
           </ScrollView>
    </BottomSheetModal>
    )
}

const CloseBtn = ({onClose})=>{
    return(
        <TouchableOpacity onPress={onClose}>
            <Icon name={'x'} color='#000' size={24}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center', 
        paddingHorizontal: 20,
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#B0B0C3',
        paddingBottom: 15
    },
    title: {
        alignSelf: 'center', 
        textAlign: 'center', 
        flex: 1, 
        marginRight: 25, 
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    }
})


export default CustomBottomSheet