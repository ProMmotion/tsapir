export type ClassType<I, Args extends any[] = any[]> = new (...args: Args) => I;
