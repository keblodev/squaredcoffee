import { StackNavigator } from 'react-navigation';

import Home from '../components/home';
import About from '../components/about';
import Drinks from '../components/drinks';

export default StackNavigator({
  Home: { screen: Home },
  About: { screen: About },
  Drinks: { screen: Drinks },
});
