<template>
  <div class="court-wrapper">
    <!-- prettier-ignore -->
    <Court
      v-bind="{ ...$attrs, ...posName }"
      :toogle-reversed="function(){reversed = !reversed}"
      :reversed="reversed"
      :serve-color="serveColor"
      :double="!isSingle"
    />
    <div class="overlay-control" :display="displayOnly ? true : null">
      <template v-if="!displayOnly">
        <v-btn fab :disabled="isSingle" @click="switchPos(0 ^ swapCourt)">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
        <v-btn v-if="len === 0" fab @click="setFirstServe(0 ^ swapCourt)">
          <v-icon>mdi-badminton</v-icon>
        </v-btn>
        <v-btn fab @click="swap">
          <v-icon>mdi-swap-vertical-variant</v-icon>
        </v-btn>
        <v-btn v-if="len === 0" fab @click="setFirstServe(1 ^ swapCourt)">
          <v-icon>mdi-badminton</v-icon>
        </v-btn>
        <v-btn fab :disabled="isSingle" @click="switchPos(1 ^ swapCourt)">
          <v-icon>mdi-swap-horizontal</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          fab
          color="grey lighten-2 black--text"
          @click="reversed = !reversed"
        >
          <v-icon>mdi-rotate-3d-variant</v-icon>
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
import Court from "~/components/Court";
import { mapState, mapGetters } from "vuex";
export default {
  name: "court-vis",
  components: { Court },
  props: {
    displayOnly: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      reversed: false,
    };
  },
  computed: {
    ...mapGetters("current", ["servingSide", "posName", "len"]),
    serveColor() {
      return this.servingSide === 0 ? "greenyellow" : "orangered";
    },
    ...mapState("current", ["isSingle", "swapCourt"]),
  },
  methods: {
    swap() {
      this.$store.commit("current/swap");
    },
    switchPos(who) {
      this.$store.commit("current/switchPos", who);
    },
    setFirstServe(who) {
      this.$store.commit("current/setFirstServe", who);
    },
  },
};
</script>

<style lang='scss'>
.court-wrapper {
  position: relative;
  &:hover,
  &:focus-within {
    .overlay-control {
      opacity: 1;
    }
  }
  .overlay-control {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s;
    transform: translate(-50%, -50%);
    &[display] {
      justify-content: center;
    }
  }
}
</style>