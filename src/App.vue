<template>
  <div>
    <h1>MFM Renderer</h1>
    <textarea v-model="text" style="height: 6rem; width: 40rem" />
    <hr />
    <MfmText :text="text" />

    <hr />
    <h2>進捗？</h2>
    まだできてない<br />
    customEmoji<br />
    <br />
    <hr />
    <h2>テストコード</h2>
    <div v-for="(sample, key) in samples">
      <div>
        <h4>元テキスト</h4>
        <textarea
          :value="sample"
          @input="samples[key] = $event.target.value"
          style="height: 4rem; width: 100%"
        /><br />
      </div>

      <h4>Parsed MFM</h4>
      <div>
        <MfmText :text="sample" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MfmText from "./components/MfmText.vue";
import { ref } from "vue";
import { samples } from "./testCode.ts";

const text = ref("ルビ" + "うま$[ruby 味 あじ]");

function handler(event: HTMLInputElement) {
  return;
}
</script>

<style>
:root {
  --accent: rgb(93, 176, 218);
  --accentDarken: rgb(51, 156, 209);
  --accentLighten: rgb(135, 196, 227);
  --accentedBg: rgba(93, 176, 218, 0.15);
  --focus: rgba(93, 176, 218, 0.3);
  --bg: rgb(246, 248, 249);
  --acrylicBg: rgba(246, 248, 249, 0.5);
  --fg: rgb(99, 107, 113);
  --fgTransparentWeak: rgba(99, 107, 113, 0.75);
  --fgTransparent: rgba(99, 107, 113, 0.5);
  --fgHighlighted: rgb(92, 99, 105);
  --fgOnAccent: rgb(255, 255, 255);
  --fgOnWhite: rgb(51, 51, 51);
  --divider: rgb(230, 233, 234);
  --indicator: rgb(93, 176, 218);
  --panel: rgb(255, 255, 255);
  --panelHighlight: rgb(247, 247, 247);
  --panelHeaderBg: rgb(255, 255, 255);
  --panelHeaderFg: rgb(99, 107, 113);
  --panelHeaderDivider: rgb(230, 233, 234);
  --panelBorder: solid 1px var(--divider);
  --acrylicPanel: rgba(255, 255, 255, 0.5);
  --windowHeader: rgba(255, 255, 255, 0.85);
  --popup: rgb(255, 255, 255);
  --shadow: rgba(0, 0, 0, 0.1);
  --header: rgba(255, 255, 255, 0.7);
  --navBg: rgb(255, 255, 255);
  --navFg: rgb(99, 107, 113);
  --navHoverFg: rgb(58, 63, 67);
  --navActive: rgb(93, 176, 218);
  --navIndicator: rgb(93, 176, 218);
  --link: rgb(93, 176, 218);
  --hashtag: rgb(93, 176, 218);
  --mention: rgb(93, 176, 218);
  --mentionMe: rgb(93, 176, 218);
  --renote: rgb(93, 176, 218);
  --modalBg: rgba(0, 0, 0, 0.3);
  --scrollbarHandle: rgba(0, 0, 0, 0.2);
  --scrollbarHandleHover: rgba(0, 0, 0, 0.4);
  --dateLabelFg: rgb(99, 107, 113);
  --infoBg: rgb(229, 245, 255);
  --infoFg: rgb(114, 129, 138);
  --infoWarnBg: rgb(255, 240, 219);
  --infoWarnFg: rgb(143, 110, 49);
  --switchBg: rgba(0, 0, 0, 0.15);
  --buttonBg: rgba(0, 0, 0, 0.05);
  --buttonHoverBg: rgba(0, 0, 0, 0.1);
  --buttonGradateA: rgb(93, 176, 218);
  --buttonGradateB: rgb(93, 134, 218);
  --switchOffBg: rgba(0, 0, 0, 0.1);
  --switchOffFg: rgb(255, 255, 255);
  --switchOnBg: rgb(93, 176, 218);
  --switchOnFg: rgb(255, 255, 255);
  --inputBorder: rgba(0, 0, 0, 0.1);
  --inputBorderHover: rgba(0, 0, 0, 0.2);
  --listItemHoverBg: rgba(0, 0, 0, 0.03);
  --driveFolderBg: rgba(93, 176, 218, 0.3);
  --wallpaperOverlay: rgba(255, 255, 255, 0.5);
  --badge: rgb(49, 177, 206);
  --messageBg: rgb(246, 248, 249);
  --success: rgb(134, 179, 0);
  --error: rgb(236, 65, 55);
  --warn: rgb(236, 182, 55);
  --codeString: rgb(185, 135, 16);
  --codeNumber: rgb(15, 187, 187);
  --codeBoolean: rgb(98, 183, 12);
  --deckBg: rgb(237, 241, 243);
  --htmlThemeColor: rgb(246, 248, 249);
  --X2: rgb(250, 250, 250);
  --X3: rgba(0, 0, 0, 0.05);
  --X4: rgba(0, 0, 0, 0.1);
  --X5: rgba(0, 0, 0, 0.05);
  --X6: rgba(0, 0, 0, 0.25);
  --X7: rgba(0, 0, 0, 0.05);
  --X8: rgb(114, 186, 223);
  --X9: rgb(72, 166, 213);
  --X10: rgba(93, 176, 218, 0.4);
  --X11: rgba(0, 0, 0, 0.1);
  --X12: rgba(0, 0, 0, 0.1);
  --X13: rgba(0, 0, 0, 0.15);
  --X14: rgba(255, 255, 255, 0.5);
  --X15: rgba(255, 255, 255, 0);
  --X16: rgba(255, 255, 255, 0.7);
  --X17: rgba(246, 248, 249, 0.8);
  color-scheme: light;
  --modalBgFilter: none;
  --blur: none;
}
</style>
