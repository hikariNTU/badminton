export const state = () => ({
  first: {
    name: ['冰淇淋', '楊桃樹'],
    team: "TPE, Chinese Taipei",
    reversed: false,
  },
  second: {
    name: ['二組接發', '二組'],
    team: "台灣代表隊",
    reversed: false,
  },
  // Setting:
  isSingle: false,
  gender: "M",
  limit: 21,
  deuceGap: 1,
  deuceLimit: 30,
  // Setting: Position Status
  swapCourt: false,
  firstServe: -1,
  // Scoring
  prevGames: [],
  score: [],
})

const getPos = (isSwitch = false, isSwap = false) => {
  // Return calculated pos-label from given status
  if (isSwitch) {
    if (isSwap) {
      return "lb"
    } else {
      return "rt"
    }
  } else {
    if (isSwap) {
      return "rb"
    } else {
      return "lt"
    }
  }
}

const swapCalculator = target => (acc, current, idx, arr) => {
  // Calculate exchange position from given score list.
  if (current === target) {
    const last = idx ? arr[idx - 1] : state.firstServe;
    if (last === current) {
      acc ^= 1
    }
  }
  return acc
}
const [firstSwapCalc, secondSwapCalc] = [swapCalculator(0), swapCalculator(1)]

export const getters = {
  len: state => state.score.length,
  secondPoint: state => state?.score?.reduce((a, b) => a + b, 0),
  firstPoint: (state, getters) => getters.len - getters.secondPoint,
  firstGamePoint: (state, getters) => {
    return state.prevGames.reduce(
      (acc, current) => {
        if (current.winner === 0) {
          acc += 1
        }
        return acc
      }, 0)
  },
  secondGamePoint: (state, getters) => state.prevGames.length - getters.firstGamePoint,
  firstSwap: (state) => state.score.reduce(firstSwapCalc, 0),
  secondSwap: (state) => state.score.reduce(secondSwapCalc, 0),
  servingSide: (state, getters) => {
    return getters.len ? state.score[getters.len - 1] : state.firstServe
  },
  posName: ({ isSingle, swapCourt, first, second, firstServe, ...state }, getters) => {
    const pos = {}
    const { servingSide } = getters
    let servingPoint = 0
    if (servingSide === 0) {
      servingPoint = getters.firstPoint;
    } else if (servingSide === 1) {
      servingPoint = getters.secondPoint;
    }
    if (servingSide !== -1) {
      pos['serve'] = getPos(servingPoint % 2, swapCourt ^ servingSide)
    }
    if (isSingle) {
      // Single
      Object.assign(pos, {
        [getPos(servingPoint % 2, swapCourt)]: first.name[0],
        [getPos(servingPoint % 2, !swapCourt)]: second.name[0],
      })
    } else {
      // Double?
      Object.assign(pos, {
        [getPos(getters.firstSwap, swapCourt)]: first.name[0 ^ first.reversed],
        [getPos(!getters.firstSwap, swapCourt)]: first.name[1 ^ first.reversed],
        [getPos(getters.secondSwap, !swapCourt)]: second.name[0 ^ second.reversed],
        [getPos(!getters.secondSwap, !swapCourt)]: second.name[1 ^ second.reversed],
      })
    }
    return pos
  }
}



export const mutations = {
  swap(state) {
    state.swapCourt = !state.swapCourt
  },
  switchPos(state, who) {
    switch (who) {
      case 'first':
      case 0:
        state.first.reversed ^= 1;
        break;
      case 'second':
      case 1:
        state.second.reversed ^= 1;
        break;
      default:
        console.warn(
          `[${who}] is not valid argv for switch position.`
        )
        return
    }
  },
  writeScore(state, value) {
    state.score.push(value)
  },
  deleteScore(state, all = false) {
    if (all) {
      state.score.splice(0)
    } else {
      state.score.pop()
    }
  },
  saveGame(state, payload) {
    state.prevGames.push(payload)
  },
  deleteGame(state, all = false) {
    if (all) {
      state.prevGames.splice(0)
    } else {
      state.prevGames.pop()
    }
  },
  applyMatch(state, payload) {
    const { first, second, ...normal } = payload
    const { name: firstName, ...restFirst } = first
    const { name: secondName, ...restSecond } = second
    Object.assign(state, normal)
    Object.assign(state.first, restFirst)
    state.first.name.splice(0)
    state.first.name.concat(firstName)
    Object.assign(state.second, restSecond)
    state.second.name.splice(0)
    state.second.name.concat(secondName)
  },
  mergePlayer(state, { target, payload }) {
    if (['first', 'second'].contains(target)) {
      const { name = null, ...rest } = payload
      if (name !== null) {
        state[target].name.splice(0)
        state[target].name.concat(name)
      }
      Object.assign(state[target], rest)
    }
  },
  mergeSetting(state, payload) {
    Object.assign(state, payload)
  },
  mergeScoring(state, payload) {
    state.score.splice(0)
    state.score.concat(payload)
  },
  mergePrevGames(state, payload) {
    // Did Score Reacting?
    state.prevGames.splice(0)
    state.prevGames.concat(payload)
  },
  setFirstServe(state, who) {
    switch (who) {
      case 'first':
      case 0:
        state.firstServe = 0;
        break;
      case 'second':
      case 1:
        state.firstServe = 1;
        break;
      case 'unset':
      case -1:
        state.firstServe = -1
        break;
      default:
        console.warn(`[${who}] is not valid argv for serving.`)
        return
    }
  }
}

export const actions = {
  clearWho({ commit }, who) {
    if (who === 'all') {
      // commit('clear', 'first');
      // commit('clear', 'second');
      commit('deleteScore', true);
      commit('deleteGame', true);
      commit('setFirstServe', -1)
    } else {
      // commit('clear', who)
    }
  },
  saveCurrentGame() {

  },
  gainScore({ commit, getters, state }, who) {
    switch (who) {
      case 'first':
        commit('writeScore', 0)
        break;
      case 'second':
        commit('writeScore', 1)
        break;
      default:
        console.warn(`[${who}] is not valid argv for gain score.`)
        return
    }
    console.log(`1: ${getters.firstPoint}, 2: ${getters.secondPoint}`)
    const max = Math.max(getters.firstPoint, getters.secondPoint)
    if (
      (max >= state.limit &&
        Math.abs(getters.firstPoint - getters.secondPoint) > state.deuceGap) ||
      max >= state.deuceLimit
    ) {
      const game = {
        score: state.score,
        firstServe: state.firstServe,
        winner: (getters.firstPoint > getters.secondPoint) ? 0 : 1
      }
      console.log(JSON.parse(JSON.stringify(game)))

      commit('saveGame', JSON.parse(JSON.stringify(game)))
      commit('deleteScore', true);
    }
  },
  submitMatch({ commit }, payload) {
    if (payload.isSingle) {
      payload.first.name.splice(1)
      payload.second.name.splice(1)
    }
    commit('applyMatch', payload)
  }
}