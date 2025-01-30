import { createPinia, setActivePinia } from "pinia";
import { useInstrumentStore } from "../../../stores/instrument";

describe("Instrument Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("actualiza el instrumento seleccionado", async () => {
    const store = useInstrumentStore();
  
    global.fetch = jest.fn((url) => {
      if (url.includes("resumen")) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: { lastPrice: 272 } }),
        });
      }
      if (url.includes("history")) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: { chart: [] } }),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
  
    await store.selectInstrument("AGUAS-A");
  
    expect(store.selectedInstrument).toBe("AGUAS-A");
    expect(store.summary.lastPrice).toBe(272);
  });
});
