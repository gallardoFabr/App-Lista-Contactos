import { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { isTokenExpired } from "../helpers/validate-token";
import { Navigate } from "react-router";

type Props = {
     children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(true);

     const { login, logout } = useAppContext();

     useEffect(() => {
          async function getAuth() {
               const token = localStorage.getItem("token") as string;
               const userAuth = localStorage.getItem("user") as string;

               if (token && userAuth) {
                    if (isTokenExpired(token)) {
                         logout();
                         localStorage.clear();
                         setIsAuthenticated(false);
                         return;
                    }
                    setIsAuthenticated(true);
                    login(JSON.parse(userAuth), JSON.parse(token));
               } else {
                    logout();
                    localStorage.clear();
                    setIsAuthenticated(false);
               }
               setLoading(false);
          }
          getAuth();
     }, []);

     if (loading) return null;

     return isAuthenticated ? children : <Navigate to="/login" />;
}
