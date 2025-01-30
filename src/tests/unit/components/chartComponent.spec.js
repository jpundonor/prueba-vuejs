import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ChartComponent from "@/components/ChartComponent.vue";
import { useInstrumentStore } from "@/stores/instrument";
import { Chart } from "chart.js";

jest.mock("chart.js", () => {
  const mockChartInstance = {
    destroy: jest.fn(),
    update: jest.fn(),
  };

  const mockChart = jest.fn().mockImplementation(() => mockChartInstance);

  mockChart.register = jest.fn();
  return {
    Chart: mockChart,
    LineController: jest.fn(),
    LineElement: jest.fn(),
    CategoryScale: jest.fn(),
    LinearScale: jest.fn(),
    PointElement: jest.fn(),
    Title: jest.fn(),
    Filler: jest.fn(),
  };
});

describe("ChartComponent", () => {
  let wrapper;
  let store;
  let mockChartInstance;

  const mockHistory = [
    {
      datetimeLastPrice: "06-11-2023 09:00:00",
      lastPrice: 5575.48,
      openPrice: 5620.56,
      lowPrice: 5559.23,
      highPrice: 5661.92,
      closePrice: 5575.48,
    },
    {
      datetimeLastPrice: "09-11-2023 09:00:00",
      lastPrice: 5630.63,
      highPrice: 5695.36,
      lowPrice: 5618.67,
      openPrice: 5647.95,
      closePrice: 5630.63,
    },
  ];

  beforeEach(() => {
    mockChartInstance = {
      destroy: jest.fn(),
      update: jest.fn()
    };
    
    jest.clearAllMocks();
    
    const pinia = createTestingPinia();
    store = useInstrumentStore(pinia);
    store.history = mockHistory;
    
    wrapper = mount(ChartComponent, {
      global: {
        plugins: [pinia]
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });


  it("crea una instancia de Chart al montar", async () => {
    await wrapper.vm.$nextTick();
    expect(Chart).toHaveBeenCalled();

    const [ctx, config] = Chart.mock.calls[0];
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
    expect(config.type).toBe('line');
  });
});
