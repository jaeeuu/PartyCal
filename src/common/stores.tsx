import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { createSignal } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";

export const materialEasing = "linear(0, 0.002, 0.01 3.6%, 0.034, 0.074 9.1%, 0.128 11.4%, 0.194 13.4%, 0.271 15%,0.344 16.1%, 0.544, 0.66 20.6%, 0.717 22.4%, 0.765 24.6%, 0.808 27.3%,0.845 30.4%, 0.883 35.1%, 0.916 40.6%, 0.942 47.2%, 0.963 55%, 0.979 64%,0.991 74.4%, 0.998 86.4%, 1)";
export const springEasing = "linear(0, 0.002, 0.008, 0.017, 0.031 1.9%, 0.07, 0.126 4.1%, 0.252 6.2%, 0.541 10.5%,0.665, 0.779, 0.873, 0.951 18.3%, 0.983, 1.011, 1.036, 1.056, 1.073,1.085 24.5%, 1.096, 1.102 27.2%, 1.103, 1.1 30.4%, 1.094 31.8%, 1.085 33.4%,1.037 40.4%, 1.016 44.1%, 1.007, 1, 0.995, 0.991 52.5%, 0.989 55.4%,0.99 58.8%, 0.998 71.8%, 1.001 79.1%, 1)";
export const springEasing2 = "linear(0, 0.027 2.4%, 0.108 5.3%, 0.579 16.2%, 0.772, 0.905 27%, 0.989 32.8%,1.026 38.1%, 1.038 44.5%, 1.003 72.4%, 0.999)";
export const oneDj: Dayjs = dayjs();

//eslint-disable-next-line
export const [store, setStore] = makePersisted(createSignal(""), {name: "recent", storage: globalThis.sessionStorage as Storage | undefined});