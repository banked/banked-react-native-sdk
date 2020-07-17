import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import {UNAVAILABLE} from './strings';

const Provider = ({
  title, logo, id, status, statusDetail, onPress
}) => {
  return(
  <Pressable
  onPress={() => onPress(id)}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
        style={[styles.image, status ==='UNAVAILABLE' && styles.imageUnavailable]}
        source={{uri: logo}}
        />
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={[styles.title, status ==='UNAVAILABLE' && styles.titleUnavailabe]}>{title}</Text>
          {(status ==='UNAVAILABLE' &&
          <Text style={styles.titleUnavailabe}>{UNAVAILABLE}</Text>
        )}
      </View>
    </View>
  </Pressable>
)
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2.5%',
    margin: '2.5%',
    marginLeft: '5%'
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%'
  },
  image: {
      width: 40,
      height: 40,
      resizeMode: 'contain'
  },
  imageUnavailable: {
    tintColor: '#CFCFCF'
  },
  title: {
    color: '#292929',
    fontFamily: 'Hermes-RegularCond',
    fontSize: 14
  },

  titleUnavailabe:{
    color: '#B8B8B8',
  }
});

export default Provider;
