import nock from "nock";
import { getYesterday } from "../../helpers/dates";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";
import liveMarkets from "../data/liveMarkets";

export const mockLiveMarketsQuery = () => {
  nock("https://api.frankfurter.dev")
    .get("/v2/rates")
    .query({
      base: "USD",
      quotes: liveMarketsCurrencies.join(","),
      from: getYesterday(),
    })
    .reply(200, liveMarkets);
};
