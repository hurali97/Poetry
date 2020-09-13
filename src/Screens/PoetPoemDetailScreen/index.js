import React from 'react'
import { Text, View, ScrollView, RefreshControl, BackHandler, Image, TouchableOpacity } from 'react-native'
import styles from './style.js'
import AnimatedWish from '../../Components/AnimatedWish/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import {
    AdMobInterstitial,
    AdMobBanner
} from 'react-native-admob';
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import { appTheme } from '../../Utils/index.js'
import { vh, vw } from '../../Units/index.js'
import Tts from 'react-native-tts';
import AnimatedButton from '../../Components/AnimatedButton/index.js'
import Share from 'react-native-share';
import { ShareDialog, MessageDialog } from 'react-native-fbsdk';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetButtons from '../../Components/BottomSheetButtons/index.js'
import allImages from '../../assets/images/index.js'





class PoetPoemDetailScreen extends React.Component {

    state = {
        poemDetails: null,
        refreshing: false
    }

    componentDidMount() {

        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);

        this.props.navigation.addListener("focus", () => {
            this.setState({ poemDetails: null })

            AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); //google test ad

            // AdMobInterstitial.setAdUnitID('ca-app-pub-8059419171547646/5607523744');

            // this.showInterstitial()


            if (this.props.route?.params?.makeApiCall) {

                this._getPoem()
            }
            else {
                this.setState({ poemDetails: this.props.route.params.poem })
            }
        })


        this.props.navigation.addListener('blur', () => {
            Tts.stop();
        })

        Tts.addEventListener('tts-finish', (event) => {
            if (this.playPauseRef) {
                this.playPauseRef._onPress()
            }
        })

    }

    backAction = () => {

        if (this.props.route?.params?.fromSearch) {
            this.props.showSearchModal()
            this.props.navigation.popToTop()

        }

        else {
            this.props.navigation.pop()
        }

        return true;

    }


    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();
        this.props.navigation.removeListener("focus")
        this.props.navigation.removeListener("blur")
        this.backHandler.remove();

        try {
            Tts.removeAllListeners()
        } catch (error) {

        }
    }

    _getPoem = () => {

        let _poemName = this.props.route?.params?.poem?.title

        this.setState({ refreshing: true })

        this.props.getPoems(_poemName, success => {


            this.setState({ refreshing: false, poemDetails: success[0] })

            // this.showInterstitial()

        }, error => {

            this.setState({ refreshing: false })
            Toast.show(error)
        })

    }


    showInterstitial = () => {

        AdMobInterstitial.requestAd()
            .then((_d) => {
                console.log('**  ', _d)
                AdMobInterstitial.isReady((data) => {
                    if (data)
                        AdMobInterstitial.showAd()
                    console.log(data)
                }
                )
            })
            .catch(_err => console.log('err ', _err))


    }

    _shareToFacebook = () => {

        let _lines = this.state.poemDetails.lines.map((line, index) => {
            return line + "\n"
        })

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://play.google.com/store/apps/details?id=com.techsphereapps.poetry&hl=en',
            quote: _lines.join('')
        };
        ShareDialog.show(shareLinkContent);

    }

    _shareToWhatsapp = () => {

        let _lines = this.state.poemDetails.lines.map((line, index) => {
            return line + "\n"
        })

        let options = {
            title: 'Poetry',
            message: _lines.join(''),
            social: Share.Social.WHATSAPP,
            whatsAppNumber: ''
        }

        Share.shareSingle(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });


    }


    _shareToInstagram = () => {

        let _lines = this.state.poemDetails.lines.map((line, index) => {
            return line + "\n"
        })

        let options = {
            title: 'Poetry',
            message: _lines.join(''),
            social: Share.Social.INSTAGRAM
        }

        Share.shareSingle(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });


    }

    _shareToMessenger = () => {

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://www.google.com',
            quote: this.state.poemDetails.lines.toString() + 'asdasdasdasd',
            message: 'asdsad'
        };

        MessageDialog.show(shareLinkContent);




    }


    _onPressWish = (poem) => {



        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })



    }

    _onSharePress = () => {

        if (this.RBSheet) {
            this.RBSheet.open()
        }
    }

    _onPlay = () => {

        Tts.getInitStatus().then(() => {

            Tts.setDucking(true);

            let _lines = this.state.poemDetails.lines.map((line, index) => {
                return line + " "
            })

            Tts.setDefaultRate(0.4);

            Tts.speak(_lines.toString());

        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });

    }

    _onStop = () => {

        Tts.stop()

    }


    _renderSection = () => {

        if (this.state.poemDetails) {


            let _details = this.state.poemDetails

            let _lines = _details.lines.map((line, index) => {
                return line + "\n"
            })

            return <View style={styles.firstChildContainer}>

                <AnimatedWish
                    onWishPress={() => this._onPressWish(_details)}
                    wish={this.props.wishList.findIndex(_element => _element.title == _details.title) == -1
                        ? 'unwish' : 'wish'}
                />

                <View style={[styles.textContainer, {
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexDirection: 'row'
                }]}>

                    <View>
                        <Text style={styles.title}>Title:</Text>
                        <Text style={styles.text}>{_details.title}</Text>
                    </View>

                    <AnimatedButton
                        onPlay={this._onPlay}
                        onStop={this._onStop}
                        ref={_ref => this.playPauseRef = _ref}
                    />

                </View>


                <View style={[styles.textContainer, {
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexDirection: 'row'
                }]}>

                    <View >
                        <Text style={styles.title}>Poet:</Text>
                        <Text style={styles.text}>{_details.author}</Text>
                    </View>

                    <TouchableOpacity style={styles.imageContainer}
                        onPress={this._onSharePress}
                    >

                        <Image
                            source={allImages.generalIcons.share}
                            style={styles.image}
                        />

                    </TouchableOpacity>

                </View>


                <View style={styles.textContainer}>
                    <Text style={styles.title}>Lines:</Text>

                </View>

                <Text style={styles.lines}>{_lines}</Text>

            </View>


        }
        else if (!this.state.refreshing) {

            return <EmptyComponent message="No details found" />
        }

        return null
    }

    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={25 * vh}
            openDuration={250}
            customStyles={{
                container: {
                    // justifyContent: "center",
                    // alignItems: "center",
                    // backgroundColor: 'red'
                }
            }}
            dragFromTopOnly
            closeOnDragDown
            animationType="fade"
        >

            <BottomSheetButtons
                source={allImages.generalIcons.facebook}
                onPress={this._shareToFacebook}
                text="Share to facebook"
            />
            <BottomSheetButtons
                source={allImages.generalIcons.whatsapp}
                onPress={this._shareToWhatsapp}
                text="Share to whatsapp"
            />
            <BottomSheetButtons
                source={allImages.generalIcons.instagram}
                onPress={this._shareToInstagram}
                text="Share to instagram DM"
            />
            {/* <BottomSheetButtons
                source={allImages.generalIcons.messenger}
                onPress={this._shareToMessenger}
                text="Send in messenger"
            /> */}


        </RBSheet>
    }


    render() {

        return (

            <ScrollView
                style={styles.parentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={[appTheme.lightGray]}
                    />
                }
            >



                {
                    this._renderSection()
                }


                {
                    this._renderBottomSheet()
                }

                <AdMobBanner
                    style={{ margin: 2 * vh, height: 15 * vh, zIndex: 100, alignSelf: 'center' }}
                    adSize="banner"
                    onAdFailedToLoad={(e) => console.log(e)}
                    adUnitID="ca-app-pub-3940256099942544/6300978111" //google testad
                    // adUnitID="ca-app-pub-8059419171547646/7352367170"  
                    testDeviceID="EMULATOR"

                />


            </ScrollView>
        )
    }

}

const mapStateToProps = state => {

    return {

        wishList: state.GeneralReducer.wishList,

    }

}

const mapDispatchToProps = dispatch => {

    return {
        getPoems: (title, success, error) => dispatch(actions.getPoems(title, success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success)),
        showSearchModal: () => dispatch(actions.showSearch())
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(PoetPoemDetailScreen)
