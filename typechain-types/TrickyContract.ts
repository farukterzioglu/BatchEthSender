/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface TrickyContractInterface extends utils.Interface {
  functions: {
    "sendSingle(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "sendSingle",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "sendSingle", data: BytesLike): Result;

  events: {
    "Deposit(uint256)": EventFragment;
    "EthTransferred(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthTransferred"): EventFragment;
}

export type DepositEvent = TypedEvent<[BigNumber], { value: BigNumber }>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export type EthTransferredEvent = TypedEvent<
  [string, BigNumber],
  { receiver: string; amount: BigNumber }
>;

export type EthTransferredEventFilter = TypedEventFilter<EthTransferredEvent>;

export interface TrickyContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TrickyContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    sendSingle(
      recipient: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  sendSingle(
    recipient: string,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    sendSingle(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(uint256)"(value?: null): DepositEventFilter;
    Deposit(value?: null): DepositEventFilter;

    "EthTransferred(address,uint256)"(
      receiver?: null,
      amount?: null
    ): EthTransferredEventFilter;
    EthTransferred(receiver?: null, amount?: null): EthTransferredEventFilter;
  };

  estimateGas: {
    sendSingle(
      recipient: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    sendSingle(
      recipient: string,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
