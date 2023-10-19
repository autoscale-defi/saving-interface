'use client';
import { useTheme } from 'next-themes';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  const { resolvedTheme } = useTheme();

  const iconColors = {
    background:
      resolvedTheme === 'dark' ? 'rgb(156, 163, 175)' : 'rgb(149, 159, 187)',
    color: resolvedTheme === 'dark' ? 'rgb(149, 159, 187)' : '#D0D0DA',
  };

  return (
    <footer className="border-light-border mt-auto flex w-full justify-center border-t ">
      <div className="container flex max-w-[1280px] flex-col items-center justify-between space-y-4 px-12 py-6 md:flex-row md:space-y-0 ">
        <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400 sm:text-center md:space-x-6">
          <Link
            className="hover:text-white"
            href={'https://devnet.xexchange.com/'}
          >
            Faucet
          </Link>
          <Link
            target="_blank"
            className="hover:text-white"
            href={
              'https://knowing-dewberry-166.notion.site/Savings-by-Autoscale-cd3f225c831d4fc1bff8bb590cad9824?pvs=4'
            }
          >
            Docs
          </Link>
        </div>
        <div
          className="flex items-center justify-center space-x-12"
          key={iconColors.background}
        >
          <span className="text-light-label text-xs">
            Environment: <b>{process.env.NEXT_PUBLIC_DAPP_ENV}</b>
          </span>
          <div className="flex items-center justify-center space-x-4">
            <SocialIcon
              target={'_blank'}
              url="https://twitter.com/autoscale_"
              style={{ height: 25, width: 25 }}
              bgColor={iconColors.background}
              color={iconColors.color}
            />

            <SocialIcon
              target={'_blank'}
              url="https://discord.gg/7Hw2NJZfd9"
              style={{ height: 25, width: 25 }}
              bgColor={iconColors.background}
              color={iconColors.color}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
