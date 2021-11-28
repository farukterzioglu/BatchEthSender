/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BatchSender, BatchSenderInterface } from "../BatchSender";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EthTransferred",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount2",
        type: "uint256",
      },
    ],
    name: "sendEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x6080604052600160008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106508061005c6000396000f3fe6080604052600436106100225760003560e01c806313f093ea1461009957610060565b36610060577f4d6ce1e535dbade1c23defba91e23b8f791ce5edc0cc320257a2b364e4e38426346040516100569190610471565b60405180910390a1005b7f4d6ce1e535dbade1c23defba91e23b8f791ce5edc0cc320257a2b364e4e384263460405161008f9190610471565b60405180910390a1005b6100b360048036038101906100ae91906102c2565b6100b5565b005b600260005414156100fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100f290610451565b60405180910390fd5b6002600081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610193576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161018a90610431565b60405180910390fd5b600081846101a191906104a8565b905060008573ffffffffffffffffffffffffffffffffffffffff16856040516101c9906103d3565b60006040518083038185875af1925050503d8060008114610206576040519150601f19603f3d011682016040523d82523d6000602084013e61020b565b606091505b505090508061024f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024690610411565b60405180910390fd5b7fcec1f18c3ab8ddaaa107a1591e3c369667eec613626611a8deaedef43069fcdd86866040516102809291906103e8565b60405180910390a15050600160008190555050505050565b6000813590506102a7816105ec565b92915050565b6000813590506102bc81610603565b92915050565b600080600080608085870312156102dc576102db610569565b5b60006102ea87828801610298565b94505060206102fb878288016102ad565b935050604061030c87828801610298565b925050606061031d878288016102ad565b91505092959194509250565b610332816104fe565b82525050565b6000610345601483610497565b91506103508261056e565b602082019050919050565b6000610368600983610497565b915061037382610597565b602082019050919050565b600061038b60008361048c565b9150610396826105c0565b600082019050919050565b60006103ae601f83610497565b91506103b9826105c3565b602082019050919050565b6103cd81610530565b82525050565b60006103de8261037e565b9150819050919050565b60006040820190506103fd6000830185610329565b61040a60208301846103c4565b9392505050565b6000602082019050818103600083015261042a81610338565b9050919050565b6000602082019050818103600083015261044a8161035b565b9050919050565b6000602082019050818103600083015261046a816103a1565b9050919050565b600060208201905061048660008301846103c4565b92915050565b600081905092915050565b600082825260208201905092915050565b60006104b382610530565b91506104be83610530565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156104f3576104f261053a565b5b828201905092915050565b600061050982610510565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600080fd5b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b7f4e6f74206f776e65720000000000000000000000000000000000000000000000600082015250565b50565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6105f5816104fe565b811461060057600080fd5b50565b61060c81610530565b811461061757600080fd5b5056fea26469706673582212207fced12989409672f3dc89b32acb5a38b7f81af6a8e13eabdc8daebed8c81eca64736f6c63430008060033";

type BatchSenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BatchSenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BatchSender__factory extends ContractFactory {
  constructor(...args: BatchSenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<BatchSender> {
    return super.deploy(overrides || {}) as Promise<BatchSender>;
  }
  getDeployTransaction(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BatchSender {
    return super.attach(address) as BatchSender;
  }
  connect(signer: Signer): BatchSender__factory {
    return super.connect(signer) as BatchSender__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BatchSenderInterface {
    return new utils.Interface(_abi) as BatchSenderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BatchSender {
    return new Contract(address, _abi, signerOrProvider) as BatchSender;
  }
}