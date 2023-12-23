import { Drawer } from 'expo-router/drawer';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
 

export default function Layout() {
    return (
        <Drawer screenOptions={{headerShown: false}}>
            <Drawer.Screen 
            name="learn" 
            options={{
                drawerLabel: 'Learn',
                drawerTitle: 'Learn',
                drawerIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name="card-multiple" size={size} color={color} />
                ),
            }} />
            <Drawer.Screen 
            name="manage" 
            options={{
                drawerLabel: 'Manage',
                drawerTitle: 'Manage',
                drawerIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name="archive-edit" size={size} color={color} />
                ),
            
            }} />
            {/*
            <Drawer.Screen 
            name="settings" 
            options={{
                drawerLabel: 'Settings',
                drawerTitle: 'Settings',
                drawerIcon: ({ focused, color, size }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                ),
            }} />
             */}
        </Drawer>
    );
}
