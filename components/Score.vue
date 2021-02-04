
<template>
  <div class="score-container" @mousedown.middle.prevent="clearScore()">
    <div class="name">
      <div>{{ first.name.join(" | ") }}</div>
      <div>{{ first.subName }}</div>
      <div>{{ first.team }}</div>
    </div>
    <div class="game">{{ first.match }}</div>
    <div
      class="score"
      @click="dispatchScore('first', 1)"
      @contextmenu.prevent="dispatchScore('first', -1)"
      :active="first.serve"
    >
      {{ first.score }}
    </div>
    <div class="name">
      <div>{{ second.name.join(" | ") }}</div>
      <div>{{ second.subName }}</div>
      <div>{{ second.team }}</div>
    </div>
    <div class="game">{{ second.match }}</div>
    <div
      class="score"
      @click="dispatchScore('second')"
      @contextmenu.prevent="dispatchScore('second', -1)"
      :active="second.serve"
    >
      {{ second.score }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    limit: {
      default: 21,
      type: Number,
    },
    deuce: {
      default: 1,
      type: Number,
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
  },
  methods: {
    dispatchScore(who, value = 1) {
      this.$store.commit("current/addScore", [who, value]);
    },
    clearScore(who) {
      if (!who) {
        this.$store.commit("current/clear", "first");
        this.$store.commit("current/clear", "second");
      } else {
        this.$store.commit("current/clear", who);
      }
    },
  },
};
</script>

<style lang='scss'>
$h: 100vh;

.score-container {
  width: 100%;
  height: 100%;
  background: #222;
  color: greenyellow;
  display: grid;
  grid-template-columns: 2.5fr 0.5fr 2fr;
  grid-template-rows: 1fr 1fr;
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
    }
    &:nth-last-child(1)[active] {
      color: #000;
      background: orangered;
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
    line-height: 0;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.15s;
    &:hover {
      background-color: #19191955;
      &:active {
        background-color: #0005;
      }
    }
  }
  > .name {
    flex-direction: column;
    padding: $h / 50;
    align-items: start;
    justify-content: center;
    text-align: left;
    font-size: $h/16;
    > div:nth-last-child(1) {
      margin-top: auto;
    }
  }
}
</style>
