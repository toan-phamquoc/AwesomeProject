# AwesomeProject-React-Native
 - beautiful code:
  => npm install --save-dev eslint-config-standard eslint-config-standard-react eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-react
  => Then, add this to your .eslintrc file: 
    {
      "extends": ["standard", "standard-react"]
    }
# http://localhost:8081/debugger-ui/
# ADB location: C:\Users\YumKuga\AppData\Local\Android\Sdk\platform-tools
# connect react-native to KOPlayer
  * run adb connect 127.0.0.1:6555
  * run adb devices (list devices attached)
  * react-native run-android / react-native start -- --reset-cache

# connect react-native to MEmu
  * run adb connect 127.0.0.1:21503
  * run adb devices (list devices attached)
  * react-native run-android
  * read more : https://jitblog.net/react-native-with-memu-emulator/
