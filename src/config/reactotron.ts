import { Dimensions, NativeModules, Platform } from "react-native";
import reactotronConfig from "reactotron-react-native";

const { scriptURL } = NativeModules.SourceCode;
const hostName = scriptURL.split("://")[1].split(":")[0];

reactotronConfig
  .configure({
    host: hostName,
  })
  .useReactNative({
    networking: {
      ignoreUrls: /\/(logs|symbolicate)$/,
    },
  });
reactotronConfig.onCustomCommand({
  command: "Get device info",
  handler: () => {
    const { width, height } = Dimensions.get("window");
    reactotronConfig.display({
      name: "Get device info",
      value: {
        width: width,
        height: height,
        OS: Platform.OS,
      },
      important: true,
    });
  },
});

export default reactotronConfig;
