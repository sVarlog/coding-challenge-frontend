import { Order, Target } from "utils/interfaces";
import { getOrders, getTargets } from "../api/sheets";
import { createMachine } from "xstate/lib/machine";

const homeMachine = createMachine(
    {
        predictableActionArguments: true,
        id: "home",
        initial: "idle",
        context: {
            values: [] as Order[],
            targets: [] as Target[],
            error: null,
        },
        states: {
            idle: {
                on: {
                    FETCH: "loading",
                },
            },
            loading: {
                invoke: {
                    src: "fetchOrders",
                    onError: {
                        target: "failure",
                        actions: "setError",
                    },
                    onDone: {
                        target: "success",
                        actions: "setOrders",
                    },
                },
            },
            success: {
                on: {
                    FETCH: "loading",
                },
            },
            failure: {
                on: {
                    FETCH: "loading",
                },
            },
        },
    },
    {
        actions: {
            setError: (context, event) => {
                const { data: error } = event;

                context.error = error.message;
            },
            setOrders: (context, event) => {
                const {
                    data: { values, targets },
                } = event;

                context.values = values;
                context.targets = targets;
            },
        },
        services: {
            fetchOrders: async () => {
                const values = getOrders();
                const targets = getTargets();

                return Promise.all([values, targets]).then(
                    ([values, targets]) => {
                        return { values, targets };
                    }
                );
            },
        },
    }
);

export default homeMachine;
