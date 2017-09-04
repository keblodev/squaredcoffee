import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../../actions';

import { Hoshi } from 'react-native-textinput-effects';

import Foect from 'foect';

export default ({action, formControls}) => {
	const formControlInputs = [];
	return (
		<ScrollView
				contentContainerStyle={{
					...styles.container,
				}}
				style={{
					height: '100%',
					width: '100%'
				}}
			>
			<View
					style={{
						width: '90%',
						overflow: 'hidden',
					}}
				>
				<Foect.Form
					defaultValue={{
						email: 'john@doe.com',
						password: 'J1@doe.com',
						password_confirmation: 'J1@doe.com'
					}}
					onValidSubmit={model => {
						console.log(model); // { fullName: 'John Doe', email: 'john@doe.com' ... }
						action.actionCb({...model})
					}}
				>
				{ /* you can use form for triggering submit or checking form state(form.isSubmitted, form.isValid, ...) */ }
				{ form => (
					<View>
					{ /* every Foect.Control must have a name and optionally validation rules */ }
					{
						formControls.map((item, idx)=> {
							const isLast = idx === formControls.length-1;
							return (

								<Foect.Control
									key={idx}
									name={item.name}
									required={item.isRequired}
									pattern={item.pattern}
                                    equalToControl={item.equalToControl || item.name}
                                >
									{ control => (
									<View>
										<View
											style={{
												marginTop: 10,
												marginBottom: 10
											}}
										>
											<Hoshi
												style={{
													borderBottomColor: 'gray',
												}}
												ref={input => { formControlInputs[idx] = input; }}
												label={item.label}
                                                disabled={action.disabled}
                                                editable={!action.disabled}
												// TextInput props
												borderColor={ control.isTouched && control.isInvalid ? '#ab3434' : '#313744'}
												keyboardType={item.keyboardType}
												returnKeyType={ isLast ? "done" : "next"}
												secureTextEntry={item.secureTextEntry}
												autoCorrect={false}
												onBlur={control.markAsTouched}
												onChangeText={(text) => control.onChange(text)}
												value={control.value}
												onKeyPress={({ nativeEvent: { key: keyValue } }) => {
													if (keyValue === 'Enter' && !control.isInvalid) {
														if(!isLast) {
															formControlInputs[idx+1].focus();
														} else {
															form.submit();
														}
													}
												}}
											/>
										</View>
										{
											control.isTouched &&
											control.isInvalid ?
											(<View>

                                                { control.errors.pattern ?
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[0].replace(/%w/, control.value || "EMPTY" )}</Text> :
                                                    null
                                                }

                                                {
                                                    control.errors.required ?
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[1].replace(/%w/, control.value || "EMPTY" )}</Text> : null
                                                }

                                                { control.errors.equalToControl ?
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[2].replace(/%w/, control.value || "EMPTY" )}</Text> : null
                                                }
											</View>) : null
										}
									</View>
									) }
								</Foect.Control>
							)
						})
					}

					{ /* submit form */ }
					<View>
						<Button
							style={ form.isInvalid || action.disabled ? styles.buttonDisabledStyle : styles.buttonStyle}
							disabled={form.isInvalid || action.disabled}
							onPress={()=> form.submit()}
						>
							{action.actionLabel}
						</Button>
					</View>

					</View>
				) }
				</Foect.Form>

				</View>

			</ScrollView>
	)
}

const buttonStyle = {
	padding:15,
	margin: 10,
	height:55,
	overflow:'hidden',
	borderRadius:4,
	backgroundColor: '#41495a',
	fontSize: 20,
	color: 'grey',
};

const styles = {
	tabContainer: {
		flex: 1,
		backgroundColor: 	'#1f232b',
	},
	container: {
		alignItems: 		'center',
		backgroundColor: 	'#1f232b',
		flex: 				1,
		justifyContent: 	'center',
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
		color: '#545454',
        backgroundColor: '#2b303c',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
};
