import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from "../firebase";
import firebase from "firebase/app";


const ChatScreen = ({ navigation, route }) => {
    const  [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                    >
                    <Avatar 
                    rounded 
                    source={{ 
                        uri: messages[0]?.data.photoURL || 
                        "https://image.flaticon.com/icons/png/512/53/53104.png",
                        }} 
                        /> 
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                    {route.params.chatName}
                    </Text> 
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" /> 
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }), [navigation, messages];

    const sendMessage = ()=> {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });

        setInput("");
    }; 

    useLayoutEffect(() => {
        const unsubscibe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()

            }))
        ));
        return unsubscibe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={90}
            >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <>
                <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                    {messages.map(({ id, data }) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                            <Avatar
                                position="absolute"
                                bottom={-15}
                                right={-5}
                                rounded
                                size={30}
                                source={{
                                    uri: data.photoURL,
                                }}
                                //web design
                                containerStyle={{
                                    position: "absolute",
                                    bottom: -15,
                                    right: -5,         
                                }}

                            />
                            <Text style={styles.recieverText}>{data.message}</Text>

                            </View>
                        ): (
                            <View key={id}  style={styles.sender}>
                            <Avatar
                                position="absolute"
                                bottom={-15}
                                right={-5}
                                rounded
                                size={30}
                                source={{
                                    uri: data.photoURL,
                                }}
                                //web design
                                containerStyle={{
                                    position: "absolute",
                                    bottom: -15,
                                    right: -5,         
                                }}    
                             />
                            <Text style={styles.senderText}>{data.message}</Text>
                            <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>

                        )
                    ))}
                     
                </ScrollView>
                <View style={styles.footer}>
                <TextInput 
                    value={input} 
                    onChangeText={(text) => setInput(text)}
                    onSubmitEditing={sendMessage}
                    placeholder="Message" 
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="black" />  
                </TouchableOpacity>
                </View>
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ece8ed",
        borderRadius: 4,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
        alignSelf: "flex-end", 
    },
    sender: {
        padding: 15,
        backgroundColor: "#b3f5c4",
        borderRadius: 4,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
        alignSelf: "flex-start",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ece8ed",
        padding: 10,
        color: "grey",
        borderRadius: 4,

    },

});
