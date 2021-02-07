<template>
  <div id="controller">
    <v-btn elevation="0" fab tile @click="toggleVisible">
      <v-icon>mdi-unfold-{{ visible ? "less" : "more" }}-vertical</v-icon>
    </v-btn>
    <div
      id="control-center"
      :class="{ hidden: !visible }"
      :tabindex="visible ? null : 0"
      @focus="visible = true"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Controller",
  data() {
    return {
      visible: {
        default: true,
        type: Boolean,
      },
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang='scss' scope>
#controller {
  position: absolute;
  display: flex;
  bottom: 1rem;
  left: 50%;
  margin: 0;
  padding: 0;
  color: white;
  outline: #aaa solid 2px;
  transform: translateX(-50%);
  > #control-center {
    display: flex;
    overflow: hidden;
    max-width: calc(6 * 56px);
    transition: max-width 0.2s;
    &.hidden {
      max-width: 0;
    }
  }
  transition: opacity 0.2s;
  opacity: 0.5;
  &:hover,
  &:focus,
  &:focus-within {
    opacity: 1;
  }
}
</style>