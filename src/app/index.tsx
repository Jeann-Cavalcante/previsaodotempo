import { Spinner, Text, XStack } from "tamagui";
import Layout from "../components/templates/Layout";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
// import Moderaterain from "../assets/images/moderaterain.png";
import { Image, TouchableOpacity } from "react-native";
import { Api } from "../shared/services/axios";
import { WeatherData } from "../shared/@types";
import { getLocales } from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import axios from "axios";
import reactotronConfig from "../config/reactotron";

const Page = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<WeatherData>({} as WeatherData);
  const [city, setCity] = useState("");
  const [hourReload, setHourReload] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastReloadTime, setLastReloadTime] = useState(new Date());

  const deviceLanguage = getLocales()[0].languageCode;

  const getWeather = async () => {
    try {
      setLoading(true);
      const response = await Api.get("/current", {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          language: deviceLanguage,
        },
      });
      const hour = new Date().getHours();
      const minutes = new Date().getMinutes();
      const hourValidate = hour < 10 ? "0" + hour : hour;
      const minutesValidate = minutes < 10 ? "0" + minutes : minutes;
      setHourReload(`${hourValidate}:${minutesValidate}`);
      setWeather(response.data);
      setLastReloadTime(new Date());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getGeocode = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_URL_GEOCODE! + "GetNearestCities",
        {
          headers: {
            "X-RapidAPI-Key": process.env.EXPO_PUBLIC_KEY,
            "X-RapidAPI-Host": process.env.EXPO_PUBLIC_HOST_GEOCODE,
          },
          params: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            range: "0",
          },
        }
      );
      setCity(response.data[0].City);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocale = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  function reloadIfNecessary() {
    setLoading(true);
    const currentTime = new Date();
    const timeDiff = (currentTime.getTime() - lastReloadTime.getTime()) / 1000;
    if (timeDiff > 60 && location) {
      getWeather();
      getGeocode();
      setLastReloadTime(currentTime);
    }
    !location && getLocale();
    setLoading(false);
  }

  useEffect(() => {
    getLocale();
  }, []);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    getWeather();
    getGeocode();
    setLoading(false);
  }, [location]);
  return (
    <Layout>
      <XStack jc="space-between" ai="center" px={20} pt={16} mb={126}>
        <Text fontSize={16} fontWeight={"500"}>
          {city}
        </Text>
        <XStack ai="center">
          <Text pr={8}>Ultima atualização: {hourReload}h</Text>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <TouchableOpacity onPress={reloadIfNecessary}>
              <Ionicons name="reload" size={14} />
            </TouchableOpacity>
          )}
        </XStack>
      </XStack>

      <Image
        source={require("../assets/images/moderaterain.png")}
        style={{ width: 100, height: 100, alignSelf: "center" }}
      />
      <Text fontSize={48} fontWeight={"900"} alignSelf="center" mt={40}>
        {weather?.current?.temperature.toFixed(0) ?? (
          <>
            {loading ? (
              <Spinner size="large" />
            ) : (
              <TouchableOpacity onPress={reloadIfNecessary}>
                <Ionicons name="reload" size={30} />
              </TouchableOpacity>
            )}
          </>
        )}
        ºC
      </Text>
    </Layout>
  );
};

export default Page;
