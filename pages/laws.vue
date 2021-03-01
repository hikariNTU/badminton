<template>
  <v-container class="" fluid>
    <v-row>
      <TOC :toc="page.toc" class="col-xl-2 col-lg-3 col-md-4 col-12 toc" />
      <nuxt-content
        :document="page"
        class="mx-auto col-xl-10 col-lg-9 col-md-8 col-12"
      ></nuxt-content>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("rules").fetch();

    return {
      page,
    };
  },
};
</script>

<style lang='scss'>
.nuxt-content {
  font-size: 1.5em;
  @media screen and (max-width: 600px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 400px) {
    font-size: 1em;
  }
  font-family: "Times New Roman", Times, serif;
  max-inline-size: 1280px;
  margin: auto 1rem;

  h1 {
    // color: #eee;
    margin-bottom: 2rem;
    font-family: "Times New Roman", Times, serif;
  }
  th {
    text-align: left;
    border-bottom: 2px solid #eee2;
  }
  h2 {
    // color: #ccc;
    border-left: solid #ccc 0.2rem;
    margin: 5rem 0 2rem 0;
    padding-left: 1.5rem;
    font-family: "Times New Roman", Times, serif;
  }
  img {
    border: #6666 solid 0.1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px 1px #6666;
    width: 100%;
    margin: 1rem 0;
  }
  ol {
    margin-left: 1.2em;
  }
  table,
  th,
  td {
    border: solid 1px #9995;
    border-collapse: collapse;
  }
  td {
    padding: 0.5rem;
  }
  th {
    text-align: center;
  }
  blockquote {
    background: #9991;
    padding: 1rem;
    margin: 2.5rem auto;
  }
}
.toc {
  display: block;
  // border: solid 1px #6666;
  padding: 3rem 2rem;
  box-shadow: 0 0 5px 1px #6666;
  position: relative;
  font-weight: 700;
  ul {
    position: sticky;
    padding-left: 0;
    top: 8rem;
    @media screen and (min-width: 960px) {
      max-height: calc(100vh - 8rem);
      overflow: auto;
    }
    list-style: none;
    ul {
      margin-left: 2rem;
      // border-left: solid 1px #6666;
      list-style: initial;
    }
  }
  li {
    // color: #eee;
    border-top: solid 1px #6666;
  }
  a {
    display: block;
    padding: 0.25rem 0;
    &:link,
    &:visited {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      // color: #eee;
      text-decoration: none;
    }
    &:hover,
    &:focus {
      background: #9993;
    }
    &:active {
      background: #9996;
    }
  }
}
</style>