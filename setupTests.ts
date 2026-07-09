import "@testing-library/jest-dom";
import nock from "nock";

// make sure no fetch request is being made
// that doesn't mean that the useQuery will not be triggered, it will be
// it means that fetch won't trigger
nock.disableNetConnect();
