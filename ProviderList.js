import React from 'react';
import {FlatList} from 'react-native';
import Provider from './Provider';

class ProviderList extends React.Component {

  getProviders() {
    return this.props.providerBrands.map((providerBrand) => (
                providerBrand.providers.map((provider) => (
                  { logo: providerBrand.logo, ...provider}
                ))
              )).flat()
  }
  render() {
    return (
      <FlatList
            data={this.getProviders()}
            renderItem={({ item }) => (
                <Provider title={item.name}
                          logo={item.logo}
                          id={item.id}
                          status={item.status}
                          statusDetail={item.status_detail}
                          onPress={this.props.chooseProvider} />)}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingTop: 25 }}
      />
    );
  }
}

export default ProviderList
