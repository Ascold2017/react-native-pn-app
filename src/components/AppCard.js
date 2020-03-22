import React from 'react'
import { StyleSheet, View } from 'react-native';

export default ({ children, style = {}, ...etc }) => (<View {...etc} style={{ ...style, ...styles.card }}>{children}</View>)

const styles = StyleSheet.create({
    card: {
        elevation: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 3
    }
})