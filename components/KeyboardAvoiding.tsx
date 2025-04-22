import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

export const KeyboardAvoidingComponent = ({children}: any) => {
    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={0}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{flex: 1}}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}