import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Bold from "./components/MfmComponents/Bold.vue";
import Emoji from "./components/MfmComponents/Emoji.vue";
import EmojiCode from "./components/MfmComponents/EmojiCode.vue";
import Text from "./components/MfmComponents/Text.vue";
import Mention from "./components/MfmComponents/Mention.vue";
import Plain from "./components/MfmComponents/Plain.vue";
import Search from "./components/MfmComponents/Search.vue";
import Strike from "./components/MfmComponents/Strike.vue";
import UnicordEmoji from "./components/MfmComponents/UnicordEmoji.vue";
import Url from "./components/MfmComponents/Url.vue";
import Fn from "./components/MfmComponents/Fn.vue";
import Mfm from "./components/Mfm.vue";
import Hashtag from "./components/MfmComponents/Hashtag.vue";
import Bg from "./components/MfmComponents/Bg.vue";
import Fg from "./components/MfmComponents/Fg.vue";

createApp(App)
  .component("MfmComponent", Mfm)
  .component("Bg", Bg)
  .component("Fg", Fg)
  .component("Bold", Bold)
  .component("Emoji", Emoji)
  .component("Text", Text)
  .component("EmojiCode", EmojiCode)
  .component("Mention", Mention)
  .component("Plain", Plain)
  .component("Search", Search)
  .component("Strike", Strike)
  .component("UnicordEmoji", UnicordEmoji)
  .component("Url", Url)
  .component("Fn", Fn)
  .component("Hashtag", Hashtag)
  .mount("#app");
