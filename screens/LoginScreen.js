import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));

    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                 uri: 
                    "https://i.pinimg.com/originals/51/e7/d3/51e7d346174b270a016ae2ed52eb40b6.jpg",
            }}
            style={{ width: 100, height: 50 }}
        />
        <View style={styles.inputContainer}>
               

                <Input 
                placeholder='email' 
                type='email' 
                value={email} 
                onChangeText={(text) => setEmail(text)}    
                />

                <Input 
                placeholder='password' 
                type='password'
                secureTextEntry 
                value={password} 
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />

        

        </View>
        <Button 
            containerStyle={styles.button} 
            onPress={signIn} 
            title="Login"
            color="black" 

        />
        <Button 
            onPress={() => navigation.navigate("Register")} 
            containerStyle={styles.button} 
            type="outline" 
            title="Register" 
        />
        <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
        
        
        
        
    },

});
