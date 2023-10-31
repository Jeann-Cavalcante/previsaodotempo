import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { getLocales } from "expo-localization";

type Props = {
  children: React.ReactNode;
  summary?: string;
};

const Layout = ({ summary = "Nublado", children }: Props) => {
  // console.log(deviceLanguage);
  const colors = [
    { Nublado: ["#BCE8FF", "#fff"] },
    { Sol: ["rgba(0,0,0,0.8)", "transparent"] },
  ];
  return (
    <>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#BCE8FF", "#fff"]}
        start={{ x: 0.1, y: 0 }}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Layout;
