import {View,Text,StyleSheet,FlatList} from 'react-native';
import { useData } from '../contexts/DataContext';
import BookCard from '../components/BookCard';
import { FAB } from 'react-native-paper';
import { useState } from 'react';
export default function Books()
{
    const {data,remove,add, update, reloadStaticData}=useData();
    const [refresh,setRefresh]=useState(false);
    const onDelete=(id)=>{
        remove(id);
    }
    const refreshData=async()=>{
        setRefresh(true);
        await reloadStaticData();
        setRefresh(false);
    }
    return(
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id }
                renderItem={({item})=>(<BookCard data={item} onDelete={onDelete} />)}
                ListEmptyComponent={()=><View style={styles.noBookAvailableContainer}><Text>No Books Available</Text></View>}
                ItemSeparatorComponent={() => <View style={{ height: 5}} />}
                refreshing={refresh}
                onRefresh={refreshData}
            />
            <FAB icon="plus" style={styles.fab}/>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    noBookAvailableContainer:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fab:
    {
        position:'absolute',
        bottom:70,
        right:30,
        borderRadius:"50%"
    }
})