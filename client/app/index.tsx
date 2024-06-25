import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

const Index = () => {
  const { user } = useAuth();

  return user ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
};

export default Index;
