import { useEffect, useState } from "react"
import { StyleSheet, SafeAreaView, FlatList, RefreshControl, View } from "react-native"
import Header from "../components/Header"
import InputSearch from "../components/Input/InputSearch"
import EmployeeCard from "../components/EmployeeCard"
import Loading from "../components/Loading"
import SortView from "../components/SortView"
import { filter_employees, sort_employees } from "../util/fn"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees } from "../state/slices/employees_thunk"
import { FAILED, LOADING } from "../util/status"
import { updateEmployees } from "../state/slices/employeesSlice"
import PrintError from "../components/PrintError"
import EmptyList from "../components/EmptyList"

const Employees = ()=>{

    const { employees, all, status, error} = useSelector(state=>state.employees_data)
    const { applied, ageFilter, salaryFilter, idFilter } = useSelector(state=>state.filters)
    const [refreshing, setRefreshing] = useState(false)
    const [keyword, setKeyword] = useState('') //Search keyword
    const [sortBy, setSortBy] = useState('')
    const dispatch = useDispatch()

    //Call getEmployees
    useEffect(() => {
    if (status === 'idle') 
       dispatch(fetchEmployees())
    if(status === LOADING) setRefreshing(true)
    else setRefreshing(false)
    if(status === FAILED) {
        PrintError(error)
        setRefreshing(false)
    }

    }, [dispatch, status, employees])
    

    //Search bu name
    const onSearchName = (name)=>{
        setKeyword(name)
        if(name.trim() === ''){
            if(applied){
                let data = filter_employees(all, ageFilter, salaryFilter, idFilter)
                console.warn(data)
                dispatch(updateEmployees(data))
                return
            }else
                return dispatch(updateEmployees(all))
        }
        let tmp = [...employees]
        tmp = tmp.filter(el=>el.employee_name.toUpperCase().startsWith(name.toUpperCase())) 
        dispatch(updateEmployees(tmp))

    }
    //refreshing
    const onRefresh = ()=>{
        setRefreshing(true)
        dispatch(fetchEmployees());
        return
    }

    const sortList = (key)=>{
        if(key === sortBy){
            setSortBy('')
            if(applied)
                return
            else
                dispatch(updateEmployees(all))
            return
        }
        setSortBy(key)
        const sorted = sort_employees(employees, key)
        dispatch(updateEmployees(sorted))
    }

    //Render List of Employee Card
    const renderEmployees = ({item})=>(
        <EmployeeCard 
            key={item.id}
            id={item.id}
            employee_name={item.employee_name}
            employee_age={item.employee_age}
            employee_salary={item.employee_salary}
            profile_image={item.profile_image}
        />
    )


    return(
        <SafeAreaView style={styles.container}>
            {/* Header with filter icon */}
            <Header 
                title={'Employees'} 
                withFilter={true} 
            />
            {/*  Search Input*/}
            <InputSearch 
                value={keyword}
                onChangeText={onSearchName}
            />           
            {/* Check if loading Employees Data */}
            {((status === LOADING) && !refreshing) && <Loading />}
            {/* Render Employees with flatlist */}
            <View style={styles.listContainer}>
            <FlatList 
                    ListEmptyComponent={EmptyList}
                    ListHeaderComponent={employees.length > 0 && <SortView selected={sortBy} setSelected={sortList}/>}
                    data={employees}
                    renderItem={renderEmployees}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
            />
            </View>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listContainer: {
        flex: 1,
        marginTop: 10
    }
})



export default Employees