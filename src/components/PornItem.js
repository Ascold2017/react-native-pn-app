import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AppCard from './AppCard';

export default class PornItem extends React.PureComponent {
  state = {
    slideShowInterval: null,
    slideIndex: 0,
  };

  componentDidUpdate() {
    if (
      this.props.tappedItem === this.props.porn.id &&
      !this.state.slideShowInterval
    ) {
      this.startSlideSlides();
    } else if (
      this.props.tappedItem !== this.props.porn.id &&
      this.state.slideShowInterval
    ) {
      this.clearSlideShow();
    }
  }

  startSlideSlides() {
    const interval = setInterval(() => {
      this.setState({
        slideIndex:
          this.state.slideIndex === this.props.porn.thumbs.length - 1
            ? 0
            : this.state.slideIndex + 1,
      });
    }, 1500);
    this.setState({slideShowInterval: interval});
  }

  clearSlideShow() {
    clearInterval(this.state.slideShowInterval);
    this.setState({slideShowInterval: null, slideIndex: 0});
  }

  componentWillUnmount() {
    this.clearSlideShow();
  }

  render() {
    const {porn, onTap, navigation, tappedItem} = this.props;
    const currentImage =
      tappedItem === porn.id
        ? porn.thumbs[this.state.slideIndex]
        : porn.default_thumb;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Porn', {id: porn.id})}
        style={{padding: 5}}>
        <AppCard onTouchStart={() => onTap(porn.id)}>
          <ImageBackground
            source={{uri: currentImage.src}}
            style={styles.image}
            resizeMode="contain">
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <Text style={[styles.whiteText, {flex: 1}]}>{porn.title}</Text>
                <View>
                  <Text style={styles.whiteText}>Rate: {porn.rate}</Text>
                  <Text style={styles.whiteText}>
                    Length: {porn.length_min} min
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.footer}>
            <Text style={styles.whiteText}>Keywords: {porn.keywords}</Text>
          </View>
        </AppCard>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  whiteText: {color: '#fff'},
  image: {
    height: (Dimensions.get('window').width / 16) * 9 - 10,
    justifyContent: 'flex-end',
  },
  header: {padding: 10, backgroundColor: 'rgba(0,0,0, 0.5)'},
  headerContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#424242',
  },
});
