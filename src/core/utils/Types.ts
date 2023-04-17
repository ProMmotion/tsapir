export type ClassType<I, Args extends any[] = any[]> = new (...args: Args) => I;

export type ExtendsType<I, C extends I = any> = C
