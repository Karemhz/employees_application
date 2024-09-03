import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import AgeIcon from '../assets/images/age.png'
import SalaryIcon from '../assets/images/salary.png'
import Input from "../components/Input/InputField"
import UserAvatar from "../components/UserAvatar"
import PrimaryButton from "../components/Button/PrimaryButton"
import OutlineButton from "../components/Button/OutlineButton"
import { useDispatch, useSelector } from "react-redux"
import { deleteEmployee } from "../state/slices/employees_thunk"
import { resetEmployeeStatus } from "../state/slices/employeesSlice"
import { DELETED, FAILED } from "../util/status"
import PrintError from "../components/PrintError"


const EmployeeDetails = ()=>{
    const { params } = useRoute()
    const [employee_name, setEmployeeName] = useState(params.employee_name)
    const [employee_age, setEmployeeAge] = useState(params.employee_age.toString())
    const [employee_salary, setEmployeeSalary] = useState(params.employee_salary.toString())
    const { employee_status, employee_error, employee_loading } = useSelector(state=>state.employees_data)
    const { navigate, popToTop } = useNavigation()
    const dispatch = useDispatch()

    const onPressEdit = ()=>{
        navigate('EditEmployee', {             
            employee_name,
            employee_age,
            employee_salary,
            id: params.id
        })
    }

    useEffect(()=>{
        switch(employee_status){
            case FAILED:
                PrintError(employee_error)
                dispatch(resetEmployeeStatus())
                return
            case DELETED:
                dispatch(resetEmployeeStatus())
                Alert.alert(
                    'Deleted',
                    `Employee ${employee_name} has been deleted!`,
                    [{text: 'OK', onPress: () => popToTop()}],
                  );
                break;
            default:
                break
        }
    },[dispatch, employee_status])

    const onPressDelete = ()=>{
        function onConfirm() {
            dispatch(deleteEmployee(params.id))
        }
        Alert.alert(
            'Delete Employee',
            `Are you sure you want to delete employee ${employee_name}?`,
            [
                {text: 'Cancel', onPress: () => {}},
                {text: 'Yes', onPress: onConfirm},
            ]
          );
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header 
                title={'Employee Details'} 
                backBtn 
            />
            <ScrollView>
                <UserAvatar 
                    name={employee_name}
                    id={params.id}
                />
                <View style={styles.btnsContainer}>
                    <OutlineButton 
                        title={'Delete'} 
                        onPress={onPressDelete}
                        loading={employee_loading}
                    />
                    <PrimaryButton 
                        title={'Edit'} 
                        style={{width: 100, marginTop: 0}} 
                        onPress={onPressEdit}
                        disabled={employee_loading}
                    />
                </View>
                <View style={styles.form}>
                    <View style={styles.infoView}>
                       <Input 
                            label={'Age'}
                            image={AgeIcon}
                            disabled={true}
                            value={employee_age}
                       />
                       <Input
                            label={'Salary'}
                            image={SalaryIcon}
                            disabled={true}
                            value={employee_salary}
                       />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#525464'
    },
    infoView: {
        width: '100%',
        marginTop: 40
    },
    form: {
        marginHorizontal: 30
    },
    btnsContainer: {
        flexDirection: 'row',
         alignItems: 'center', 
         justifyContent: 'space-around', 
         backgroundColor: '#fff', 
         paddingVertical: 20
    }
    
    
})

export default EmployeeDetails