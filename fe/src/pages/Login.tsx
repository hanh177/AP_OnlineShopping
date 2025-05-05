import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/assets/images/logo.png";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { login } from "@/store/actions/authAction";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SocialLoginBlock from "@/components/ui/social-login-block";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      toast.error((error as { message?: string })?.message || "Login failed");
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center">
          <Link to="/" className="flex flex-col items-center">
            <img src={logo} className="w-16 h-16" />
            <h3 className="text-primary">AP Shopping</h3>
          </Link>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <SocialLoginBlock />

        <div className="flex flex-col items-center gap-2">
          <Link to="/forgot-password">
            <span className="font-light text-sm text-primary hover:font-medium hover:underline transition-all">
              Forgot password?
            </span>
          </Link>
          <p className="font-light text-sm ">
            Dont't have account?{" "}
            <Link to="/register">
              <span className=" text-primary hover:font-medium hover:underline transition-all">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
