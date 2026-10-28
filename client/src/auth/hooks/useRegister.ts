import { AxiosError } from "axios";
import { registerMethod, type IRegisterBody } from "../services/auth-service";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useRegister = () => {
     const navigate = useNavigate();
     const registerUser = async (body: IRegisterBody) => {
          try {
               await registerMethod(body);
               toast.success("Usuario Registrado");
               navigate("/login");
          } catch (error) {
               if (error instanceof AxiosError)
                    toast.error(error.response?.data.message);
          }
     };

     return { registerUser };
};
