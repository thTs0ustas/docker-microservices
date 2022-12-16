import { createContext, useContext, useMemo, useState } from "react";

const Posts = createContext({});

function Provider({ children }) {
  const [state, dispatch] = useState({ refresh: true, data: {} });

  const value = useMemo(() => ({ state, dispatch }));

  return <Posts.Provider value={value}>{children}</Posts.Provider>;
}

const useProvider = () => {
  const { state, dispatch } = useContext(Posts);
  return [state, dispatch];
};

export { useProvider };
export default Provider;
