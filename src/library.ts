import Text from './components/MfmComponents/Text.vue'
import Mfm from './components/Mfm.vue'
import Bold from './components/MfmComponents/Bold.vue'
import Italic from './components/MfmComponents/Italic.vue'
import Quote from './components/MfmComponents/Quote.vue'
import Small from './components/MfmComponents/Small.vue'
import Center from './components/MfmComponents/Center.vue'
import EmojiCode from './components/MfmComponents/EmojiCode.vue'
import Mention from './components/MfmComponents/Mention.vue'
import Plain from './components/MfmComponents/Plain.vue'
import BlockCode from './components/MfmComponents/BlockCode.vue'
import InlineCode from './components/MfmComponents/InlineCode.vue'
import Search from './components/MfmComponents/Search.vue'
import Strike from './components/MfmComponents/Strike.vue'
import UnicodeEmoji from './components/MfmComponents/UnicodeEmoji.vue'
import Url from './components/MfmComponents/Url.vue'
import Link from './components/MfmComponents/Link.vue'
import Hashtag from './components/MfmComponents/Hashtag.vue'
import Fn from './components/MfmComponents/Fn.vue'
import Fg from './components/MfmComponents/Fn/Fg.vue'
import Bg from './components/MfmComponents/Fn/Bg.vue'
import Font from './components/MfmComponents/Fn/Font.vue'
import Blur from './components/MfmComponents/Fn/Blur.vue'
import Flip from './components/MfmComponents/Fn/Flip.vue'
import Scale from './components/MfmComponents/Fn/Scale.vue'
import Position from './components/MfmComponents/Fn/Position.vue'
import X2 from './components/MfmComponents/Fn/X2.vue'
import X3 from './components/MfmComponents/Fn/X3.vue'
import X4 from './components/MfmComponents/Fn/X4.vue'
import Jump from './components/MfmComponents/Fn/Jump.vue'
import Tada from './components/MfmComponents/Fn/Tada.vue'
import Jelly from './components/MfmComponents/Fn/Jelly.vue'
import Spin from './components/MfmComponents/Fn/Spin.vue'
import Twitch from './components/MfmComponents/Fn/Twitch.vue'
import Shake from './components/MfmComponents/Fn/Shake.vue'
import Bounce from './components/MfmComponents/Fn/Bounce.vue'
import Rainbow from './components/MfmComponents/Fn/Rainbow.vue'
import Sparkle from './components/MfmComponents/Fn/Sparkle.vue'
import Ruby from './components/MfmComponents/Fn/Ruby.vue'
import Border from './components/MfmComponents/Fn/Border.vue'
import { App, ObjectPlugin } from 'vue'
import MfmRenderer from './components/MfmRenderer.vue'

// コンポーネントマップを定義
const components = {
  MfmRenderer,
  MfmComponent: Mfm,
  Bold,
  Italic,
  Quote,
  Small,
  Text,
  Center,
  EmojiCode,
  Mention,
  Plain,
  BlockCode,
  InlineCode,
  Search,
  Strike,
  UnicodeEmoji,
  Url,
  Link,
  Hashtag,
  Fn,
  Fg,
  Bg,
  Font,
  Blur,
  Flip,
  Scale,
  Position,
  X2,
  X3,
  X4,
  Jump,
  Tada,
  Jelly,
  Spin,
  Twitch,
  Shake,
  Bounce,
  Rainbow,
  Sparkle,
  Ruby,
  Border,
} as const

export default {
  install: (app: App) => {
    // Object.entries を使用して登録
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
    return app
  },
} as ObjectPlugin
