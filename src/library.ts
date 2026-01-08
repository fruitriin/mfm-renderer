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
import { App } from 'vue'
import { ObjectPlugin } from 'vue'
import MfmRenderer from './components/MfmRenderer.vue'

export default {
  install: (app: App) => {
    app
      .component('MfmRenderer', MfmRenderer)
      .component('MfmComponent', Mfm)
      .component('Bold', Bold)
      .component('Italic', Italic)
      .component('Quote', Quote)
      .component('Small', Small)
      .component('Text', Text)
      .component('Center', Center)
      .component('EmojiCode', EmojiCode)
      .component('Mention', Mention)
      .component('Plain', Plain)
      .component('BlockCode', BlockCode)
      .component('InlineCode', InlineCode)
      .component('Search', Search)
      .component('Strike', Strike)
      .component('UnicodeEmoji', UnicodeEmoji)
      .component('Url', Url)
      .component('Link', Link)

      .component('Hashtag', Hashtag)

      .component('Fn', Fn)
      .component('Fg', Fg)
      .component('Bg', Bg)
      .component('Font', Font)
      .component('Blur', Blur)

      .component('Flip', Flip)
      .component('Scale', Scale)
      .component('Position', Position)

      .component('X2', X2)
      .component('X3', X3)
      .component('X4', X4)

      .component('Jump', Jump)
      .component('Tada', Tada)
      .component('Jelly', Jelly)
      .component('Spin', Spin)
      .component('Twitch', Twitch)
      .component('Shake', Shake)
      .component('Bounce', Bounce)
      .component('Rainbow', Rainbow)
      .component('Sparkle', Sparkle)

      .component('Ruby', Ruby)

    return app
  }
} as ObjectPlugin
