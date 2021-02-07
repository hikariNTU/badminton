<template>
  <div class="broadcaster pa-2 elevation-5">
    <v-icon color="green">mdi-broadcast</v-icon>
    <span>Broadcasting Now</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const actionLUT = {
  score: "mergeScoring",
  first: "mergePlayer/first",
  second: "mergePlayer/second",
  generalSetting: "mergeSetting",
  prevGames: "mergePrevGames",
};

const posterFactory = (attr, location = "state", module = "current") => {
  return function () {
    // if (location === "getters") {
    //   console.log(this.$store[location]);
    // }
    this.broadcaster.postMessage({
      type: "SYNC",
      action: actionLUT[attr],
      payload:
        location === "getters"
          ? this.$store[location][[module, attr].join("/")]
          : this.$store[location][module][attr],
    });
  };
};

export default {
  name: "Broadcaster",
  props: {
    showGrid: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      broadcaster: null,
    };
  },
  computed: {
    ...mapGetters("current", ["generalSetting"]),
  },
  mounted() {
    this.broadcaster = new BroadcastChannel("BMT_scoring_channel");
    this.broadcaster.onmessage = ({ data }) => {
      console.log("[CONSOLE]: ", data);
      const { type = "", payload = "" } = data;
      if (type === "REQUEST_SYNC") {
        this.syncScore();
        this.syncFirst();
        this.syncSecond();
        this.syncGeneralSetting();
        this.syncPrevGames();
      }
    };
    this.broadcaster.postMessage({
      type: "SRV_EST",
      payload: "Broadcast Server is establish and running.",
    });
  },
  watch: {
    "$store.state.current.score": {
      handler: posterFactory("score"),
    },
    "$store.state.current.prevGames": {
      handler: posterFactory("prevGames"),
    },
    "$store.state.current.first": {
      handler: posterFactory("first"),
      deep: true,
    },
    "$store.state.current.second": {
      handler: posterFactory("second"),
      deep: true,
    },
    generalSetting: {
      handler: posterFactory("generalSetting", "getters"),
      deep: true,
    },
    showGrid() {
      this.broadcaster.postMessage({
        type: "DISPLAY",
        action: "show grid",
        payload: this.showGrid,
      });
    },
  },
  methods: {
    syncScore: posterFactory("score"),
    syncFirst: posterFactory("first"),
    syncSecond: posterFactory("second"),
    syncGeneralSetting: posterFactory("generalSetting", "getters"),
    syncPrevGames: posterFactory("prevGames"),
    cleanUp() {
      if (this.broadcaster?.close) {
        this.broadcaster.close();
      }
    },
  },
  destroyed() {
    this.cleanUp();
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
  border-radius: 100vh;
  background: #222;
  color: #eee;
  > span {
    display: none;
    margin: 0 0.5rem;
  }
  &:hover {
    > span {
      display: unset;
    }
  }
}
</style>