import { mount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { createTestingPinia } from "@pinia/testing";

describe("HeaderComponent", () => {
  it("renderiza los datos del estado", async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              instrument: {
                currentIndex: "IPSA",
                summary: {
                  info: {
                    name: "IPSA",
                    countryName: "Chile",
                  },
                  summary: {
                    performanceAbsolute: -15.3,
                    performanceRelative: -0.234469,
                  },
                },
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain(
      "IPSA, CHILEIndice Valor Actual    Var.% Actual  %  Var. Puntos Actual"
    );
  });
});
