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
})

const ops = {
  first: 'second',
  second: 'first',
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
    } else {
      commit('clear', who)
    }
  }
}