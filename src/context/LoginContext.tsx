import React, { useState } from 'react';

export const UserContext: any = React.createContext('');

const LoginContext: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export default LoginContext;