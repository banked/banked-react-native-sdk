import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Checkout from './Checkout';

class App extends React.Component {
  state = {}
  render() {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {(this.shouldShowPayment()) ? (
                <Checkout paymentId = {this.state.paymentId}
                          apiKey = "c432bdb9618b7b75936de40736248851"
                          onCancel={this.cancelPayment}/>
                  ):
                (
                  <Button onPress={this.showPayment}
                          title="Pay now"></Button>
                )}
            <StatusBar style="auto"/>
          </View>
        </SafeAreaView>
      );
    }

  cancelPayment = () => {
    this.setState({paymentId: undefined})
  }

  shouldShowPayment = () => {
    return this.state.paymentId !== undefined
  }

  showPayment = () => {
    this.setState({paymentId: "57930b09-2277-426c-be71-f8e35341fe80"})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: '10%'
  },
  safeArea:{
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: '100%'
  }
});

export default App
