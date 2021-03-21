<template>
  <div class="traffic__green" :class="{ active: isActive }">
    <div class="text" v-if="isActive"> {{ currentTime }} </div>
  </div>
</template>

<script>
export default {
  props: {
    activeLight: { type: String },
    currentTime: { type: Number },
  },

  computed: {
    isActive() {
      return this.activeLight === "green" ? true : false;
    },
  },
};
</script>

<style scoped>

.traffic__green {
  margin: 10px;
  height: 200px;
  width: 200px;
  background: rgb(14, 92, 14);
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.text {
  font-size: 70px;
  color: white;
  font-weight: 900;
}

.active {
  background: rgb(3, 196, 3);
}

</style>