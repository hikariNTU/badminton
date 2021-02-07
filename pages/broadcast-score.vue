<template>
  <v-container class="ma-0 pa-0 d-flex" v-resize="getHeight" fluid>
    <Court :height="height" />
    <div class="d-flex flex-column-reverse justify-center align-stretch pa-2">
      <pre
        v-for="(msg, idx) in recieved"
        :key="idx"
        class="blue-grey darken-2 pa-1 rounded-lg my-1"
        >{{ msg }}</pre
      >
    </div>
    <pre class="ml-auto mb-auto grey">{{ $store.state.current }}</pre>
  </v-container>
</template>

<script>
import Court from "../components/Court";

export default {
  components: { Court },
  layout: "minimal",
  data() {
    return {
      height: "100vh",
      // minusHeight: 64 + 36,
      broadcaster: null,
      recieved: [],
    };
  },
  mounted() {
    this.getHeight();
    this.broadcaster = new BroadcastChannel("BMT_scoring_channel");
    this.broadcaster.onmessage = (e) => {
      console.log(e.data);
      this.recieved.push(e.data);
    };
    this.broadcaster.postMessage("Establish new Reciever");
  },
  methods: {
    getHeight() {
      this.height = `calc(${window.innerHeight}px)`;
    },
  },
  destroyed() {
    this.broadcaster.close();
  },
};
</script>

<style>
</style>