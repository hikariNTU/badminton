<template>
  <div class="score-tab-container" ref="score" v-resize="getHeight">
    <CourtVis v-if="showCourt" :height="height" :no-number="!showNumber" />
    <Broadcaster v-if="broadcast" :show-grid="showCourt" />
    <Score
      :opaque="$vuetify.theme.dark"
      v-on:request-serving-side="requestSide"
    />
    <ServingSideDialog
      v-if="dialog"
      v-on:close-serving-side-dialog="dialog = false"
      :key="Math.random()"
    />
    <Controller>
      <v-btn elevation="0" fab tile @click="showCourt = !showCourt">
        <v-icon>mdi-{{ showCourt ? "grid" : "grid-off" }}</v-icon>
      </v-btn>
      <v-btn elevation="0" fab tile @click="showNumber = !showNumber">
        <v-icon>
          mdi-{{ showNumber ? "crosshairs-gps" : "crosshairs-off" }}
        </v-icon>
      </v-btn>
      <v-btn elevation="0" fab tile @click="swap">
        <v-icon>mdi-swap-vertical-variant</v-icon>
      </v-btn>
      <v-btn elevation="0" fab tile @click="undo" :disabled="len === 0">
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <History />
      <v-btn
        elevation="0"
        :class="broadcast ? 'green white--text' : null"
        fab
        tile
        @click="broadcast = !broadcast"
      >
        <v-icon>mdi-monitor-share</v-icon>
      </v-btn>
      <PlayersForm />
      <v-btn elevation="0" class="error" fab tile @click="clearAll">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </Controller>
    <div class="d-flex flex-column pa-10 red darken-4" v-if="false">
      <div>Length: {{ len }}</div>
      <div>First: {{ firstPoint }}</div>
      <div>Second: {{ secondPoint }}</div>
      <div>FS: {{ firstSwap }}</div>
      <div>SS: {{ secondSwap }}</div>
      <div>firstServe: {{ firstServe }}</div>
      <div>servingSide: {{ servingSide }}</div>
      <div>Pos: {{ posName }}</div>
      <!-- <Court v-bind="posName" height='30rem'/> -->
    </div>
  </div>
</template>

<script>
import Score from "~/components/Score";
import CourtVis from "~/components/CourtVisualizer";
import Controller from "~/components/Controller";
import PlayersForm from "~/components/PlayersForm";
import Broadcaster from "~/components/Brocaster";
import History from "~/components/History";
import ServingSideDialog from "~/components/ServingSideDialog";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    Score,
    CourtVis,
    Controller,
    PlayersForm,
    Broadcaster,
    History,
    ServingSideDialog,
  },
  head: {
    title: "Scoring Center",
  },
  props: {
    minusHeight: {
      // Will be minus from given height?
      default: 64 + 36,
      type: Number,
    },
  },
  data() {
    return {
      dialog: false,
      height: "0",
      showCourt: false,
      broadcast: false,
      showNumber: false,
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
      "posName",
    ]),
    ...mapState("current", ["firstServe"]),
  },
  mounted() {
    this.getHeight();
    this.showCourt = true;
  },
  methods: {
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
    undo() {
      this.$store.commit("current/deleteScore");
    },
    requestSide() {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.score-tab-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
}
</style>
