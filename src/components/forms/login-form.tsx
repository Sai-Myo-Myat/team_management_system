"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Box from "../box";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FormValues {
  username: string;
}

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace("/teams");
    }
  }, [auth.isAuthenticated, router]);

  const onSubmit = (data: FormValues) => {
    auth.login(data.username);
    router.replace("/teams");
  };

  return (
    <Box>
      <h1 className="text-center font-bold text-2xl">Login Form</h1>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="min-w-2xs"
                    placeholder="Enter your username..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Log In
          </Button>
        </form>
      </Form>
    </Box>
  );
};

export default LoginForm;
