<template>
  <div class="traffic__red" :class="{ active: isActive }">
    <div class="text" v-if="isActive"> {{currentTime}} </div>
  </div>
</template>

<script>
export default {
  props: {
    activeLight: { type: String },
    currentTime: { type: Number }
  },

  computed: {
    isActive() {
      return (this.activeLight === 'red') ? true : false
    }
  },
}
</script>

<style scoped>

.traffic__red {
  margin: 10px;
  height: 200px;
  width: 200px;
  background: rgb(122, 3, 3);
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
  background: red;
}

</style>