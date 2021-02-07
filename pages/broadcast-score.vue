<template>
  <v-container class="broadcast-screen" v-resize="getHeight" fluid>
    <CourtVis v-if="showGrid" :height="height" display-only />
    <Score />
    <template v-if="debug">
      <div class="d-flex flex-column-reverse justify-center align-stretch pa-2">
        <pre
          v-for="(msg, idx) in recieved"
          :key="idx"
          class="blue-grey darken-2 pa-1 rounded-lg my-1"
          >{{ msg }}</pre
        >
      </div>
      <pre class="ml-auto mb-auto grey">{{ $store.state.current }}</pre>
    </template>
  </v-container>
</template>

<script>
import Score from "../components/Score";
import CourtVis from "../components/CourtVisualizer";
// import Court from "../components/Court";

export default {
  components: { Score, CourtVis },
  layout: "minimal",
  props: {
    debug: false,
  },
  data() {
    return {
      height: "100vh",
      // minusHeight: 64 + 36,
      broadcaster: null,
      recieved: [],
      showGrid: true,
    };
  },
  mounted() {
    this.getHeight();
    this.broadcaster = new BroadcastChannel("BMT_scoring_channel");
    this.broadcaster.onmessage = (e) => {
      console.log(e.data);
      this.recieved.push(e.data);
      this.handleMessage(e.data);
    };
    this.requestSync();
  },
  methods: {
    getHeight() {
      this.height = `calc(${window.innerHeight}px)`;
    },
    handleMessage(data) {
      const { type = "", action = "", payload = null } = data;
      switch (type) {
        case "SYNC":
          if (action.includes("/")) {
            const [actionName, target] = action.split("/");
            this.$store.commit(`current/${actionName}`, { target, payload });
          } else {
            this.$store.commit(`current/${action}`, payload);
          }
          break;
        case "SRV_EST":
          this.requestSync();
          break;
        case "DISPLAY":
          switch (action) {
            case "show grid":
              this.showGrid = Boolean(payload);
              break;
            default:
              console.log("DISPLAY Unknown?", data);
              break;
          }
          break;
        default:
          console.log("Reciever Unknown?", data);
      }
    },
    requestSync() {
      this.broadcaster.postMessage({
        type: "REQUEST_SYNC",
      });
    },
  },
  destroyed() {
    this.broadcaster.close();
  },
};
</script>

<style lang='scss' scoped>
.broadcast-screen {
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  height: 100%;
}
</style>