import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';

export const WaitSignIcon = () => (
  <svg
    width="144"
    height="144"
    viewBox="0 0 144 144"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1021_3722)">
      <rect x="24" y="24" width="96" height="96" rx="48" fill="#FF6F02" />
      <path
        d="M62.3994 54.5469V65.0196H62.4169L62.3994 65.0371L69.3812 72.0014L62.3994 78.9832L62.4169 79.0007H62.3994V89.456H83.3449V79.0007H83.3274L83.3449 78.9832L76.363 72.0014L83.3449 65.0371L83.3274 65.0196H83.3449V54.5469H62.3994ZM79.854 79.856V85.9651H65.8903V79.856L72.8721 72.8741L79.854 79.856ZM72.8721 71.1287L65.8903 64.1469V58.0378H79.854V64.1469L72.8721 71.1287Z"
        fill="#F0F3FA"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1021_3722"
        x="0"
        y="0"
        width="144"
        height="144"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="12" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.435294 0 0 0 0 0.00784314 0 0 0 0.4 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1021_3722"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1021_3722"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export function SignDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen(): void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div>
          <div className="mb-14 mt-10 flex flex-col items-center justify-center">
            <WaitSignIcon />
            <h2 className="text-2xl font-medium">Confirm on Wallet</h2>
          </div>
          <div className="bg-card-modal rounded-lg p-4 text-center text-sm font-medium">
            <span>Check your</span>
            <span className="mx-1 font-semibold text-primary">
              MultiversX Wallet Extension
            </span>
            to sign the transactions
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
