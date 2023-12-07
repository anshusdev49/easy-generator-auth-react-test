import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface TokenContextProps {
  children: ReactNode;
}

interface TokenContextValue {
  token: string | null;
  setToken: (value: string | null) => void;
  removeToken: () => void;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

const TokenProvider: React.FC<TokenContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const removeToken = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue: TokenContextValue = {
    token,
    setToken,
    removeToken
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

const useToken = (): TokenContextValue => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

export { TokenProvider, useToken };
