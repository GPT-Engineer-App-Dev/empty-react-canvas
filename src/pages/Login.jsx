import { useState } from "react";
import { Container, VStack, Button, Input, Box, Text } from "@chakra-ui/react";
import { useLogin, useRegister } from "../integrations/supabase/index.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const register = useRegister();

  const handleLogin = () => {
    login.mutate({ email, password });
  };

  const handleRegister = () => {
    register.mutate({ email, password });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Box>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;