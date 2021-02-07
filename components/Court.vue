<script>
const range = (start, end) =>
  [...Array(end + 1).keys()].filter((value) => end >= value && start <= value);
const position = {
  lt: {
    default: "6(lt)",
  },
  lb: {
    default: "16(lb)",
  },
  rt: {
    default: "7(rt)",
  },
  rb: {
    default: "17(rb)",
  },
};
export default {
  functional: true,
  name: "FPCourt",
  props: {
    double: {
      default: false,
      type: Boolean,
    },
    ...position,
    serve: {
      default: "",
      type: String,
    },
    serveColor: {
      default: "#922",
      type: String,
    },
    courtColor: {
      default: "#262",
      type: String,
    },
    noNumber: {
      default: false,
      type: Boolean,
    },
    height: {
      default: "95vh",
      type: String,
    },
    reversed: {
      default: false,
      type: Boolean,
    },
  },
  render: (h, { props }) => {
    const cells = range(1, 22);
    const posFilter = (pos) => {
      if (!props.noNumber || props[pos] !== position[pos].default) {
        return props[pos];
      } else {
        return "";
      }
    };
    const serveArea = (pos) => {
      switch (props.serve) {
        case "lt":
          return (props.double ? [5, 6] : [2, 6]).includes(pos);
        case "rt":
          return (props.double ? [7, 8] : [3, 7]).includes(pos);
        case "lb":
          return (props.double ? [15, 16] : [16, 20]).includes(pos);
        case "rb":
          return (props.double ? [17, 18] : [17, 21]).includes(pos);
        default:
          return false;
      }
    };
    const cellsName = cells.map((where, idx) => {
      switch (where) {
        case 6:
          return posFilter("lt");
        case 7:
          return posFilter("rt");
        case 16:
          return posFilter("lb");
        case 17:
          return posFilter("rb");
        default:
          return props.noNumber ? "" : where;
      }
    });

    const childrenArr = cellsName.map((v, idx) => {
      if (serveArea(idx + 1)) {
        return h("div", { class: "serve" }, v);
      } else {
        return h("div", v);
      }
    });
    if (props.reversed) {
      childrenArr.reverse();
    }

    return h(
      "div",
      {
        class: "court",
        style: {
          "--serve-color": props.serveColor,
          "--court-color": props.courtColor,
          "--height": props.height,
        },
      },
      childrenArr
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.court {
  --height: 95vh;
  --len: calc(var(--height) / (1340 + 80));
  --gap: calc(4 * var(--len));
  /* Begin CSS */
  all: unset;
  position: relative;
  display: grid;
  width: calc(610 * var(--len) - 2 * var(--gap));
  height: calc(1340 * var(--len) - 2 * var(--gap));
  background: white;
  box-sizing: padding-box;
  padding: var(--gap);
  border: calc(40 * var(--len)) solid var(--court-color, #262);
  box-shadow: 0 0 5px 2px #2225;
  grid-template-columns:
    calc(42 * var(--len))
    calc(253 * var(--len))
    calc(253 * var(--len))
    calc(42 * var(--len));
  grid-template-rows:
    calc(72 * var(--len))
    calc(388 * var(--len))
    calc(196 * var(--len))
    calc(196 * var(--len))
    calc(388 * var(--len))
    calc(72 * var(--len));
  grid-gap: var(--gap);
  :nth-child(10),
  :nth-child(13) {
    grid-column: span 2;
  }
  :nth-child(6),
  :nth-child(7),
  :nth-child(16),
  :nth-child(17) {
    font-size: 1.5em;
  }
  > div {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--court-color, #262);
    box-sizing: border-box;
    &.serve {
      background: var(--serve-color, #922);
      color: black;
      font-weight: 700;
    }
  }
}
</style>
