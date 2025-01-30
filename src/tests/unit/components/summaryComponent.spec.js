import { mount } from "@vue/test-utils";
import SummaryComponent from "../../../components/SummaryComponent.vue";
import { createTestingPinia } from "@pinia/testing";

describe("SummaryComponent", () => {
  const mockSummary = {
    price: {
      datetimeLastPrice: "06-11-2024 12:52:07",
      openPrice: 6525.38,
      closePrice: 6525.38,
      maxDay: 6525.38,
      minDay: 6469.32,
      max52W: 6838.39,
      min52W: 5559.23,
      pct30D: 0.53,
      pctRelW52: 16.09,
      pctRelCY: 5.28,
    },
    info: {
      marketName: "Bolsa de Santiago",
    },
  };

  it("renderiza correctamente los datos del store", () => {
    const wrapper = mount(SummaryComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: { summary: mockSummary },
            },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain("Bolsa de Santiago");
    expect(wrapper.text()).toContain("6525.38");
    expect(wrapper.text()).toContain("0.53");
  });

  it("aplica clases de estilo condicionales", () => {
    const wrapper = mount(SummaryComponent);

    const classPrice = wrapper.findAll(
      ".text-right .text-green-500, .text-red-500"
    );

    expect(classPrice.length).toBeGreaterThan(0);
  });
});
