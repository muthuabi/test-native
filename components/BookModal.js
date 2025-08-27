import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { TextInput, Button } from 'react-native-paper';

export default function BookModal({ visible, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        price: "",
        isbn: "",
        tag: "",
        details: ""
    });

    // Load data for edit
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                author: "",
                price: "",
                isbn: "",
                tag: "",
                details: ""
            });
        }
    }, [initialData, visible]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isVisible={visible} onBackdropPress={onClose}>
            <View style={styles.bookForm}>
                <Text style={styles.heading}>{initialData ? "Edit Book" : "Add Book"}</Text>

                <TextInput label="Name" value={formData.name} onChangeText={val => handleChange("name", val)} style={styles.input} />
                <TextInput label="Author" value={formData.author} onChangeText={val => handleChange("author", val)} style={styles.input} />
                <TextInput label="Price" value={formData.price} onChangeText={val => handleChange("price", val)} keyboardType="numeric" style={styles.input} />
                <TextInput label="ISBN" value={formData.isbn} onChangeText={val => handleChange("isbn", val)} style={styles.input} />
                <TextInput label="Tag" value={formData.tag} onChangeText={val => handleChange("tag", val)} style={styles.input} />
                <TextInput label="Details" value={formData.details} onChangeText={val => handleChange("details", val)} multiline style={styles.input} />

                <View style={styles.actions}>
                    <Button mode="outlined" onPress={onClose}>Cancel</Button>
                    <Button mode="contained" onPress={handleSave}>{initialData ? "Update" : "Add"}</Button>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    bookForm: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    input: {
        marginBottom: 10
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
});
