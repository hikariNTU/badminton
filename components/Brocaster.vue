<template>
  <v-sheet class="broadcaster pa-2 elevation-5">
    <template v-if="available">
      <v-icon color="green" class="pa-2 spin">mdi-autorenew</v-icon>
      <router-link
        :to="[$route.path, 'broadcast-score'].join('/')"
        target="_blank"
      >
        <v-btn class="green--text">
          Broadcasting <v-icon class="ml-2">mdi-open-in-new</v-icon>
        </v-btn>
      </router-link>
    </template>
    <template v-else>
      <strong class="warning--text rounded px-1 mx-5">
        BroadcastChannel is not available in this browser.
      </strong>
    </template>
  </v-sheet>
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
      available: true,
      openHandler: null,
    };
  },
  computed: {
    ...mapGetters("current", ["generalSetting"]),
  },
  mounted() {
    if ("BroadcastChannel" in window) {
      this.broadcaster = new BroadcastChannel("BMT_scoring_channel");
      this.broadcaster.onmessage = ({ data }) => {
        console.log("[CONSOLE]: ", data);
        const { type = "", payload = "" } = data;
        switch (type) {
          case "REQUEST_SYNC":
            this.syncScore();
            this.syncFirst();
            this.syncSecond();
            this.syncGeneralSetting();
            this.syncPrevGames();
            this.clearOpener();
            break;
          default:
            break;
        }
      };
      this.broadcaster.postMessage({
        type: "SRV_EST",
        payload: "Broadcast Server is establish and running.",
      });
      // Open New Broad Cast window if none of one receiver response with sync command.
      this.openHandler = setTimeout(function () {
        window.open(
          [document.location.href, "broadcast-score"].join("/"),
          "_blank"
        );
      }, 500);
    } else {
      this.available = false;
    }
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
    clearOpener() {
      if (this.openHandler) {
        window.clearTimeout(this.openHandler);
        this.openHandler = null;
      }
    },
    cleanUp() {
      if (this.broadcaster?.close) {
        this.broadcaster.close();
      }
      this.clearOpener();
    },
  },
  destroyed() {
    this.cleanUp();
  },
};
</script>

<style lang='scss' scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes blink-in {
  from {
    opacity: 0;
  }
  7% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.spin {
  animation: spin 2s linear infinite;
}
.broadcaster {
  width: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: solid #eee4 2px;
  border-radius: 100vh;
  // background: #222;
  color: #eee;
  animation: 0.5s 1 normal linear blink-in;
  // transition: opacity 0.2s;
  > a {
    display: block;
    // margin-right: 1rem;
    text-decoration: none;
    overflow: hidden;
    max-width: 0px;
  }
  &:hover,
  &:focus,
  &:focus-within,
  &:focus-visible {
    opacity: 1;
    > a {
      margin-right: 1rem;
      max-width: unset;
    }
  }
}
</style>