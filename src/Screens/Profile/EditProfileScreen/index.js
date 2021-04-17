import React from 'react'
import { View, Text, Image, FlatList, ScrollView, TextInput } from 'react-native'
import styles from './styles.js'
import allImages from '../../../assets/images'
import RippleTouch from '../../../Components/RippleTouch'
import { connect } from 'react-redux'
import actions from '../../../redux/actions/index.js'
import TextRegular from '../../../Components/TextRegular';
import TextSemiBold from '../../../Components/TextSemiBold';
import TextPoppinsRegular from '../../../Components/TextPoppinsRegular'
import TextPoppinsMedium from '../../../Components/TextPoppinsMedium/index.js'
import TextPoppinsSemi from '../../../Components/TextPoppinsSemi/index.js'
import TextPoppinsLight from '../../../Components/TextPoppinsLight/index.js'
import { LOG, showToast } from '../../../Api/HelperFunctions.js'
import PoemFeedCard from '../../../Components/PoemFeedCard/index.js'
import { appTheme, genders } from '../../../Utils/index.js'
import RadioButton from '../../../Components/RadioButton/index.js'
import Button from '../../../Components/Button/index.js'

const gendersArray = ["Male", "Female"];


class EditProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.profile
        }
    }

    onChangeText = (text, field) => {
        this.setState(prevState => ({
            profile: {
                ...prevState.profile,
                [field]: text,
            },
        }))
    }


    renderHeader = () => {

        return <View style={styles.headerRow}>
            <RippleTouch onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </RippleTouch>

        </View>

    }


    renderAbout = () => {


        return <View style={styles.aboutContainer}>
            <TextPoppinsMedium style={styles.username}>
                About
            </TextPoppinsMedium>

            <TextInput
                multiline
                placeholder="Add some thing wonderful about yourself."
                style={styles.aboutField}
                value={this.state.profile?.bio}
                onChangeText={(text) => this.onChangeText(text, 'bio')}
                editable={!this.props.loading}
            />

        </View>

    }

    renderName = () => {
        // this.props.profile?.name
        return <View style={styles.nameContainer}>
            <TextPoppinsMedium style={styles.username}>
                Name
            </TextPoppinsMedium>

            <TextInput
                placeholder="Enter your name"
                style={styles.inputField}
                value={this.state.profile?.name}
                onChangeText={(text) => this.onChangeText(text, 'name')}
                editable={!this.props.loading}
            />
        </View>

    }

    renderCountry = () => {
        // this.props.profile?.country
        return <View style={styles.nameContainer}>
            <TextPoppinsMedium style={styles.username}>
                Country
            </TextPoppinsMedium>

            <TextInput
                placeholder="Enter your country"
                style={styles.inputField}
                value={this.state.profile?.country}
                onChangeText={(text) => this.onChangeText(text, 'country')}
                editable={!this.props.loading}
            />
        </View>

    }

    renderAge = () => {
        // this.props.profile?.age
        return <View style={styles.nameContainer}>
            <TextPoppinsMedium style={styles.username}>
                Age
            </TextPoppinsMedium>

            <TextInput
                placeholder="Enter your age"
                style={styles.inputField}
                maxLength={3}
                keyboardType="number-pad"
                value={String(this.state.profile?.age)}
                onChangeText={(text) => this.onChangeText(text, 'age')}
                editable={!this.props.loading}
            />
        </View>

    }

    renderGender = () => {
        // this.props.profile?.gender
        return <View style={styles.nameContainer}>
            <TextPoppinsMedium style={styles.username}>
                Gender
            </TextPoppinsMedium>

            <RadioButton
                data={gendersArray}
                style={styles.RadioButton}
                textStyle={styles.radioText}
                activeIndex={gendersArray.findIndex(item => item?.toLowerCase() == this.state.profile?.gender?.toLowerCase())}
                onChange={this.onRadioChange}
            />
        </View>

    }


    onRadioChange = (data) => {

        if(this.props.loading){
            return
        }

        this.setState({
            profile: {
                ...this.state.profile,
                gender: data.data
            }
        })
    }

    getProfileImage = () => {

        let profileImage = this.state.profile?.image ?? "";

        if (profileImage != "") {
            if (!profileImage?.includes('base64')) {
                profileImage = {
                    uri: `data:image/png;base64,${profileImage}`
                };
            }
            else {
                profileImage = {
                    uri: profileImage
                };
            }
        }
        else {
            if (this.state?.profile?.gender?.toLowerCase() == genders.male) {
                profileImage = allImages.generalImages.male;
            }
            else {
                profileImage = allImages.generalImages.female;
            }
        }



        return profileImage;
    }

    _renderProfileIcon = () => {
        return <View style={styles.profileImageContainer}>
            <Image
                source={this.getProfileImage()}
                style={styles.profileImage}
            />

            <RippleTouch style={styles.cameraContainerStyle} onPress={this._pickImage} >
                <Image source={allImages.transparentIcons.camera} style={styles.cameraStyle} />
            </RippleTouch>

        </View>
    }

    _onContinue = async () => {


        let userInfo = {
            ...this.state.profile,
            age: String(this.state.profile?.age)
            // image: this.state.profile?.image?.data ?? ''
        };
 

        if (userInfo.name.trim() == '') {
            return showToast('Please enter your name');
        }

        if (userInfo.age.trim() == '') {
            return showToast('Please enter your age');
        }

        if (isNaN(userInfo.age)) {
            return showToast('Please enter a valid age');
        }

        if (userInfo.country.trim() == '') {
            return showToast('Please enter your country');
        }
  

        if (userInfo.image != "") {
            if (!userInfo.image.includes('base64')) {
                let base = `data:image/png;base64,${userInfo.image}`;

                userInfo = {
                    ...userInfo,
                    image: base
                };
            }
        }
 
        try {

            const response = await this.props.updateProfile(userInfo);

            if (response?.message) {
                showToast(response?.message);

            }
            

            this.props.navigation.goBack();

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }


    render() {

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>

                {
                    this.renderHeader()
                }

                <View style={styles.profileContainer}>

                    {
                        this._renderProfileIcon()
                    }

                    <TextPoppinsRegular style={styles.email}>
                        {this.state.profile?.email}
                    </TextPoppinsRegular>

                    <View style={styles.border} />


                    {
                        this.renderName()
                    }


                    <View style={styles.border} />


                    {
                        this.renderCountry()
                    }

                    <View style={styles.border} />


                    {
                        this.renderAge()
                    }

                    <View style={styles.border} />


                    {
                        this.renderGender()
                    }


                    <View style={styles.border} />

                    {
                        this.renderAbout()
                    }

                    <View style={styles.border} />


                    <Button color={appTheme.white} onPress={this._onContinue} style={styles.btnStyle}>
                        <TextPoppinsRegular style={styles.btnText}>
                            Continue
                        </TextPoppinsRegular>
                    </Button>

                </View>


            </ScrollView>
        )
    }
}

const mapStateToProps = state => {

    return {
        profile: state.UserReducer.profile,
        loading: state.LoadingReducer.loading
    }

}

const mapDispatchToProps = dispatch => {

    return {
        updateProfile: (credentials) => dispatch(actions.updateProfile(credentials)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);