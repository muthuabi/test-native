import {View,Text,StyleSheet} from 'react-native';
import {useState,useEffect} from 'react';
import Modal from 'react-native-modal';
export default function BookModal()
{
    const [visible,setVisible]=useState(false);
    const toggleModal=()=>setVisible(prev=>!prev);
    const [formData,setFormData]=useState({});
    return(
        <View style={styles.container}>
            <Modal isVisible={visible}
                    onDismiss={toggleModal}
                    onBackdropPress={toggleModal}
            >
                <View style={styles.bookForm}>
                    {/* Complete in Tommorow's Lab */}
                </View>
            </Modal>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    bookForm:
    {

    }
})