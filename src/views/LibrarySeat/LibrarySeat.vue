<template>
  <div id="library-seat">
    <h1>Library Seat Selection</h1>
    <div id="seat-area">
      <template v-for="(seatItem, seatIndex) in seatList">
        <span 
          :key="'seatId_'+seatIndex"
          class="seatItem"
          @click.prevent="selectSeat(seatIndex)"
          :style="{width: seatWidth+'rem', height: seatHeight+'rem', top: (seatItem.row*positionGap + (seatItem.row-1)*seatHeight)+'rem', left: (seatItem.col*positionGap + (seatItem.col-1)*seatWidth)+'rem'}">
            <!-- <img src="#" alt="seat"> -->
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "LibrarySeat",
  data() {
    return {
      seatList: [],
      seatWidth: 5,
      seatHeight: 5,
      positionGap: 2
    }
  },
  created() {
    this.axios.get("/test")
              .then(res => {console.log(res)})
              .catch(err => {
                console.log(err)
              })
    this.axios.get("/api/seat")
              .then(res => {
                console.log("seatList" + res)
                let data = res.data
                if(data.statusCode === 200) {
                  this.seatList = res.data.data;
                } else {
                  console.log("[Error]")
                }
              })
              .catch(err => {
                console.log(err)
              })
  },
  methods: {
    selectSeat(seatIndex) {
      console.log("seat index: " + seatIndex)
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  #seat-area {
    position: absolute;
    width: 100vh;
    height: 50rem;

    .seatItem {
      position: absolute;
      background-color: antiquewhite;
    }
  }
</style>