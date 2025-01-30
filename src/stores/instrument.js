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

        const summaryData = await summaryRes.json();
        this.summary = summaryData.data;
        const dataHistory = await historyRes.json();
        this.history = dataHistory.data.chart;
        this.selectedInstrument = instrumentCode;
      } catch (error) {
        console.error("Error seleccionando instrumentos", error);
      }
    },

    filterByDate(date) {
      return this.history.find((item) =>
        item.datetimeLastPrice.startsWith(date)
      );
    },

    filterByDateRange(startDate, endDate) {
      return this.history.filter((item) => {
        const dateString = item.datetimeLastPrice.split(" ")[0];
        const entryDate = new Date(dateString.split("-").reverse().join("-"));
        const start = new Date(startDate.split(" ")[0].split("-").reverse().join("-"));
        const end = new Date(endDate.split(" ")[0].split("-").reverse().join("-"));
        return (
          entryDate >= start && entryDate <= end
        );
        // console.log("dateString", dateString);
        // console.log("start", start);
        // console.log("end", end);
        // return (
        //   dateString >= start && dateString <= end
        // );
        // const entryDate = new Date(dateString.split("-").reverse().join("-"));
        // console.log("entryDate", entryDate);
        // // console.log("endDate", new Date(endDate));
        // return (
        //   entryDate >= new Date(startDate) && entryDate <= new Date(endDate)
        // );
      });
    },

    setChartPeriod(period) {
      this.chartPeriod = period;
    },
  },
  getters: {
    filteredInstruments: (state) => {
      return state.instruments.filter((instrument) =>
        instrument.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
});
