<template>
  <div class="score-tab-container" ref="score" v-resize="getHeight">
    <Court :lt="height" :height="height" serve="rt" />
    <Score />
    <Controller>
      <v-btn>something</v-btn>
      <v-btn>is</v-btn>
      <v-btn elevation="0" color="secondary" fab tile @click="clearAll">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </Controller>
  </div>
</template>

<script>
import Score from "../components/Score";
import Court from "../components/Court";
import Controller from "../components/Controller";

export default {
  components: [Score, Court, Controller],
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
