import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Bold from "./components/MfmComponents/Bold.vue";
import EmojiCode from "./components/MfmComponents/EmojiCode.vue";
import Text from "./components/MfmComponents/Text.vue";
import Mention from "./components/MfmComponents/Mention.vue";
import Plain from "./components/MfmComponents/Plain.vue";
import Search from "./components/MfmComponents/Search.vue";
import Strike from "./components/MfmComponents/Strike.vue";
import UnicodeEmoji from "./components/MfmComponents/UnicodeEmoji.vue";
import Url from "./components/MfmComponents/Url.vue";
import Fn from "./components/MfmComponents/Fn.vue";
import Mfm from "./components/Mfm.vue";
import Hashtag from "./components/MfmComponents/Hashtag.vue";
import Italic from "./components/MfmComponents/Italic.vue";
import Quote from "./components/MfmComponents/Quote.vue";
import Link from "./components/MfmComponents/Link.vue";
import Small from "./components/MfmComponents/Small.vue";
import Inlinecode from "./components/MfmComponents/Inlinecode.vue";
import BlockCode from "./components/MfmComponents/BlockCode.vue";
import Center from "./components/MfmComponents/Center.vue";
import Ruby from "./components/MfmComponents/Fn/Ruby.vue";
import Fg from "./components/MfmComponents/Fn/Fg.vue";
import Bg from "./components/MfmComponents/Fn/Bg.vue";
import Font from "./components/MfmComponents/Fn/font.vue";
import Blur from "./components/MfmComponents/Fn/Blur.vue";
import x2 from "./components/MfmComponents/Fn/x2.vue";
import x3 from "./components/MfmComponents/Fn/x3.vue";
import x4 from "./components/MfmComponents/Fn/x4.vue";
import Tada from "./components/MfmComponents/Fn/Tada.vue";
import Jump from "./components/MfmComponents/Fn/Jump.vue";
import Jelly from "./components/MfmComponents/Fn/Jelly.vue";
import Scale from "./components/MfmComponents/Fn/Scale.vue";
import Position from "./components/MfmComponents/Fn/Position.vue";
import Spin from "./components/MfmComponents/Fn/Spin.vue";
import Twitch from "./components/MfmComponents/Fn/Twitch.vue";
import Shake from "./components/MfmComponents/Fn/Shake.vue";
import Flip from "./components/MfmComponents/Fn/Flip.vue";
import Rainbow from "./components/MfmComponents/Fn/Rainbow.vue";
import Bounce from "./components/MfmComponents/Fn/Bounce.vue";

createApp(App)
  .component("MfmComponent", Mfm)
  .component("Bold", Bold)
  .component("Italic", Italic)
  .component("Quote", Quote)
  .component("Small", Small)
  .component("Text", Text)
  .component("Center", Center)
  .component("EmojiCode", EmojiCode)
  .component("Mention", Mention)
  .component("Plain", Plain)
  .component("BlockCode", BlockCode)
  .component("InlineCode", Inlinecode)
  .component("Search", Search)
  .component("Strike", Strike)
  .component("UnicodeEmoji", UnicodeEmoji)
  .component("Url", Url)
  .component("Link", Link)

  .component("Hashtag", Hashtag)


    .component("Fn", Fn)
    .component("Fg", Fg)
    .component("Bg", Bg)
    .component("Font", Font)
    .component("Blur", Blur)

    .component("Flip", Flip)
    .component("Scale", Scale)
    .component("Position", Position)

    .component("X2", x2)
    .component("X3", x3)
    .component("X4", x4)

    .component("Jump", Jump)
    .component("Tada", Tada)
    .component("Jelly", Jelly)
    .component("Spin" ,Spin)
    .component("Twitch", Twitch)
    .component("Shake", Shake)
    .component("Bounce", Bounce)
    .component("Rainbow", Rainbow)

    .component("Ruby", Ruby)
    .mount("#app");
