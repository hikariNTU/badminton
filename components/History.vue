<template>
  <v-bottom-sheet v-model="sheet" inset>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed fab tile v-bind="attrs" v-on="on">
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </template>
    <v-sheet class="text-center history pa-7">
      <v-btn
        class="close"
        fab
        tile
        depressed
        small
        @click="sheet = !sheet"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h3 class="ma-2 pa-2">Match History</h3>
      <template v-for="(game, idx) in [...prevGames, { score }]">
        <div :key="`prev-${idx}`">
          <h4 class="mt-4">{{ `Game ${idx + 1}` }}</h4>
          <HistoryQueue :score="game.score" :length="limit" />
        </div>
      </template>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import HistoryQueue from "~/components/HistoryQueue";
import { mapState } from "vuex";
export default {
  components: {
    HistoryQueue,
  },
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    ...mapState("current", ["score", "prevGames", "limit"]),
  },
};
</script>

<style lang='scss' scoped>
.history {
  position: relative;
  > .close{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>