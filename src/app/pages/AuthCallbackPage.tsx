import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AppLoader } from "@/shared/components/AppLoader";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AppLoader />;
};

export default AuthCallbackPage;
