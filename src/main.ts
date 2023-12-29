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
import Italic from "./components/MfmComponents/Italic.vue";
import Quote from "./components/MfmComponents/Quote.vue";
import Link from "./components/MfmComponents/Link.vue";
import Center from "./components/MfmComponents/Center.vue";
import Small from "./components/MfmComponents/Small.vue";
import Inlinecode from "./components/MfmComponents/Inlinecode.vue";

createApp(App)
  .component("MfmComponent", Mfm)
  .component("Bold", Bold)
  .component("Italic", Italic)
  .component("Quote", Quote)
  .component("Emoji", Emoji)
  .component("Center", Center)
  .component("Small", Small)
  .component("Text", Text)
  .component("EmojiCode", EmojiCode)
  .component("Mention", Mention)
  .component("Plain", Plain)
  .component("InlineCode", Inlinecode)
  .component("Search", Search)
  .component("Strike", Strike)
  .component("UnicordEmoji", UnicordEmoji)
  .component("Url", Url)
  .component("Link", Link)
  .component("Fn", Fn)
  .component("Hashtag", Hashtag)
  .mount("#app");
