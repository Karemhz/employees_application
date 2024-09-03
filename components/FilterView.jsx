import { View } from "react-native"
import InputSlider from "./Input/InputSlider"
import InputIdSearch from "./Input/InputIdSearch"
import PrimaryButton from "./Button/PrimaryButton"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateEmployees } from "../state/slices/employeesSlice"
import { applyFilter, initFilters, resetFilter, updateAgeFilter, updateIdFilter, updateSalaryFilter } from "../state/slices/filterSlice"
import { filter_employees } from "../util/fn"

const FilterView = ({
    onClose
})=>{
    const { all } = useSelector(state=>state.employees_data)
    const { ageFilter, salaryFilter, idFilter, applied } = useSelector(state=>state.filters)
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        if(!ageFilter.min || !ageFilter.max)
            dispatch(initFilters(all))

        if(applied)
            onPressApply()
    },[all, applied])


    const onChangeAgeFilter = (range)=>{
        dispatch(updateAgeFilter({
            min: range.min,
            max: range.max,
            position: range.position,
            position2: range.position2
        }))
    }   
    const onChangeSalaryFilter = (range)=>{
        dispatch(updateSalaryFilter({
            min: range.min,
            max: range.max,
            position: range.position,
            position2: range.position2
        }))
    }   

    const onPressApply = ()=>{
        let data = filter_employees(all, ageFilter, salaryFilter, idFilter)
        dispatch(updateEmployees(data))
        dispatch(applyFilter())
        onClose()
    }

    const onResetFilter = ()=>{
        dispatch(resetFilter())
        dispatch(updateEmployees(all))
        onClose()
    }

    const onChangeId = (t)=>{
        dispatch(updateIdFilter(t))
        if(applied){
            let data = filter_employees(all, ageFilter, salaryFilter, t)
            dispatch(updateEmployees(data))
        }
    }

    return(
        <View style={{marginTop: 25}}>
            <InputIdSearch 
                value={idFilter}
                onChangeText={onChangeId}
            />
            <InputSlider 
                label={'Age'} 
                max={Math.max(...all.map(o => o.employee_age))}
                min={Math.min(...all.map(o => o.employee_age))}
                onChangeValue={onChangeAgeFilter}
                value={ageFilter}

            />
            <InputSlider 
                label={'Salary'} 
                max={Math.max(...all.map(o => o.employee_salary))}
                min={Math.min(...all.map(o => o.employee_salary))}
                onChangeValue={onChangeSalaryFilter}
                value={salaryFilter}
            />
            {!applied && <PrimaryButton 
                onPress={onPressApply} 
                title='Apply Filter' 
            />}
            {applied && <PrimaryButton 
                onPress={onResetFilter} 
                title='Reset Filter' 
                style={{backgroundColor: 'darkred'}}
            />}

        </View>
    )
}


export default FilterView