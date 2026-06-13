import Link from "next/link";
import { BuilderShipLogo } from "@/components/buildership-logo";
import {
  MagicLinkForm,
  ProviderButton,
} from "@/components/auth/provider-button";

export function LoginCard({
  flavor,
  title,
  subtitle,
  redirect,
}: {
  flavor: "builder" | "company";
  title: string;
  subtitle: string;
  redirect: string;
}) {
  return (
    <main className="min-h-screen bg-ink-50 dark:bg-ink-800">
      <div className="container-page flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-4">
            <BuilderShipLogo />
            <span className="pill-lime">{flavor === "builder" ? "Builder access" : "Sponsor access"}</span>
          </div>
          <div className="card p-8">
            <h1 className="h-display text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">{title}</h1>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{subtitle}</p>
            <div className="mt-6 grid gap-3">
              <ProviderButton provider="github" callbackUrl={redirect} className="btn-navy w-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3"/></svg>
                Continue with GitHub
              </ProviderButton>
            </div>
            <div className="my-6 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
              <span className="h-px flex-1 bg-ink-200 dark:bg-ink-700" />OR
              <span className="h-px flex-1 bg-ink-200 dark:bg-ink-700" />
            </div>
            <MagicLinkForm callbackUrl={redirect} />
            <p className="mt-6 text-xs text-ink-500 dark:text-ink-400">
              By continuing you agree to our terms. Same-email accounts across providers auto-merge.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            {flavor === "builder" ? (
              <>Sponsoring the event? <Link className="text-navy-700 underline-offset-4 hover:underline dark:text-lime" href="/companies/login">Switch to sponsor sign-in →</Link></>
            ) : (
              <>Building? <Link className="text-navy-700 underline-offset-4 hover:underline dark:text-lime" href="/builders/login">Switch to builder sign-in →</Link></>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
