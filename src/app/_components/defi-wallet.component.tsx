'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useExtensionLogin, useIsLoggedIn } from '@/lib/dapp-core';
import { useIsFirefox } from '@/lib/utils';

export function DefiWallet() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Connect Wallet</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <XPortalContent onLogin={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function XPortalContent({ onLogin }: { onLogin: () => void }) {
  const isFirefox = useIsFirefox();
  const { initiateLogin } = useExtensionLogin();

  const isLoggedIn = useIsLoggedIn();

  React.useEffect(() => {
    if (isLoggedIn) {
      onLogin();
    }
  }, [isLoggedIn, onLogin]);

  React.useEffect(() => {
    if (window.elrondWallet) {
      initiateLogin();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {window.elrondWallet ? (
        <div className="bg-card-modal flex flex-row justify-center rounded-lg p-4 text-sm font-medium">
          <p>
            Waiting for connexion on
            <span className="mx-1 font-semibold text-primary">
              MultiversX wallet extension.
            </span>
          </p>
        </div>
      ) : (
        <>
          <a
            rel="noreferrer"
            href={
              isFirefox
                ? 'https://addons.mozilla.org/en-US/firefox/addon/maiar-defi-wallet/'
                : 'https://chrome.google.com/webstore/detail/dngmlblcodfobpdpecaadgfbcggfjfnm?authuser=0&hl=en'
            }
            target="_blank"
            className="rounded-md border border-primary px-6 py-2 hover:bg-primary/40"
          >
            Download
          </a>

          <div className="bg-card-modal flex flex-row justify-center rounded-lg p-4 text-sm font-medium">
            <p>
              You do not have the
              <span className="mx-1 font-semibold text-primary">
                MultiversX wallet extension.
              </span>
              Please download and refresh this page.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
