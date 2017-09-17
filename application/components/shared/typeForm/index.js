import React, { PureComponent }                 from 'react';
import { Text, View, ScrollView }               from 'react-native';
import { TabViewAnimated, TabBar, SceneMap }    from 'react-native-tab-view';
import { KeyboardAwareScrollView }              from 'react-native-keyboard-aware-scroll-view';

import Button from 'react-native-button'

import { Hoshi } from 'react-native-textinput-effects';

import Foect from 'foect';

export default ({action, formDefaultValues = null, formControls}) => {
    const formControlInputs = []
	return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraHeight={40}
            extraScrollHeight={40}
            style={{
                paddingLeft:    20,
                paddingRight:   20,
                width:          '100%',
            }}
        >
            <View
                    style={{
                        overflow:   'hidden',
                        width:      '100%',
                    }}
                >
                <Foect.Form
                    defaultValue={formDefaultValues || {
                        email:                            'john@doe.com',
                        password:                         'J1@doe.com',
                        new_password:                     'J1@doe.com',
                        given_name:                       'Amelia',
                        family_name:                      'Earhart',
                        email_address:                    'Amelia.Earhart@example.com',
                        address_line_1:                   '500 Electric Ave',
                        address_line_2:                   'Suite 600',
                        locality:                         'New York',
                        administrative_district_level_1:  'NY',
                        postal_code:                      '94103',
                        country:                          'US',
                        phone_number:                     '1-555-555-0122',
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
                                                marginTop:      10,
                                                marginBottom:   10
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
                                                enablesReturnKeyAutomatically={true}

                                                onSubmitEditing={({ nativeEvent: { key: keyValue } })=>{
                                                    if (!control.isInvalid) {
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
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[0].replace(/%w/, control.value ||  "EMPTY")}</Text> :
                                                    null
                                                }

                                                {
                                                    control.errors.required ?
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[1].replace(/%w/, control.value ||  "EMPTY")}</Text> : null
                                                }

                                                { control.errors.equalToControl ?
                                                    <Text style={{ color: 'gray' }}>{item.errorMessages[2].replace(/%w/, control.value ||  "EMPTY")}</Text> : null
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
        </KeyboardAwareScrollView>
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
		backgroundColor: 	'#1f232b',
		position: 'absolute',
		left: 20,
		right: 20
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
