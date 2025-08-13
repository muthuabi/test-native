import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Modal } from 'react-native-modal';
import { Card,Chip,Button,Icon } from "react-native-paper";

export default function BookCard({ data,onDelete }) {
    return (
        <Card>
            <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
            <Card.Title title={data.name} subtitle={data.author}/>
            <Card.Content style={styles.cardContent}>
                <Text style={styles.paragraph}>{data.details}</Text>
                <View style={styles.chipContainer}>
                    <Chip icon="currency-inr" mode="outlined" style={styles.chip}>{data.price}</Chip>
                    <Chip style={styles.chip}>{data.tag}</Chip>
                </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Button icon="pencil" >Edit</Button>
                <Button icon="delete" onPress={()=>onDelete(data.id)}>Delete</Button>
            </Card.Actions>
        </Card>);
}
const styles=StyleSheet.create({
    paragraph:{
        fontWeight:"light",
        fontStyle:"italic"
    },
    chip:
    {
        alignSelf:'flex-start'
    }
    ,
    chipContainer:{
        flexDirection:'row',
        gap:10
    },
    cardContent:{
        gap:10
    }

})