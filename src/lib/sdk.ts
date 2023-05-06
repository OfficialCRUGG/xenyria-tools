import { XenyriaSDK } from "xenyria-sdk";

let sdk: XenyriaSDK | undefined;

export function getSDK() {
  if (!sdk)
    sdk = new XenyriaSDK({
      token: process.env.XENYRIA_TOKEN || "",
    });

  return sdk;
}
