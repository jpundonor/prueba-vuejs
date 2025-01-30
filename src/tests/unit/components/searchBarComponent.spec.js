import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import { useInstrumentStore } from "@/stores/instrument";

describe("SearchBarComponent Component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const pinia = createTestingPinia();
    store = useInstrumentStore(pinia);

    wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [pinia],
      },
    });
  });

  it("renderiza correctamente el input de búsqueda", () => {
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Busca un instrumento"
    );
  });

  it("actualiza el v-model searchTerm al escribir", async () => {
    const input = wrapper.find("input");
    await input.setValue("BCI");

    expect(wrapper.vm.searchTerm).toBe("BCI");
  });

  it("ejecuta selectInstrument al escribir", async () => {
    const input = wrapper.find("input");
    await input.setValue("bci");
    await input.trigger("keyup.enter");

    expect(store.selectInstrument).toHaveBeenCalledWith("BCI");
  });

  it("no ejecuta selectInstrument al escribir si no se ha presionado enter", async () => {
    store.selectInstrument.mockClear();

    const input = wrapper.find("input");
    await input.setValue("bci");

    expect(store.selectInstrument).not.toHaveBeenCalled();
  });
});
