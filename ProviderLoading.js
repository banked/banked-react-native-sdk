import React from 'react';
import { getPayment, setProvider, cancelSetProvider } from './banked';
import { StyleSheet, View, Button, Image, Text, Modal, Linking, SafeAreaView, TouchableOpacity} from 'react-native';
import {
        PAY_NOW,
        POWERED_BY_BANKED,
        TERMS_AND_CONDITIONS} from './strings';

class ProviderLoading extends React.Component {

  state = {}

  componentDidMount() {
    setProvider(this.props.paymentId, this.props.providerId, this.props.apiKey).then(
      (data) => {
                  this.setState({redirectUrl: data.redirect_url})
                },
      (error) => {
                  this.setState({ errorMessage: error.message });
                 })
  }

  visitRedirectUrl = () => {
    Linking.openURL(this.state.redirectUrl);
  }

  openTerms = () => {
    Linking.openURL(this.props.termsAndConditionsUrl)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bottomContainer}>
        </View>
        <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
              style={{width: 50, height: 50, }}
              source={{uri: this.props.providerBrand.logo}}
              />
            </View>
            <Text style={styles.contentText}>Open your {this.props.providerBrand.name} app to make a direct and secure payment for {this.props.amountFormatted}</Text>
        </View>
        <View style={styles.bottomContainer}>
            {(this.state.errorMessage !== undefined) &&
              <Text style={styles.payNowButton}>{this.state.errorMessage}</Text>
              }
            {(this.state.redirectUrl !== undefined) ?
              (<TouchableOpacity onPress={this.visitRedirectUrl}>
                <View style={styles.payNowContainer}>
                  <Text style={styles.payNowButton}>{PAY_NOW}</Text>
                </View>
              </TouchableOpacity>) : (
                <View style={styles.payNowContainerDisabled}>
                  <Text style={styles.payNowButtonDisabled}>{PAY_NOW}</Text>
                </View>
              )
            }
            <Text style={styles.termsText}
                  onPress={this.openTerms}>
                  {TERMS_AND_CONDITIONS}
                  </Text>
            <Text style={styles.poweredByText}>{POWERED_BY_BANKED}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    justifyContent: 'space-between'
  },
  header:{
    marginTop: 30
  },
  contentContainer: {
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%'
  },
  brand: {
    color: '#292929',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14
  },
  title: {
    marginTop: 30,
    marginBottom: 5,
    color: '#292929',
    fontSize: 14
  },
  subtitle: {
    marginBottom: 15,
    color: '#989898',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14
  },
  contentText: {
    marginTop: 30,
    marginBottom: 5,
    color: '#292929',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22
  },
  payNowContainer: {
    backgroundColor: '#141414',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  payNowContainerDisabled: {
    backgroundColor: '#F3F3F3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  payNowButton: {
    color: '#FAFAFA',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14,
  },
  payNowButtonDisabled: {
    color: '#989898',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14,
  },
  termsText: {
    color: '#989898',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center'
  },
  poweredByText: {
    color: '#989898',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14,
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  bottomContainer: {
    marginBottom: 0,
  }
});

export default ProviderLoading
