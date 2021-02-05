import { merge } from 'lodash'

export const state = () => ({
  first: {
    name: ['冰淇淋', '楊桃樹'],
    team: "TPE, Chinese Taipei",
    serve: false,
    match: 0,
    score: 0,
    posSwitch: false,
    ops: 'second',
  },
  second: {
    name: ['二組戴姿穎', '二組右邊'],
    team: "台灣代表隊",
    serve: false,
    match: 0,
    score: 0,
    posSwitch: false,
    ops: 'first'
  },
  isSingle: false,
  swapCourt: false,
  gender: "M",
  limit: 21,
  deuceGap: 1,
  deuceLimit: 30,
  swapPoint: 11,
  score: [],
  prevScore: [],
  firstServe: -1,
})

const getPos = (isSwitch = false, isSwap = false) => {
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

export const getters = {
  len: state => state.score.length,
  secondPoint: state => state?.score?.reduce((a, b) => a + b, 0),
  firstPoint: (state, getters) => getters.len - getters.secondPoint,
  firstSwap: (state) => state.score.reduce(
    (acc, current, idx, arr) => {
      if (current === 0) {
        const last = idx ? arr[idx - 1] : state.firstServe;
        if (last === current) {
          acc ^= 1
        }
      }
      return acc
    },
    0
  ),
  secondSwap: (state) => state.score.reduce(
    (acc, current, idx, arr) => {
      if (current === 1) {
        const last = idx ? arr[idx - 1] : state.firstServe;
        if (last === current) {
          acc ^= 1
        }
      }
      return acc
    },
    0
  ),
  servingSide: (state, getters) => {
    return getters.len ? state.score[getters.len - 1] : state.firstServe
  },
  posName: (state, getters) => {
    return null
  }
}



export const mutations = {
  swap(state) {
    state.swapCourt = !state.swapCourt
  },
  addScore(state, [who, value = 1]) {
    const me = state[who]
    const ops = state[me.ops]

    me.score += value
    if (value >= 1) {
      if (me.serve && !state.isSingle) {
        me.posSwitch = !me.posSwitch
      }
      me.serve = true
      ops.serve = false
    } else {
      me.serve = false
      ops.serve = false
    }
    if (
      me.score >= state.limit &&
      me.score > ops.score + state.deuceGap ||
      me.score >= state.deuceLimit
    ) {
      me.match++
      me.score = 0
      ops.score = 0
      me.serve = false
      ops.serve = false
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
  saveMatch(state, payload) {
    state.prevScore.push(payload)
  },
  clear(state, who) {
    const me = state[who]
    if (!me) {
      return
    }
    me.score = 0
    me.match = 0
    me.serve = false
    me.posSwitch = false
    state.swapCourt = false
  },
  changePlayers(state, payload) {
    const { first, second, ...normal } = payload
    const { name: firstName, ...restFirst } = first
    const { name: secondName, ...restSecond } = second
    Object.assign(state, normal)
    Object.assign(state.first, restFirst)
    state.first.name.splice(0)
    state.first.name.push(...firstName)
    Object.assign(state.second, restSecond)
    state.second.name.splice(0)
    state.second.name.push(...secondName)
  }
}

export const actions = {
  clearWho({ commit }, who) {
    if (who === 'all') {
      commit('clear', 'first');
      commit('clear', 'second');
      commit('deleteScore', true);
    } else {
      commit('clear', who)
    }
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
      const match = {
        score: state.score,
        firstServe: state.firstServe,
        winner: (getters.firstPoint > getters.secondPoint) ? 0 : 1
      }
      console.log(JSON.parse(JSON.stringify(match)))

      commit('saveMatch', JSON.parse(JSON.stringify(match)))
      commit('deleteScore', true);
    }
  }
}