import { AbiRegistry } from '@multiversx/sdk-core';

import controller from './controller.abi.json';

export function getControllerAbi() {
  return AbiRegistry.create(controller);
}
