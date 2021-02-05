<template>
  <div class="score-tab-container" ref="score" v-resize="getHeight">
    <CourtVis :height="height" v-if="showCourt" />
    <Score />
    <Controller>
      <v-btn elevation="0" fab tile @click="showCourt = !showCourt">
        <v-icon>mdi-{{ showCourt ? "grid" : "grid-off" }}</v-icon>
      </v-btn>
      <v-btn elevation="0" fab tile @click="swap" title="swap court">
        <v-icon>mdi-swap-vertical-variant</v-icon>
      </v-btn>
      <PlayersForm />
      <v-btn elevation="0" class="red darken-4" fab tile @click="clearAll">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </Controller>
    <div class="d-flex flex-column pa-10 red darken-4">
      <div>Length: {{ len }}</div>
      <div>First: {{ firstPoint }}</div>
      <div>Second: {{ secondPoint }}</div>
      <div>FS: {{ firstSwap }}</div>
      <div>SS: {{ secondSwap }}</div>
      <div>servingSide: {{ servingSide }}</div>
    </div>
  </div>
</template>

<script>
import Score from "../components/Score";
import CourtVis from "../components/CourtVisualizer";
import Controller from "../components/Controller";
import PlayersForm from "../components/PlayersForm";

import { mapGetters } from "vuex";

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
      showCourt: false,
    };
  },
  computed: {
    ...mapGetters("current", [
      "len",
      "firstPoint",
      "secondPoint",
      "firstSwap",
      "secondSwap",
      "servingSide",
    ]),
  },
  mounted() {
    this.getHeight();
    this.showCourt = true;
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
