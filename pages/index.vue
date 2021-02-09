<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" lg="4" xl="3">
      <v-card class="pa-7 rounded-lg" elevation="5">
        <v-card-title class="headline">
          Badminton Scoring Project
        </v-card-title>
        <v-card-text>
          <p>
            This is a demo app for scoring badminton, and also display score as
            we saw in International court.
          </p>
          <div class="d-flex justify-space-between">
            <v-icon color="pink">mdi-scoreboard</v-icon>
            <v-icon color="red">mdi-vuejs</v-icon>
            <v-icon color="orange">mdi-nuxt</v-icon>
            <v-icon color="yellow">mdi-vuetify</v-icon>
            <v-icon color="green">mdi-github</v-icon>
            <v-icon color="blue">mdi-badminton</v-icon>
            <v-icon color="purple">mdi-broadcast</v-icon>
          </div>
          <hr class="my-3" color="grey" />
        </v-card-text>
        <v-card-actions>
          <v-btn nuxt to="/laws"> Badminton Laws </v-btn>
          <v-spacer />
          <v-btn color="primary" nuxt to="/score"> Go to Scoring </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  transition: "fade",
  head: {
    title: "Index",
  },
};
</script>
