export const state = () => ({
  first: {
    name: ['王麒麟', '李楊'],
    team: "TPE, Chinese Taipei",
    match: 0,
    score: 0,
    ops: 'second'
  },
  second: {
    name: ['帶姿尹'],
    subName: 'Tai tsu in',
    team: "台灣",
    match: 0,
    score: 0,
    ops: 'first'
  },
  limit: 21,
  deuceGap: 1,
  deuceLimit: 30,
})

const ops = {
  first: 'second',
  second: 'first',
}

export const mutations = {
  addScore(state, [who, value = 1]) {
    const me = state[who]
    const ops = state[me.ops]

    me.score += value
    if (value >= 1) {
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