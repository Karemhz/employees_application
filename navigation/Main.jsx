import Employees from '../screens/Employees';
import EmployeeDetails from '../screens/EmployeeDetails';
import { createStackNavigator } from '@react-navigation/stack';
import EditEmployee from '../screens/EditEmployee';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName='Employees' screenOptions={{headerShown: false}}>
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
      <Stack.Screen name="Employees" component={Employees} />
    </Stack.Navigator>
  );
}


export default StackNavigation