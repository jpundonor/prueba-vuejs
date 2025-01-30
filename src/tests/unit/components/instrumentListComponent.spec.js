import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import InstrumentListComponent from "@/components/InstrumentListComponent.vue";
import InstrumentItemComponent from "@/components/InstrumentItemComponent.vue";
import { useInstrumentStore } from "@/stores/instrument";

describe("InstrumentListComponent", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useInstrumentStore();

    store.instruments = [
      {
        codeInstrument: "BCI",
        shortName: "BCI",
        lastPrice: 28251,
        accumulatedVolumeMoney: 167105,
        pctDay: -0.17,
        pct30D: 0.54,
        pctCY: 18.65,
        pct1Y: 25.77,
      },
      {
        codeInstrument: "CAP",
        shortName: "CAP",
        lastPrice: 5649.9,
        accumulatedVolumeMoney: 203018,
        pctDay: -0.87,
        pct30D: -4.20,
        pctCY: -20.83,
        pct1Y: 8.86,
      },
    ];

    store.loadInstruments = jest.fn();

    wrapper = shallowMount(InstrumentListComponent, {
      props: { isFisrt: true },
      global: {
        mocks: {
          $store: store,
        },
      },
    });
  });

  it("renderiza la tabla con encabezados", () => {
    const headers = wrapper.findAll("th");
    expect(headers).toHaveLength(Object.keys(wrapper.vm.headers).length);
    expect(headers.at(0).text()).toContain("Nombre");
    expect(headers.at(1).text()).toContain("Último");
  });

  it("llama a loadInstruments al montarse", () => {
    expect(store.loadInstruments).toHaveBeenCalled();
  });

  it("renderiza correctamente los instrumentos según la propiedad isFisrt", async () => {
    expect(wrapper.findAllComponents(InstrumentItemComponent)).toHaveLength(
      wrapper.vm.secondHalf.length
    );

    await wrapper.setProps({ isFisrt: false });

    expect(wrapper.findAllComponents(InstrumentItemComponent)).toHaveLength(
      wrapper.vm.firstHalf.length
    );
  });

  it("ordena correctamente al hacer clic en el encabezado", async () => {
    const nombreHeader = wrapper.find("th");

    await nombreHeader.trigger("click");

    expect(wrapper.vm.sortKey).toBe("shortName");
    expect(wrapper.vm.sortOrder).toBe("asc");

    await nombreHeader.trigger("click");

    expect(wrapper.vm.sortOrder).toBe("desc");
  });
});
