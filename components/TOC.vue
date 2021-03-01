<template>
  <div>
    <ul>
      <label>Table of Content</label>
      <li
        v-for="link of toc"
        :key="link.id"
        :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
      >
        <NuxtLink :to="{ hash: `#${link.id}` }" replace>{{ link.text }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["toc"],
};
</script>

<style lang="scss">
</style>