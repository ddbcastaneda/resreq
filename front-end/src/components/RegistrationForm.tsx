import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Container,
  CardHeader,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import { TRegistrationInput } from "../types/user";
import { TError } from "../types/error";

type TRegistrationFormProps = {
  onNewUser: (user: TRegistrationInput) => void;
};

const RegistrationForm = ({ onNewUser }: TRegistrationFormProps) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<TError | undefined>();

  const verifyInput = ({
    firstName,
    lastName,
    job,
  }: TRegistrationInput): void => {
    if (!firstName || !lastName || !job) {
      const message = "This cannot be empty";
      let field = "";

      if (!job) field = "job";
      if (!lastName) field = "lastName";
      if (!firstName) field = "firstName";

      setError({ message, field });
    }
  };

  const handleAddUser = (e: React.FormEvent): void => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const job = jobRef.current?.value;

    const user = { firstName, lastName, job };
    verifyInput(user);

    if (!error) onNewUser(user);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginY: "100px" }}>
        <Card>
          <CardHeader title="Registration"></CardHeader>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                inputRef={firstNameRef}
                fullWidth
                error={error?.field === "firstName"}
                helperText={error?.field === "firstName" && error.message}
              />

              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                inputRef={lastNameRef}
                fullWidth
                error={error?.field === "lastName"}
                helperText={error?.field === "lastName" && error.message}
              />

              <TextField
                id="job"
                label="Job"
                variant="outlined"
                inputRef={jobRef}
                fullWidth
                error={error?.field === "job"}
                helperText={error?.field === "job" && error.message}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
