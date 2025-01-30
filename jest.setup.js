import { TextDecoder, TextEncoder } from "util";
import { createCanvas } from "canvas";

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Simular `getContext("2d")` para JSDOM
HTMLCanvasElement.prototype.getContext = function (type) {
  if (type === "2d") {
    return createCanvas(200, 200).getContext("2d");
  }
  return null;
};

// Definir CanvasRenderingContext2D globalmente
global.CanvasRenderingContext2D = createCanvas(200, 200).getContext("2d").constructor;