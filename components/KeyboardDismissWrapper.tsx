import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

export default function KeyboardDismissWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {children}
        </KeyboardAvoidingView>
    );
}
