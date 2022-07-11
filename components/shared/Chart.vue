<template>
  <div class="chart-container">
    <canvas id="pokeChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    types: {
      type: Array,
      required: true,
    },
    figures: {
      type: Array,
      required: true,
    },
    fontColour: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      myChart: null,
    };
  },

  methods: {
    createChart(statTypes, statFigures, labelFontColour = "rgb(12,58,83)") {
      const chart = document.getElementById("pokeChart").getContext("2d");
      this.myChart = new Chart(chart, {
        type: "doughnut",
        data: {
          labels: statTypes.map((currentType) => currentType.toUpperCase()),
          datasets: [
            {
              data: statFigures,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(2, 100, 255)",
                "rgb(235, 162, 189)",
                "rgb(55, 206, 186)",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  style: "italic",
                },
                color: labelFontColour,
                padding: 12,
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    console.log(this);
    console.log(this.fontColour);
    const [red, green, blue] = this.fontColour.split(",");

    console.log(`rgb(${red}, ${green}, ${blue})`);

    this.createChart(this.types, this.figures, `rgb(${red}, ${green}, ${blue})`);
    // this.createChart(this.types, this.figures);
    console.log(this.fontColour);
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 50rem;
  height: 50rem;
  margin: 0 auto;

  #pokeChart {
    width: 100%;
    height: 100%;
  }
}
</style>