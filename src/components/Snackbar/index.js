import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar, Button } from "react-native-paper";

const Hello = (props) => {
    return (
        <View style={styles.container}>
            <Snackbar
                visible={props.open}
                onDismiss={props.close}
            >
                {props.message}
            </Snackbar>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
export default Hello;