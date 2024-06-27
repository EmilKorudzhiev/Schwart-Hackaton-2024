import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/components/Icon";
import { useAxios } from "@/services/api";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function ZoomableMap() {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const sensitivityFactor = useSharedValue(1);

  interface MapObject {
    itemDetails: any[][];
    address: string;
    description: string;
    id: number;
    // Add other properties if needed
  }
  
  const [mapObjects, setMapObjects] = useState<MapObject | undefined>();

  const {refreshAccessToken, signOut} = useAuth();

  const axiosInstance = useAxios(refreshAccessToken, signOut);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = axiosInstance.get("store/1");
        setMapObjects((await response).data);
        
        
      } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        }
      }
    };

    fetchData();
  }, [])

  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      if (event.y <= screenHeight / 2) {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      }
    })
    .onUpdate((event) => {
      if (event.y <= screenHeight / 2) {
        translateX.value = savedTranslateX.value + event.translationX * sensitivityFactor.value;
        translateY.value = savedTranslateY.value + event.translationY * sensitivityFactor.value;
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      if (event.focalY <= screenHeight / 2) {
        scale.value = Math.max(1, savedScale.value * event.scale);
        sensitivityFactor.value = 1 / scale.value;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });


  const handleRecenter = () => {
    scale.value = withTiming(1);
    savedScale.value = 1;
    sensitivityFactor.value = 1
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const drawCols = (y: number) => {
    let cols = [];
    for (let x = 0; x < 40; x++) {
      cols.push(
        <View
          key={`col-${x}`}
          style={{
            width: screenWidth / 40,
            height: screenWidth / 40,
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.1)"
          }}
        />
      );
    }
    return cols;
  };

  const drawRows = () => {
    let rows = [];
    for (let y = 0; y < 20; y++) {
      rows.push(
        <View key={`row-${y}`} style={{ flexDirection: "row" }}>
          {drawCols(y)}
        </View>
      );
    }
    return rows;
  };

  const drawRedSquares = () => {
    let squares: React.JSX.Element[] = [];

    for(let y = 0; y < 21; y++) {
      for(let x = 0; x < 41; x++) {
        const isNotNull = mapObjects && mapObjects.itemDetails && mapObjects.itemDetails[x][y] !== null;
        if(isNotNull) {
          squares.push(
            <View
              key={`red-square-${x}-${y}`}
              style={{
                width: screenWidth / 40,
                height: screenWidth / 40,
                backgroundColor: mapObjects.itemDetails[x][y].category === "Риба" ? "aqua" : "red",
                position: "absolute",
                bottom: y * (screenWidth / 40) - screenWidth / 80,
                left: x * (screenWidth / 40) - screenWidth / 80,
                borderRadius: 1,
                borderWidth: 0.5,
              }}
            />
          );
        }
        
      }
    }

    return squares;
  };

  const drawPath = () => {
    let lines: React.JSX.Element[] = [];

    const positions = [
      { row: 10, col: 11 },
    ];

    positions.forEach((pos, index) => {
      lines.push(
        <View
          key={`red-square-${index}`}
          style={{
            width: screenWidth / 40,
            height: screenWidth / 160,
            borderRadius: 5,
            backgroundColor: "green",
            position: "absolute",
            bottom: pos.row * (screenWidth / 40) - screenWidth / 320,
            left: pos.col * (screenWidth / 40),
          }}
        />
      );
    });

    return lines;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector
          gesture={Gesture.Simultaneous(
            panGesture,
            pinchGesture,
          )}
        >
          <View style={[styles.upperHalf, { height: screenWidth }]}>
            <Animated.View style={[styles.content, animatedStyle]}>
              <View style={{ ...styles.innerView}}>
                {drawRows()}
                {drawPath()}
                {mapObjects && mapObjects.itemDetails && drawRedSquares()}
              </View>
            </Animated.View>
            <TouchableOpacity style={styles.recenter} onPress={handleRecenter}>
              <Icon
                library="FontAwesome6"
                name="down-left-and-up-right-to-center"
                color="black"
              />
            </TouchableOpacity>
          </View>
        </GestureDetector>
        <View style={styles.lowerHalf}>
          {/* Other content for the lower half */}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureContainer: {
    flex: 1,
  },
  upperHalf: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  lowerHalf: {
    flex: 1,
    backgroundColor: "#eee",
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    position: "relative",
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  recenter: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
});
