<template>
  <div class="score-tab-container" ref="score" v-resize="getHeight">
    <CourtVis :height="height" v-if="showCourt" />
    <Score />
    <Controller>
      <v-btn elevation="0" fab tile @click="showCourt = !showCourt">
        <v-icon>mdi-{{ showCourt ? "grid" : "grid-off" }}</v-icon>
      </v-btn>
      <PlayersForm />
      <v-btn elevation="0" color="secondary" fab tile @click="clearAll">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn elevation="0" fab tile @click="swap">
        <v-icon>mdi-swap-horizontal-variant</v-icon>
      </v-btn>
    </Controller>
  </div>
</template>

<script>
import Score from "../components/Score";
import CourtVis from "../components/CourtVisualizer";
import Controller from "../components/Controller";
import PlayersForm from "../components/PlayersForm";

export default {
  components: { Score, CourtVis, Controller, PlayersForm },
  props: {
    minusHeight: {
      // Will be minus from given height?
      default: 64 + 36,
      type: Number,
    },
  },
  data() {
    return {
      height: "0",
      showCourt: true,
    };
  },
  mounted() {
    this.getHeight();
  },
  methods: {
    hello() {
      console.log("hello world.");
    },
    getHeight() {
      this.height = `calc(${window.innerHeight - this.minusHeight}px)`;
    },
    clear() {
      this.$store.commit("current/clear", "first");
      this.$store.commit("current/clear", "second");
    },
    clearAll() {
      this.$store.dispatch("current/clearWho", "all");
    },
    swap() {
      this.$store.commit("current/swap");
    },
  },
};
</script>

<style lang="scss" scoped>
.score-tab-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
