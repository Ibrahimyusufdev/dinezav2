import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import ContentWrapper from "@/shared/components/ContentWrapper";
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/types/constants";

export const LoginPage = () => {
  return (
    <ContentWrapper>
      {/* Card Wrapper for the LoginForm, Separates layout from form logic */}
      <Card className="mx-auto w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>Sign in Form</CardTitle>
          <CardDescription>Fill in your credential to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p>
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER_SELECT} className="underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
};
