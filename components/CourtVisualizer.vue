<template>
  <Court
    v-bind="{ ...$attrs, ...posName }"
    :serve-color="serveColor"
    :double="!isSingle"
  />
</template>

<script>
import Court from "~/components/Court";
import { mapState, mapGetters } from "vuex";
export default {
  name: "court-vis",
  components: { Court },
  computed: {
    ...mapGetters("current", ["servingSide", "posName"]),
    serveColor() {
      return this.servingSide === 0 ? "greenyellow" : "orangered";
    },
    ...mapState("current", ["isSingle"]),
  },
};
</script>

<style>
</style>