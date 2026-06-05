import { b as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CbO9gT64.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1)
})).handler(createSsrRpc("a8ea96f55c98d9dfe39eba1f21271c6c33bfa924611fe9d828fca0774e41b939"));
const notifyNewOrder = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  to: stringType().email().optional(),
  subject: stringType().min(1),
  text: stringType().min(1)
})).handler(createSsrRpc("09ae2a65f32d5db9bfcd9527f81e90c587a3ff1b110b2c658a951f49704f8c64"));
const getLandingPageData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a0e2360f49e02dc087b5430d5aa4ccbf098e818cc22e7e556f5b552968d7c3d1"));
const getProductBySlugData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  slug: stringType()
})).handler(createSsrRpc("d08d74cdba5b8cdbfa340fa6195950e7cd7f7c47800ce1569c511a523b4cdaf5"));
const getOffersData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("525bd2cbf959dc36e31c6248bb1917ae23e9f675701ed6ba5e796ebcd0a5029f"));
export {
  getLandingPageData as a,
  getProductBySlugData as b,
  getOffersData as g,
  notifyNewOrder as n
};
