import React from 'react'
import { DeviceEventEmitter, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';

import HomeScreen from '../Screens/HomeScreen';

import MoreScreen from '../Screens/MoreScreen';
import PoetsScreen from '../Screens/PoetsScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryDetailsScreen from '../Screens/CategoryDetailsScreen';
import PoetPoemsScreen from '../Screens/PoetPoemsScreen';
import WishListScreen from '../Screens/WishListScreen';
import RippleTouch from '../Components/RippleTouch';
import allImages from '../assets/images';
import SearchModal from '../Components/SearchModal';
import PoemDetailScreen from '../Screens/PoemDetailScreen';
import SearchScreen from '../Screens/SearchScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import ForgotPasswordScreen from '../Screens/Authentication/ForgotPasswordScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import FeedScreen from '../Screens/FeedScreen';
import CreatePoemScreen from '../Screens/CreatePoemScreen';
import MyLikesScreen from '../Screens/MyLikesScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';
import FeedDetailScreen from '../Screens/FeedDetailScreen';
import HeaderRight from '../Components/HeaderRight';
import CustomTabBar from '../Components/CustomTabBar';
import AllFriendsScreen from '../Screens/Profile/AllFriendsScreen';


import { vw } from '../Units';
import styles from './styles';
import RequestStackNavigator from './RequestStackNavigator';


const Tabs = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const PoetStack = createStackNavigator();
const MoreStack = createStackNavigator();
const WishStack = createStackNavigator();
const RootStack = createStackNavigator();
const FeedStack = createStackNavigator();


class MainNavigator extends React.Component {


  _DefaultHeaderOptions = (props) => {

    return {
      headerShown: true,
      title: this.getHeaderTitle(props),
      headerTitleAlign: 'center',
      headerTitleStyle: this._pickHeaderStyle(props),
      headerStyle: styles.header,
      headerLeft: () => this._renderHeaderLeft(props),
      headerRight: () => this._renderHeaderRight(props),
      headerLeftContainerStyle: styles.leftContainer,
      headerRightContainerStyle: styles.rightContainer
    }
  }

  _pickHeaderStyle = (props) => {

    const routeName = props.route.name


    let _styles = styles.headerTitle

    if (routeName != "HomeScreen") {

      _styles = styles.headerTitle_1

    }

    return _styles
  }


  _onBackPress = (props) => {

    const routeName = props.route.name

    props.navigation.goBack()
  }


  _renderHeaderLeft = (props) => {

    const routeName = props.route.name;

    if (routeName == "HomeScreen") {
      return <Text style={styles.headerTitle}>
        Poetry
      </Text>
    }

    if (routeName == 'CategoryDetailsScreen' || routeName == 'CategoriesScreen' || routeName == 'PoetPoemsScreen'
      || routeName == "CategoryPoemDetailsScreen" || routeName == 'WishListDetailScreen'
      || routeName == 'WishListScreen' || routeName == 'PoemDetailScreen' || routeName == "NotificationsScreen"

    ) {

      return <RippleTouch
        onPress={() => this._onBackPress(props)}
        style={{ marginLeft: 2 * vw }}
      >
        <Image style={styles.imageStyle} source={allImages.generalIcons.leftArrow} />
      </RippleTouch>

    }

    return null

  }

  navigateToSearchScreen = (props) => {
    props.navigation.navigate('SearchScreen')
  }

  _renderHeaderRight = (props) => {

    const routeName = props.route.name;

    if (routeName == "HomeScreen") {
      return <TouchableOpacity onPress={() => this.navigateToSearchScreen(props)}>
        <Image source={allImages.generalIcons.searchIcon} style={styles.imageStyle} />
      </TouchableOpacity>
    }


    if (routeName == 'FeedScreen' || routeName == 'FeedStack') {

      return <HeaderRight navigation={props.navigation} />

    }

    return null

  }


  _renderHeaderWithSearch = (props) => {
    return {
      ...this._DefaultHeaderOptions(props),
      // header: (props) => <ExtendedHeader {...props} />
    }
  }


  getHeaderTitle = (props) => {

    const routeName = props.route.name


    switch (routeName) {

      case 'HomeScreen': {
        return null
      }

      case 'SearchScreen': {
        return null
      }

      case 'CategoriesScreen': {
        return 'Categories'
      }

      case 'FeedScreen': {
        return 'Feed'
      }

      case 'CategoryDetailsScreen': {

        return props.route.params?.title
      }

      case 'CategoryPoemDetailsScreen': {
        return "Details"
      }


      case 'PoetsScreen': {
        return 'Poets'
      }

      case 'PoetPoemsScreen': {
        return props.route.params?.title
      }

      case 'PoemDetailScreen': {
        return 'Details'
      }

      case 'MoreScreen': {
        return 'More'
      }

      case 'WishListScreen': {
        return 'Favorites'
      }

      case 'WishListStack': {
        return null
      }

      case 'WishListDetailScreen': {
        return 'Poem Details'
      }



      default: {
        return routeName
      }
    }

  }


  HomeStackNavigator = (props) => {


    return (
      <>
        <HomeStack.Navigator
          screenOptions={this._renderHeaderWithSearch}
          headerMode="screen"
        >

          <HomeStack.Screen name="HomeScreen" component={HomeScreen} />



        </HomeStack.Navigator>

        <SearchModal navigation={props.navigation} />
      </>
    )
  }


  WishStackNavigator = (props) => {


    return (

      <WishStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >

        <WishStack.Screen
          name="WishListScreen"
          component={WishListScreen}
          options={
            {
              ...TransitionPresets.ScaleFromCenterAndroid,
            }
          }
        />


      </WishStack.Navigator>

    )
  }


  CategoryStackNavigator = () => {

    return (
      <CategoryStack.Navigator
        screenOptions={this._DefaultHeaderOptions}

        headerMode="screen"
      >
        <CategoryStack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
        />

        <CategoryStack.Screen
          name="CategoryDetailsScreen"
          component={CategoryDetailsScreen}
          options={
            {
              ...TransitionPresets.ScaleFromCenterAndroid,
            }
          }
        />



      </CategoryStack.Navigator>
    )
  }

  PoetStackNavigator = () => {

    return (
      <PoetStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <PoetStack.Screen
          name="PoetsScreen"
          component={PoetsScreen}
        />




      </PoetStack.Navigator>
    )
  }

  MoreStackNavigator = () => {

    return (
      <MoreStack.Navigator
        // screenOptions={this._renderHeaderWithSearch}
        // headerMode="screen"
        screenOptions={{ headerShown: false }}
      >
        <MoreStack.Screen
          name="MoreScreen"
          component={MoreScreen}
        />

        <MoreStack.Screen
          name="WishListStack"
          component={this.WishStackNavigator}
          options={
            {
              ...TransitionPresets.ScaleFromCenterAndroid,
            }
          }
        />

      </MoreStack.Navigator>
    )
  }

  FeedStackNavigator = () => {



    return (
      <FeedStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <FeedStack.Screen
          name="FeedScreen"
          component={FeedScreen}
        />

      </FeedStack.Navigator>
    )
  }

  TabNavigator = (props) => {


    return (
      <Tabs.Navigator
        tabBarPosition="bottom"
        lazy={true}
        tabBar={tabProps => <CustomTabBar {...tabProps} {...props} />}
        tabBarOptions={{

          tabStyle: styles.tabStyle,
          style: styles.tabBarStyle,

        }}

        swipeEnabled={true}
        removeClippedSubviews
      >

        <Tabs.Screen
          name="HomeStack"
          component={this.HomeStackNavigator}

        />

        <Tabs.Screen
          name="FeedStack"
          component={this.FeedStackNavigator}

          listeners={{
            tabPress: e => {
              DeviceEventEmitter.emit("FeedPressed")
            },
          }}
        />


        <Tabs.Screen
          name="PoetStack"
          component={this.PoetStackNavigator}

        />

        <Tabs.Screen
          name="MoreStack"
          component={this.MoreStackNavigator}

        />
      </Tabs.Navigator>

    );
  }


  RootStackNavigator = () => {

    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="TabStack"
          component={this.TabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="PoetPoemsScreen"
          component={PoetPoemsScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              ...this._renderHeaderWithSearch(props)
            }
          }
          }
        />

        <RootStack.Screen
          name="CategoryStack"
          component={this.CategoryStackNavigator}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="PoemDetailScreen"
          component={PoemDetailScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              ...this._renderHeaderWithSearch(props)
            }
          }
          }
        />

        <RootStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="CreatePoemScreen"
          component={CreatePoemScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="MyLikesScreen"
          component={MyLikesScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false
            }
          }
          }
        />

        <RootStack.Screen
          name="FeedDetailScreen"
          component={FeedDetailScreen}
          options={(props) => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              headerShown: false

            }
          }
          }
        />


        <RootStack.Screen
          name="AllFriendsScreen"
          component={AllFriendsScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />


        <RootStack.Screen
          name="RequestStackNavigator"
          component={RequestStackNavigator}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              headerShown: false
            }
          }
          }
        />

      </RootStack.Navigator>
    )
  }


  render() {

    return (

      <NavigationContainer>
        {/* <this.TabNavigator {...this.props} /> */}
        <this.RootStackNavigator {...this.props} />
      </NavigationContainer>

    )

  }


}


const mapStateToProps = state => {

  return {
    token: state.UserReducer.token
  }

}

const mapDispatchToProps = dispatch => {

  return {
  }

}





export default connect(mapStateToProps, null)(MainNavigator)
