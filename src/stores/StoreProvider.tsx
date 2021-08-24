import { ComponentType, createContext, useContext } from "react";

const StoreContext = createContext(null);
 
export const StoreProvider = ({ children, store }: { children: any, store: any}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

export const withStore = <P extends object>(Component: ComponentType<P>) => (props: any) => {
  return <Component {...props} store={useStore()} />;
};