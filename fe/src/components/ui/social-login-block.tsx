import { toast } from "sonner";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import XIcon from "@/components/icons/XIcon";
import { Button } from "./button";

export default function SocialLoginBlock() {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="text-sm text-gray-500">or continue with</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => toast("Google login clicked")}
          title="Login with Google"
        >
          <GoogleIcon />
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => toast("Facebook login clicked")}
          title="Login with Facebook"
        >
          <FacebookIcon />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => toast("X login clicked")}
          title="Login with X"
        >
          <XIcon />
        </Button>
      </div>
    </>
  );
}
