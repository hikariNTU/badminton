<template>
  <Court
    v-bind="$attrs"
    :lt="lt"
    :rt="rt"
    :lb="lb"
    :rb="rb"
    :serve="servePos"
    :serve-color="serveColor"
    :double="!isSingle"
    no-number
  />
</template>

<script>
import Court from "~/components/Court";
import { mapState } from "vuex";
const getName = (team, nd = false, isSingle = false) => {
  return isSingle ? team.name[0] : team.name[Number(team.posSwitch ^ nd)];
};
export default {
  name: "court-vis",
  components: { Court },
  computed: {
    lt() {
      return !this.swapCourt
        ? getName(this.first, this.swapCourt, this.isSingle)
        : getName(this.second, this.swapCourt, this.isSingle);
    },
    rt() {
      return !this.swapCourt
        ? getName(this.first, !this.swapCourt, this.isSingle)
        : getName(this.second, !this.swapCourt, this.isSingle);
    },
    lb() {
      return this.swapCourt
        ? getName(this.first, this.swapCourt, this.isSingle)
        : getName(this.second, this.swapCourt, this.isSingle);
    },
    rb() {
      return this.swapCourt
        ? getName(this.first, !this.swapCourt, this.isSingle)
        : getName(this.second, !this.swapCourt, this.isSingle);
    },
    servePos() {
      const serving = this.first.serve ^ this.second.serve;
      if (!serving) {
        return;
      }
      const y = this.swapCourt ^ this.first.serve;
      const x = this.first.serve
        ? this.first.score % 2 === 1
        : this.second.score % 2 === 0;
      return `${x ^ this.swapCourt ? "r" : "l"}${y ? "t" : "b"}`;
    },
    serveColor() {
      return this.first.serve ? "greenyellow" : "orangered";
    },
    ...mapState({
      first: (state) => state.current.first,
      second: (state) => state.current.second,
      swapCourt: (state) => state.current.swapCourt,
      isSingle: (state) => state.current.isSingle,
    }),
  },
};
</script>

<style>
</style>