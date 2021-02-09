<template>
  <div :class="{ 'score-container': true, opaque }">
    <template v-for="(team, who) in { first, second }">
      <div class="name" :key="who + '-name'">
        <div>{{ team.name.join(" | ") }}</div>
        <div>{{ team.subName }}</div>
        <div>{{ team.team }}</div>
      </div>
      <div class="game" :key="who + '-game'">
        {{ who === "first" ? firstGamePoint : secondGamePoint }}
      </div>
      <div
        class="score"
        @click="!readOnly && dispatchScore(who, 1)"
        @contextmenu.prevent="!readOnly && deleteScore()"
        :active="servingSide === (who === 'first' ? 0 : 1)"
        :key="who + '-score'"
        :controllable="readOnly ? null : true"
      >
        {{ who === "first" ? firstPoint : secondPoint }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "ScoringTab",
  props: {
    readOnly: {
      default: false,
      type: Boolean,
    },
    opaque: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      // first: {
      //   name: "Tai, Tzu-yin",
      //   subName: "戴資穎 ",
      //   team: "Chinese Taipei, Taiwan",
      //   game: 0,
      //   score: 0,
      //   serve: false,
      // },
      // second: {
      //   name: "What Ever Who is",
      //   subName: "王麒麟",
      //   team: "Uju Jin, SpaceX, Jenis",
      //   game: 0,
      //   score: 0,
      //   serve: false,
      // },
    };
  },
  computed: {
    first() {
      return this.$store.state.current.first;
    },
    second() {
      return this.$store.state.current.second;
    },
    ...mapGetters("current", [
      "firstPoint",
      "secondPoint",
      "firstGamePoint",
      "secondGamePoint",
      "servingSide",
    ]),
  },
  methods: {
    dispatchScore(who, value = 1) {
      this.$store.dispatch("current/gainScore", who);
    },
    deleteScore() {
      this.$store.commit("current/deleteScore");
    },
  },
};
</script>

<style lang='scss'>
$h: 100vh;

.score-container {
  &.opaque {
    background: #222;
    color: greenyellow;
  }
  width: 100%;
  height: 100%;
  background: #2221;
  color: green;
  display: grid;
  grid-template-columns: 2.5fr 0.5fr 2fr;
  grid-template-rows: 1fr 1fr;
  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-last-child(-n + 3) {
      color: orangered;
    }
    &:nth-child(3)[active] {
      color: #000;
      background: greenyellow;
      &[controllable]:hover {
        background: #cefb8a;
      }
    }
    &:nth-last-child(1)[active] {
      color: #000;
      background: orangered;
      &[controllable]:hover {
        background: #ff9873;
      }
    }
  }
  > hr {
    margin: 0;
    box-sizing: border-box;
    grid-column: span 3;
    border: none;
    background: #000;
    width: 100%;
    height: 100%;
  }
  > .game {
    font-size: $h / 8;
    line-height: 0;
  }
  > .score {
    font-size: $h / 3;
    line-height: $h / 3;
    transition: background-color 0.15s;
    &[controllable] {
      user-select: none;
      cursor: pointer;
      &:hover {
        background-color: #6665;
        &:active {
          background-color: #0005;
        }
      }
    }
  }
  > .name {
    flex-direction: column;
    padding: $h / 50;
    align-items: start;
    justify-content: center;
    text-align: left;
    font-size: $h/24;
    > div:nth-last-child(1) {
      margin-top: $h/24;
    }
  }
}
</style>
