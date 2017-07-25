import { StyleSheet } from 'react-native';

const buttonStyle = {
		padding:10,
		height:45,
		margin: 5,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: '#86DB9A',
		fontSize: 20,
		color: 'white',
    };

export default styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  },
  card: {
    width: 300
  },
	buttonStyle,
	buttonDisabledStyle: {
		...buttonStyle,
		backgroundColor: '#DDDDDD',
		borderWidth: 0,
	},
	buttonDisabledTextStyle: {
		color: '#BCBCBC',
	},
});