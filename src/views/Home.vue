<template>
  <div class="home">
    <div class="traffic-light__container">
      <traffic-red :activeLight="activeLight" :currentTime="currentTime"/>
      <traffic-yellow :activeLight="activeLight" :currentTime="currentTime"/>
      <traffic-green :activeLight="activeLight" :currentTime="currentTime"/>
    </div>
  </div>
</template>

<script>
import TrafficRed from "../components/TrafficRed";
import TrafficYellow from "../components/TrafficYellow";
import TrafficGreen from "../components/TrafficGreen";

class State {
  constructor(name, duration, path, next) {
    this.name = name;
    this.duration = duration;
    this.path = path;
    this.next = next;
  }
}

class Controller {
  trigger(state, callback) {
    callback(state)
    setTimeout(() => {
      this.trigger(state.next, callback);
    }, state.duration * 1000)
  }
}

export default {
  name: "Home",

  data() {
    return {
      activeLight: "",
      currentTime: 0,
      timer: null,
      states: {},
    };
  },

  components: {
    TrafficRed,
    TrafficYellow,
    TrafficGreen,
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },

    stopTimer() {
      clearTimeout(this.timer);
    },

    setCurrentPath() {
      if (this.$router.currentRoute.path === "/green") {
        return this.states.green;
      } else if (this.$router.currentRoute.path === "/red") {
        return this.states.red;
      } else if (this.$router.currentRoute.path === "/yellow") {
        return this.states.yellowG;
      }
    },

    instanceOfState() {
      const red = new State("red", 10, "/red");
      const yellowR = new State("yellow", 3, "/yellow");
      const yellowG = new State("yellow", 3, "/yellow");
      const green = new State("green", 15, "/green");

      red.next = yellowR;
      yellowR.next = green;
      green.next = yellowG;
      yellowG.next = red;

      this.states = {
        red,
        yellowR,
        yellowG,
        green,
      }
    },
  },

  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
      }
    },
  },

  mounted() {
    const controller = new Controller();

    this.instanceOfState()

    let currentState = this.setCurrentPath()

    controller.trigger(currentState, (state) => {
      this.startTimer();
      this.$router.push(state.path).catch(() => {});
      this.currentTime = state.duration;
      this.activeLight = state.name;
    });
  },
};

</script>

<style scoped>

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>