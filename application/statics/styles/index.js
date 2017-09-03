import { StyleSheet } from 'react-native';

const buttonStyle = {
		padding:10,
		height:45,
		margin: 5,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'rgba(0,0,0, .5)',
		fontSize: 20,
		color: 'white',
    };

export default styles = {
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
  	container: {
		backgroundColor: '#1f232b',
	},
	buttonStyle,
	buttonDisabledStyle: {
        ...buttonStyle,
        color:           'rgba(255,255,255, .3)',
		backgroundColor: 'rgba(0,0,0, .3)',
		borderWidth: 0,
	},
	buttonDisabledTextStyle: {
		color: '#BCBCBC',
	},
};