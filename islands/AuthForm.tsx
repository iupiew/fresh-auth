
import { useState } from "preact/hooks";
import { FormButton, Input, Link } from "components/index.ts";

type Props = {
  mode: "In" | "Up";
};

export default function AuthForm({ mode }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = { title: "Sign In", href: "/sign-in", text: "Have an account?" };
  const signUp = { title: "Create account", href: "/sign-up", text: "No account?" };
  const buttProps = mode === "In" ? signIn : signUp;
  const footProps = mode === "In" ? signUp : signIn;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("/api" + buttProps.href, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    setIsProcessing(false);

    if (response.ok) {
      console.log("✅ Auth success:", result);

      // 🔥 Refresh the page to update auth state
      location.reload();
    } else {
      console.error("❌ Auth error:", result.error);
      setErrorMessage(result.error);
    }
  };

  return (
    <div class="items-stretch min-w-0">
      <div class="flex justify-center text-white">
        <h2 class="my-4">{buttProps.title}</h2>
      </div>

      <form class="flex flex-col space-y-4 min-w-0 text-white" onSubmit={handleSubmit}>
        <Input autofocus type="email" name="email" class="bg-black" required />
        <Input type="password" name="password" class="bg-black" required />

        <FormButton type="submit" class="!mt-8" disabled={isProcessing}>
          {isProcessing ? "Processing..." : buttProps.title}
        </FormButton>

        {errorMessage && <p class="text-red-500">{errorMessage}</p>}

        <p>
          {footProps.text} <Link href={footProps.href}>{footProps.title}</Link>
        </p>
      </form>
    </div>
  );
}

