import {View,Text,StyleSheet,FlatList} from 'react-native';
import { useData } from '../contexts/DataContext';
import BookCard from '../components/BookCard';
import { FAB } from 'react-native-paper';
export default function Books()
{
    const {data}=useData();
    return(
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id }
                renderItem={({item})=>(<BookCard data={item} />)}
                ListEmptyComponent={()=><View style={styles.noBookAvailableContainer}><Text>No Books Available</Text></View>}
                ItemSeparatorComponent={() => <View style={{ height: 5}} />}
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