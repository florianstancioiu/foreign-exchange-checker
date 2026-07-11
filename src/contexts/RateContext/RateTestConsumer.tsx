import { useRateContext } from "../../hooks/useRateContext";

const RateTestConsumer = () => {
  const {
    base,
    quote,
    sendValue,
    receiveValue,
    setBaseHandler,
    setQuoteHandler,
    setSendValue,
    onExchangeBtnClickHandler,
    loadCurrencies,
  } = useRateContext();

  return (
    <>
      <div data-testid="rate_base">{base}</div>
      <div data-testid="rate_quote">{quote}</div>
      <div data-testid="rate_send_value">{sendValue}</div>
      <div data-testid="rate_receive_value">{receiveValue}</div>

      <button onClick={() => setBaseHandler("RON")} data-testid="base_btn">
        Base
      </button>
      <button onClick={() => setQuoteHandler("CAD")} data-testid="quote_btn">
        Quote
      </button>
      <button onClick={() => setSendValue(9999)} data-testid="send_btn">
        Send
      </button>
      <button onClick={onExchangeBtnClickHandler} data-testid="exchange_btn">
        Exchange
      </button>
      <button
        onClick={() => loadCurrencies("AUD", "CAD")}
        data-testid="load_btn"
      >
        Load
      </button>
    </>
  );
};

export default RateTestConsumer;
