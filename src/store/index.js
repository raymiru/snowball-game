const state = {
  state: {
    width: 356,
    height: 700,
    behavior: null
  },
  changeBehavior(fn) {
    this.state.behavior = fn
  },

  methods: {
    play() {
      console.log('play')
    },
    hello() {
      console.log('hello')
    }
  }

}

export default state
