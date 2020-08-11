import React from 'react';
import { getPayment, setProvider, cancelSetProvider } from './banked';
import { StyleSheet, View, Button, Text, ActivityIndicator, TouchableOpacity, Alert, BackHandler} from 'react-native';
import ProviderList from './ProviderList';
import ProviderLoading from './ProviderLoading';
import {BRAND, HEADER_SUBTITLE, CANCEL, BACK} from './strings';

import {
  PROVIDER_LOADING_EVENT,
  PROVIDER_SET_EVENT,
  PROVIDER_UNSET_EVENT,
  PROVIDER_ERROR_EVENT,
  PAY_BUTTON_CLICK_EVENT,
} from './constants';

const AWAITING_PAYMENT_CONSENT = 'awaiting_payment_consent';
const AWAITING_PROVIDER = 'awaiting_provider';

class Checkout extends React.Component {

  state = {}

  componentDidMount() {

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

      getPayment(this.props.paymentId, this.props.apiKey).then((data) => {
              if (data.state !== AWAITING_PAYMENT_CONSENT && data.state !== AWAITING_PROVIDER) {
                this.setState({
                        errorMessage: "Payment has been paid",
                        payment: {
                            state: 'error'
                        },
                    });
              } else {
                  return this.setState({
                      payment: {
                          id: data.id,
                          lineItems: data.line_items,
                          payee: data.payee,
                          payerDetailRequired: data.payer_details_required,
                          amount: data.amount,
                          amountFormatted: data.amount_formatted,
                          providerBrands: data.provider_brands,
                          state: data.state,
                          termsAndConditionsUrl: data.terms_and_conditions,
                          currency: data.currency,
                          endToEndId: data.end_to_end_id,
                          affiliateId: data.affiliate_id,
                          logo: data.logo,
                      },
                  });
              }},
              (error) => {
                  this.setState({
                      errorMessage: error.message,
                      payment: {
                          state: 'error'
                      },
                  });
              }
          )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  currentProviderBrand = (currentProviderId) => {
    const { providerBrands } = this.state.payment;
    return providerBrands.find((providerBrand) => (
      providerBrand.providers.map((provider) => (
        provider.id
      )).includes(currentProviderId)
    ));
  }

  currentProvider = (currentProviderId) => {
    const { providerBrands } = this.state.payment;
    return this.currentProviderBrand(currentProviderId).providers.find((provider) => (
      provider.id === currentProviderId
    ));
  }

  render() {
    if(this.state.errorMessage){
      return (
        <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style = {styles.cancel}>{CANCEL}</Text>
            </TouchableOpacity>
            <View style={styles.centeredContainer}>
              <Text style={styles.subtitle}>{this.state.errorMessage}</Text>
            </View>
          </View>
      )
    }
    else if (this.state.payment) {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
          {(!this.providerSelected()) ?
            (<Text style={styles.brand}>{BRAND}</Text>) :
            (<TouchableOpacity onPress={this.cancelProvider}>
                  <Text style={styles.brand}>{BACK}</Text>
             </TouchableOpacity >
            )
          }
          <TouchableOpacity onPress={this.props.onCancel}>
            <Text style = {styles.subtitle}>{CANCEL}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Pay {this.state.payment.amountFormatted}</Text>
        <Text style={styles.subtitle}>{HEADER_SUBTITLE}</Text>
      </View>
      {(!this.providerSelected()) ? (
      <ProviderList
                    providerBrands={this.state.payment.providerBrands}
                    chooseProvider={this.chooseProvider}
      />) : (
        <ProviderLoading paymentId={this.props.paymentId}
                         providerId={this.state.currentProviderId}
                         onCancel={this.cancelProvider}
                         providerBrand={this.currentProviderBrand(this.state.currentProviderId)}
                         amountFormatted={this.state.payment.amountFormatted}
                         termsAndConditionsUrl={this.state.payment.termsAndConditionsUrl}
                         apiKey={this.props.apiKey}
        />
    )}
      </View>
    );
  } else {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
  );
  }
  }

  chooseProvider = (id) => {
    const newProvider = this.currentProvider(id)
    if(newProvider.status === 'UNAVAILABLE') {
      Alert.alert(newProvider.status_detail);
    } else {
      this.setState({currentProviderId: id})
    }
  }

  cancelProvider = () => {
    this.setState({currentProviderId: undefined})
  }

  providerSelected = () => {
    return this.state.currentProviderId !== undefined
  }

  handleBackButtonClick = () => {
    if (this.providerSelected()) {
        this.cancelProvider();
    } else {
      this.props.onCancel();
    }

    return true;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: '100%'
  },
  header: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    marginBottom: 0,
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%'
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
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  cancel: {
    marginRight: '5%',
    color: '#989898',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14,
    textAlign: 'right'
  }
});
export default Checkout
