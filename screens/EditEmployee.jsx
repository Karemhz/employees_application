import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import AgeIcon from '../assets/images/age.png'
import SalaryIcon from '../assets/images/salary.png'
import Input from "../components/Input/InputField"
import UserAvatar from "../components/UserAvatar"
import PrimaryButton from "../components/Button/PrimaryButton"
import { useDispatch, useSelector } from "react-redux"
import { validate } from "../util/fn"
import { createEmployee, updateEmployee } from "../state/slices/employees_thunk"
import PrintError from "../components/PrintError"
import { CREATED, FAILED, UPDATED } from "../util/status"
import { resetEmployeeStatus } from "../state/slices/employeesSlice"


const EditEmployee = ()=>{
    const { params } = useRoute()
    const [employee_name, setEmployeeName] = useState('')
    const [employee_age, setEmployeeAge] = useState('')
    const [employee_salary, setEmployeeSalary] = useState('')
    const { employee_status, employee_error, employee_loading } = useSelector(state=>state.employees_data)
    const dispatch = useDispatch()
    const { popToTop } = useNavigation()


    useEffect(() => {

        switch(employee_status){
            case FAILED:
                PrintError(employee_error)
                dispatch(resetEmployeeStatus())
                break;
            case UPDATED:
                dispatch(resetEmployeeStatus())
                Alert.alert(
                    'Updated',
                    `Employee information with ID: ${params.id} has been updated!`,
                    [{text: 'OK', onPress: () => popToTop()}],
                );
                break;
            case CREATED:
                dispatch(resetEmployeeStatus())
                Alert.alert(
                    'Created',
                    `Employee ${employee_name} has been created!`,
                    [{text: 'OK', onPress: () => popToTop()}],
                );
                break;
            default:
                break
        }

    
    }, [dispatch, employee_status, employee_loading])

    useEffect(()=>{
        if(params?.id){
            setEmployeeName(params.employee_name)
            setEmployeeAge(params.employee_age.toString())
            setEmployeeSalary(params.employee_salary.toString())
        }
    },[])

    const onPressSave = ()=>{
        //Validate employee data
        let validate_error = validate(employee_name, employee_age, employee_salary)
        if(validate_error.length > 0){
            Alert.alert(
                'Validation Error',
                validate_error,
                [{text: 'OK', onPress: () => {}}],
              );
        }else{
            //Check if update or create
            if(params?.id)
                dispatch(updateEmployee({
                    id: params.id,
                    employee_name,
                    employee_age,
                    employee_salary
                }))
            else
                dispatch(createEmployee({
                    employee_name,
                    employee_age,
                    employee_salary
                }))
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header 
                title={params?.id ? 'Edit Employee' : 'New Employee'} 
                backBtn 
            />
            <ScrollView>
                <UserAvatar 
                    name={employee_name}
                    id={params?.id}
                />
                <View style={styles.form}>
                    <View style={styles.infoView}>
                       <Input 
                            label={'Employee Name'}
                            icon={true}
                            disabled={employee_loading}
                            value={employee_name}
                            onChangeText={(name) => setEmployeeName(name)}
                       />
                       <Input 
                            label={'Employee Age'}
                            image={AgeIcon}
                            disabled={employee_loading}
                            value={employee_age}
                            onChangeText={(age) => setEmployeeAge(age)}
                            type={"number-pad"}
                       />
                       <Input
                            label={'Employee Salary'}
                            image={SalaryIcon}
                            disabled={employee_loading}
                            value={employee_salary}
                            type={"number-pad"}
                            onChangeText={(salary) => setEmployeeSalary(salary)}

                       />
                    </View>
                </View>
                <PrimaryButton 
                    onPress={onPressSave} 
                    title={params?.id ? 'Save' : 'Create'}  
                    style={styles.save}
                    loading={employee_loading}
                    disabled={employee_loading}
                />
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
        //marginTop: 20,
        marginHorizontal: 30
    },
    save: {
        marginBottom: 60, marginTop: 20
    }
    
    
})

export default EditEmployee