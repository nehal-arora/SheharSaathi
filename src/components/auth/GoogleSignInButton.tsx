"use client";

import {
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

interface GoogleSignInButtonProps {
  onSuccess: (
    credential: string
  ) => Promise<void> | void;

  onError?: () => void;
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
}: GoogleSignInButtonProps) {
  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
        Google Sign-In is not configured.
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex w-full justify-center overflow-hidden rounded-2xl">
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) {
              void onSuccess(
                response.credential
              );
            } else {
              onError?.();
            }
          }}
          onError={onError}
          useOneTap={false}
          theme="filled_black"
          size="large"
          shape="pill"
          text="continue_with"
          logo_alignment="left"
          width="420"
        />
      </div>
    </GoogleOAuthProvider>
  );
}