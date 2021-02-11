<script>
export default {
  functional: true,
  props: {
    score: {
      default: [],
      type: Array,
    },
    length: {
      default: 21,
      type: Number,
    },
  },
  render(h, { props = {} }) {
    const { score } = props;
    const secondPoint = score.reduce((prev, cur) => prev + cur, 0);
    const firstPoint = score.length - secondPoint;
    const maxLength = Math.max(secondPoint, firstPoint, props.length);
    const childrenArr = score.map((v, idx) => {
      return h(
        "div",
        {
          class: [v === 0 ? "first" : "second", "rounded-sm"],
        },
        String(idx + 1)
      );
    });
    let rangeArr = [];
    for (let i = 1; i <= maxLength; i++) {
      rangeArr.push(
        h(
          "div",
          i <= props.length
            ? { class: "number" }
            : { class: ["number", "deuce"] },
          String(i)
        )
      );
    }
    return h(
      "div",
      {
        class: ["history-queue", "rounded-lg"],
        style: { "--len": maxLength },
      },
      rangeArr.concat(childrenArr)
    );
  },
};
</script>

<style lang='scss'>
.history-queue {
  --size: 25px;
  --len: 21;
  overflow-x: auto;
  box-sizing: content-box;
  border: 4px solid #6660;
  width: calc(var(--len, 21) * (var(--size, 25px) + 4px));
  max-width: 100%;
  margin: 0 auto;
  background: #8882;
  display: grid;
  grid-template-columns: repeat(var(--len, 21), var(--size, 25px));
  grid-template-rows: repeat(3, var(--size));
  gap: 4px;
  > .number {
    grid-row: 1;
    box-sizing: border-box;
    border-bottom: 2px #8884 solid;
    &.deuce {
      border-color: red;
      border-width: 3px;
      color: red;
      font-weight: 700;
    }
  }
  > .first {
    color: black;
    grid-row: 2;
    background: yellowgreen;
  }
  > .second {
    color: black;
    grid-row: 3;
    background: orangered;
  }
}
</style>