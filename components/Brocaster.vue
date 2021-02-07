<template>
  <div class="broadcaster pa-2 rounded-lg elevation-5">yes yes yes</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

const actionLUT = {
  score: "mergeScoring",
  first: "mergePlayer/first",
  second: "mergePlayer/second",
};

const posterFactory = (attr, location = "state", module = "current") => {
  return function () {
    this.broadcaster.postMessage({
      type: "SYNC",
      action: actionLUT[attr],
      payload: this.$store[location][module][attr],
    });
  };
};

export default {
  name: "Broadcaster",
  data() {
    return {
      broadcaster: null,
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
    // ...mapState("current",[
    //   'first','second', 'isSingle', 'gender', 'limit', 'deuceGap', 'deuceLimit', 'swapCourt', 'firstServe', 'prevGames', 'score'
    // ]),
  },
  mounted() {
    this.broadcaster = new BroadcastChannel("BMT_scoring_channel");
    this.broadcaster.onmessage = (e) => {
      console.log("[CONSOLE]: ", e.data);
    };
    this.broadcaster.postMessage("SERVER_ESTABLISHED");
  },
  watch: {
    "$store.state.current.score": {
      handler: posterFactory("score"),
    },
    "$store.state.current.first": {
      handler: posterFactory("first"),
      deep: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.broadcaster {
  display: flex;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: solid #eee4 2px;
  background: #222;
}
</style>