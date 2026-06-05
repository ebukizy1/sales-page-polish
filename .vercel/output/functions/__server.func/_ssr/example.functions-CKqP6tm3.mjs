import { T as TSS_SERVER_FUNCTION, b as createServerFn } from "./server-BxLb0f3W.mjs";
import process$1 from "node:process";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function getServerConfig() {
  return {
    nodeEnv: process$1.env.NODE_ENV
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}
const getGreeting_createServerFn_handler = createServerRpc({
  id: "a8ea96f55c98d9dfe39eba1f21271c6c33bfa924611fe9d828fca0774e41b939",
  name: "getGreeting",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => getGreeting.__executeServer(opts));
const getGreeting = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1)
})).handler(getGreeting_createServerFn_handler, async ({
  data
}) => {
  const config = getServerConfig();
  return {
    greeting: `Hello, ${data.name}!`,
    mode: config.nodeEnv ?? "unknown"
  };
});
const notifyNewOrder_createServerFn_handler = createServerRpc({
  id: "09ae2a65f32d5db9bfcd9527f81e90c587a3ff1b110b2c658a951f49704f8c64",
  name: "notifyNewOrder",
  filename: "src/lib/api/example.functions.ts"
}, (opts) => notifyNewOrder.__executeServer(opts));
const notifyNewOrder = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  to: stringType().email().optional(),
  subject: stringType().min(1),
  text: stringType().min(1)
})).handler(notifyNewOrder_createServerFn_handler, async ({
  data
}) => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : void 0;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = data.to || process.env.ORDER_NOTIFY_EMAIL_TO || void 0;
  if (!host || !port || !user || !pass || !from || !to) {
    return {
      sent: false
    };
  }
  const nodemailer = await import("../_libs/nodemailer.mjs").then(function(n) {
    return n.n;
  });
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });
  await transporter.sendMail({
    from,
    to,
    subject: data.subject,
    text: data.text
  });
  return {
    sent: true
  };
});
export {
  getGreeting_createServerFn_handler,
  notifyNewOrder_createServerFn_handler
};
