import React, { useMemo, useEffect } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BackHandler } from 'react-native'



const CustomBackdrop = ({ animatedIndex, style, backdropRef }) => {


  useEffect(()=>{

    const backAction = () => {
      
      backdropRef.current.close()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();


  },[])


  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value+1,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "rgba(0,0,0,0.6)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View onTouchEnd={()=>backdropRef.current.close()} style={containerStyle} />;
};

export default CustomBackdrop;