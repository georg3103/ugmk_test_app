declare type RootState = ReturnType<typeof import("./app/appStore").appStore.getState>;
declare type AppDispatch = ReturnType<typeof import("./app/appStore").AppDispatch>; // TODO: fix
declare type Component<P = any> = (props?: P) => JSX.Element;
declare type TupleToUnion<T extends any[]> = T[number];
type FunctionPayloadArgs<T extends (...args: any) => any> = TupleToUnion<Parameters<T>>

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
