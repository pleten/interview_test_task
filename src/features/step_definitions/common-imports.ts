export import deepEqualInAnyOrder = require("deep-equal-in-any-order");
export import chai = require("chai");
export import chaiAsPromised = require("chai-as-promised");

export const expect = chai.use(chaiAsPromised).expect;
export const expectArrayInAnyOrder = chai.use(deepEqualInAnyOrder).expect;

import chaiExclude from "chai-exclude";
chai.use(chaiExclude);

// tslint:disable-next-line:no-var-requires
chai.use(require("chai-sorted"));