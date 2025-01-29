import { defineStore } from "pinia";

export const useInstrumentStore = defineStore("instrument", {
  state: () => ({
    selectedInstrument: null,
    currentIndex: "IPSA",
    searchTerm: "",
    instruments: [],
    history: [],
    summary: {},
    chartPeriod: "1M",
  }),

  actions: {
    async loadInstruments() {
      try {
        const response = await fetch(
          `/json-VueJS/constituyentes/constituensList.json`
        );
        if (!response.ok) throw new Error("No se pudo cargar los instrumentos");
        const data = await response.json();
        this.instruments = data.data.constituents;
        // console.log("Instruments", this.instruments);
        // console.log("Type", typeof this.instruments);
      } catch (error) {
        console.error("Error cargando instrumentos", error);
      }
    },

    async selectInstrument(instrumentCode) {
      try {
        const [summaryRes, historyRes] = await Promise.all([
          fetch(`json-VueJS/resumen/${instrumentCode}.json`),
          fetch(`json-VueJS/history/history-${instrumentCode}.json`),
        ]);

        this.summary = await summaryRes.json();
        const dataHistory = await historyRes.json();
        this.history = dataHistory.data.chart;
        // this.history = await historyRes.json();
        this.selectedInstrument = instrumentCode;

        // console.log("Summary", this.summary);
        // console.log("History", this.history);
        // console.log("Selected instrument", this.selectedInstrument);
      } catch (error) {
        console.error("Error seleccionando instrumentos", error);
      }
    },

    setChartPeriod(period) {
      this.chartPeriod = period;
    },

    getters: {
      filteredInstruments: (state) => {
        return state.instruments.filter((instrument) =>
          instrument.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      },
    },
  },
});
