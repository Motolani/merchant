import { StyleSheet, Text, View, StatusBar, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import Ionic from 'react-native-vector-icons/Ionicons'

const Profile = () => {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#b3d9ff' barStyle="dark-content" animated={true} />
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} />
				</View>
			</View>
			<View style={[styles.body,{ margin: 20 }]}>
				<View style={styles.action}>
					<Awesome name='user-o' size={32} color="#0073e6" />
					<Text style={styles.actionName}> John Doe </Text>
				</View>

				<View style={styles.action}>
					<Awesome name='mobile-phone' size={32} color="#0073e6" />
					<Text style={styles.actionName}> 08111182419 </Text>
				</View>
			</View>

			<View style={styles.button}>
				<TouchableOpacity style={styles.signIn}>
					<LinearGradient colors={['#b3d9ff', '#0073e6']} style={styles.signIn}>
						<Ionic name='log-out-outline' size={32} color="#0073e6" />
						<Text style={[styles.textSign, {color:'#fff' }]}>Log Out</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>

		</View>
	)
}

export default Profile

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#b3d9ff',
		paddingTop:100
    },
	headerContent: {
		alignItems: 'center',
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "#0073e6",
		margin: 10,
	},
	action: {
        flexDirection: 'row',
        marginTop: 30,
        paddingBottom: 5,
    },
	actionName: {
		fontSize: 32,
		fontWeight: 'bold',
		color: "#0073e6",
		marginLeft:15
	},
	button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
		flexDirection: 'row',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
		marginLeft: 20,
    },
	icon: {
		width: 40,
		height: 40,
	},
	title: {
		fontSize: 18,
		marginLeft: 4
	},
	btn: {
		marginLeft: 'auto',
		width: 40,
		height: 40,
	},
	body: {
		backgroundColor: "#b3d9ff",
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
})