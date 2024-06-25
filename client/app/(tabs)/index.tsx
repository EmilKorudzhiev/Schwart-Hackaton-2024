import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <View style={{width: 320, height: 160, position: "relative", borderWidth: 1}}>
        <View style={{width: "100%", height: "100%", borderWidth: 1, position: "absolute"}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 4 * (320/40), bottom: 3 * (160 / 20)}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 5 * (320/40), bottom: 3 * (160 / 20)}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 6 * (320/40), bottom: 3 * (160 / 20)}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 7 * (320/40), bottom: 3 * (160 / 20)}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 8 * (320/40), bottom: 3 * (160 / 20)}}/>
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 10 * (320/40), bottom: 4 * (160 / 20)}}/>

        {/* <View style={{width: (320/40) * 10, height: 160/20, borderWidth: 1, position: "absolute", left: 10 * (320/40), bottom: 10 * (160 / 20)}}/> */}
        <View style={{width: 320/40, height: 160/20, borderWidth: 1, position: "absolute", left: 10 * (320/40), bottom: 4 * (160 / 20)}}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
