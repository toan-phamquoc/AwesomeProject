import React, { Component } from "react";
import {
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
	StyleSheet, // CSS-like styles
	Text, // Renders text
	View,
	ToastAndroid
} from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Dimensions from 'Dimensions';
import ImagePicker from 'react-native-image-picker';
import MyFirebase from '../../services/Firebase';

export default class EditProfileScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: props.navigation.state.params.currentUser,
			phoneNumber: props.navigation.state.params.currentUser.phoneNumber,
			displayName: props.navigation.state.params.currentUser.displayName,
			photoURL: props.navigation.state.params.currentUser.photoURL,
			newAvatar: null
		}
		console.log('edit usser', this.state.currentUser);
	}

	selectImage() {
		const options = {
			title: 'Select Avatar',
			//customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.showImagePicker(options, (response) => {
			//console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				// } else if (response.customButton) {
				// 	console.log('User tapped custom button: ', response.customButton);
			} else {
				console.log('link img', response);
				this.setState({
					newAvatar: {
						filename: response.fileName,
						path: response.path
					},
					photoURL: response.uri,
				});
			}
		});
	}

	async onUpdatePress() {
		let profile = {
			displayName: this.state.displayName,
			phoneNumber: this.state.phoneNumber,
		};

		if (this.state.newAvatar) {
			profile.photoURL = await MyFirebase.uploadAvatar(this.state.newAvatar.path, this.state.newAvatar.fileName);
		};

		await MyFirebase.updateUserProfile(profile);
		ToastAndroid.showWithGravity('Update successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER)
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.avatar}>
					<TouchableOpacity onPress={() => this.selectImage()}>
						<Image
							style={{
								paddingVertical: 30,
								width: 100,
								height: 100,
								borderRadius: 75
							}}
							resizeMode='cover'
							source={{
								uri: this.state.photoURL
							}}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.formWrapper}>
					<FormLabel>Name</FormLabel>
					<FormInput inputStyle={styles.inputText}
						placeholder="Display name"
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false}
						placeholderTextColor="gray"
						underlineColorAndroid="transparent"
						onChangeText={displayName => this.setState({ displayName })}
						value={this.state.displayName} />
					<FormValidationMessage></FormValidationMessage>
				</View>
				<View style={styles.formWrapper}>
					<FormLabel>Phone Number</FormLabel>
					<FormInput inputStyle={styles.inputText}
						value={this.state.phoneNumber}
						placeholder="Phone number"
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false}
						placeholderTextColor="gray"
						underlineColorAndroid="transparent"
						textContentType='telephoneNumber'
						value={this.state.phoneNumber}
						keyboardType='numeric'
						onChangeText={phoneNumber => this.setState({ phoneNumber })} />
					<FormValidationMessage></FormValidationMessage>
				</View>
				<View style={styles.buttonWrapper}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => this.onUpdatePress()}
					>
						<Text style={styles.text}>UPDATE</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView >
		);
	}
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	},
	formWrapper: {
		flex: 0.5,
		margin: 0,
		//alignItems: 'center',
		justifyContent: 'flex-start',
	},
	buttonWrapper: {
		flex: 1,
		margin: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
		width: DEVICE_WIDTH - 40,
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	avatar: {
		margin: 10,
		flex: 1
	},
	inputText: {
		width: DEVICE_WIDTH - 40,
		//height: 40,
		//marginHorizontal: 20,
		//paddingLeft: 15,
		//borderRadius: 20,
		color: '#000000',
	},
});
