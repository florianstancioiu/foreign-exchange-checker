import currencies from "../data/currencies";
import nock from "nock";

export const mockCurrenciesQuery = () => {
  nock("https://api.frankfurter.dev")
    .get("/v2/currencies")
    .reply(200, currencies);
};
