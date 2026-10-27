import type { MfmComponentMap } from '../context.ts'
import { BlockCode } from './BlockCode.tsx'
import { Bold } from './Bold.tsx'
import { Center } from './Center.tsx'
import { EmojiCode } from './EmojiCode.tsx'
import { Fn } from './Fn.tsx'
import { Hashtag } from './Hashtag.tsx'
import { InlineCode } from './InlineCode.tsx'
import { Italic } from './Italic.tsx'
import { Link } from './Link.tsx'
import { MathBlock } from './MathBlock.tsx'
import { MathInline } from './MathInline.tsx'
import { Mention } from './Mention.tsx'
import { Plain } from './Plain.tsx'
import { Quote } from './Quote.tsx'
import { Search } from './Search.tsx'
import { Small } from './Small.tsx'
import { Strike } from './Strike.tsx'
import { Text } from './Text.tsx'
import { UnicodeEmoji } from './UnicodeEmoji.tsx'
import { Url } from './Url.tsx'
import { Bg } from './Fn/Bg.tsx'
import { Blur } from './Fn/Blur.tsx'
import { Border } from './Fn/Border.tsx'
import { Bounce } from './Fn/Bounce.tsx'
import { Clickable } from './Fn/Clickable.tsx'
import { Fg } from './Fn/Fg.tsx'
import { Flip } from './Fn/Flip.tsx'
import { Font } from './Fn/Font.tsx'
import { Jelly } from './Fn/Jelly.tsx'
import { Jump } from './Fn/Jump.tsx'
import { Position } from './Fn/Position.tsx'
import { Rainbow } from './Fn/Rainbow.tsx'
import { Rotate } from './Fn/Rotate.tsx'
import { Ruby } from './Fn/Ruby.tsx'
import { Scale } from './Fn/Scale.tsx'
import { Shake } from './Fn/Shake.tsx'
import { Sparkle } from './Fn/Sparkle.tsx'
import { Spin } from './Fn/Spin.tsx'
import { Tada } from './Fn/Tada.tsx'
import { Twitch } from './Fn/Twitch.tsx'
import { Unixtime } from './Fn/Unixtime.tsx'
import { X2 } from './Fn/X2.tsx'
import { X3 } from './Fn/X3.tsx'
import { X4 } from './Fn/X4.tsx'

/**
 * 構文ごとのコンポーネントの一覧。キーは AST のノード種別や関数名の先頭を大文字にしたもの（bold → Bold、x2 → X2）
 * MfmProvider・MfmRenderer の components で、一部を差し替えられる
 */
export const defaultComponents: MfmComponentMap = {
  BlockCode,
  Bold,
  Center,
  EmojiCode,
  Fn,
  Hashtag,
  InlineCode,
  Italic,
  Link,
  MathBlock,
  MathInline,
  Mention,
  Plain,
  Quote,
  Search,
  Small,
  Strike,
  Text,
  UnicodeEmoji,
  Url,
  Bg,
  Blur,
  Border,
  Bounce,
  Clickable,
  Fg,
  Flip,
  Font,
  Jelly,
  Jump,
  Position,
  Rainbow,
  Rotate,
  Ruby,
  Scale,
  Shake,
  Sparkle,
  Spin,
  Tada,
  Twitch,
  Unixtime,
  X2,
  X3,
  X4
}

export {
  BlockCode as MfmBlockCode,
  Bold as MfmBold,
  Center as MfmCenter,
  EmojiCode as MfmEmojiCode,
  Fn as MfmFn,
  Hashtag as MfmHashtag,
  InlineCode as MfmInlineCode,
  Italic as MfmItalic,
  Link as MfmLink,
  MathBlock as MfmMathBlock,
  MathInline as MfmMathInline,
  Mention as MfmMention,
  Plain as MfmPlain,
  Quote as MfmQuote,
  Search as MfmSearch,
  Small as MfmSmall,
  Strike as MfmStrike,
  Text as MfmText,
  UnicodeEmoji as MfmUnicodeEmoji,
  Url as MfmUrl,
  Bg as MfmBg,
  Blur as MfmBlur,
  Border as MfmBorder,
  Bounce as MfmBounce,
  Clickable as MfmClickable,
  Fg as MfmFg,
  Flip as MfmFlip,
  Font as MfmFont,
  Jelly as MfmJelly,
  Jump as MfmJump,
  Position as MfmPosition,
  Rainbow as MfmRainbow,
  Rotate as MfmRotate,
  Ruby as MfmRuby,
  Scale as MfmScale,
  Shake as MfmShake,
  Sparkle as MfmSparkle,
  Spin as MfmSpin,
  Tada as MfmTada,
  Twitch as MfmTwitch,
  Unixtime as MfmUnixtime,
  X2 as MfmX2,
  X3 as MfmX3,
  X4 as MfmX4
}
