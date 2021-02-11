<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <v-card>
        <v-card-title class="headline yellow darken-4 white--text">
          Initial Serving Side
        </v-card-title>
        <v-card-text class="pa-5">
          You need to set the initial serving side to calculate position.
          <v-form>
            <v-radio-group v-model="radioGroup">
              <v-radio color="green" label="1st" :value="0" />
              <v-radio color="orange" label="2nd" :value="1" />
            </v-radio-group>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog"> Ignore </v-btn>
          <v-btn color="info" text @click="closeDialog(true)"> Set </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      radioGroup: -1,
    };
  },
  methods: {
    submit() {
      this.$store.commit("current/setFirstServe", this.radioGroup);
    },
    closeDialog(save = false) {
      if (save) {
        this.submit();
      }
      this.$emit("close-serving-side-dialog");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>