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
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "multiSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600160008190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106678061005c6000396000f3fe6080604052600436106100225760003560e01c8063bb4c9f0b1461005c57610023565b5b7f4d6ce1e535dbade1c23defba91e23b8f791ce5edc0cc320257a2b364e4e3842634604051610052919061045e565b60405180910390a1005b61007660048036038101906100719190610310565b610078565b005b600260005414156100be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100b59061043e565b60405180910390fd5b60026000819055508181905084849050146100d857600080fd5b600034905060005b85859050811015610212578383828181106100fe576100fd61057d565b5b90506020020135826101109190610495565b915060008686838181106101275761012661057d565b5b905060200201602081019061013c91906102e3565b73ffffffffffffffffffffffffffffffffffffffff168585848181106101655761016461057d565b5b9050602002013560405161017890610409565b60006040518083038185875af1925050503d80600081146101b5576040519150601f19603f3d011682016040523d82523d6000602084013e6101ba565b606091505b50509050806101fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f59061041e565b60405180910390fd5b50808061020a90610505565b9150506100e0565b5050600160008190555050505050565b6000813590506102318161061a565b92915050565b60008083601f84011261024d5761024c6105b1565b5b8235905067ffffffffffffffff81111561026a576102696105ac565b5b602083019150836020820283011115610286576102856105b6565b5b9250929050565b60008083601f8401126102a3576102a26105b1565b5b8235905067ffffffffffffffff8111156102c0576102bf6105ac565b5b6020830191508360208202830111156102dc576102db6105b6565b5b9250929050565b6000602082840312156102f9576102f86105c0565b5b600061030784828501610222565b91505092915050565b6000806000806040858703121561032a576103296105c0565b5b600085013567ffffffffffffffff811115610348576103476105bb565b5b61035487828801610237565b9450945050602085013567ffffffffffffffff811115610377576103766105bb565b5b6103838782880161028d565b925092505092959194509250565b600061039e600083610479565b91506103a9826105c5565b600082019050919050565b60006103c1601083610484565b91506103cc826105c8565b602082019050919050565b60006103e4601f83610484565b91506103ef826105f1565b602082019050919050565b610403816104fb565b82525050565b600061041482610391565b9150819050919050565b60006020820190508181036000830152610437816103b4565b9050919050565b60006020820190508181036000830152610457816103d7565b9050919050565b600060208201905061047360008301846103fa565b92915050565b600081905092915050565b600082825260208201905092915050565b60006104a0826104fb565b91506104ab836104fb565b9250828210156104be576104bd61054e565b5b828203905092915050565b60006104d4826104db565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610510826104fb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156105435761054261054e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b50565b7f5472616e73666572206661696c65642e00000000000000000000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b610623816104c9565b811461062e57600080fd5b5056fea2646970667358221220e3677ff93bc0b92b36b4c10f1668abab4e70c0a4877b77a872eb37d5c171cb1264736f6c63430008060033";

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
