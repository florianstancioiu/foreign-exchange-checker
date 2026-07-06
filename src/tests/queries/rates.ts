import baseToQuoteCurrency from "../data/baseToQuoteCurrency";
import nock from "nock";

export const mockRatesQuery = () => {
  nock.disableNetConnect();
  nock("https://api.frankfurter.dev")
    .get("/v2/rates")
    .query({
      base: "USD",
      quotes: "EUR",
    })
    .reply(200, baseToQuoteCurrency);
};
