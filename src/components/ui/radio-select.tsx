import React, { PropsWithChildren } from 'react';

const RadioSelect = ({ children }: PropsWithChildren<{}>) => {
  return <div className="overflow-hidden rounded-xl">{children}</div>;
};

const NoSelectedCircle = () => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <rect
        x={1}
        y={1}
        width={18}
        height={18}
        rx={9}
        stroke="#5A6686"
        strokeWidth={2}
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const SelectedCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2212_1558)">
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="9"
        fill="white"
        stroke="#265FF6"
        stroke-width="10"
      />
    </g>
    <defs>
      <clipPath id="clip0_2212_1558">
        <rect width="20" height="20" rx="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RadioItem = (props: {
  title: React.ReactNode;
  description: React.ReactNode;
  isSelected: boolean;
  onSelect(): void;
}) => {
  return (
    <div
      className={`border-card-modal flex cursor-pointer flex-row items-center space-x-6 border bg-card p-4 text-sm font-medium first:rounded-t-xl last:rounded-b-xl ${
        props.isSelected && 'border-primary bg-primary/10'
      }`}
      onClick={props.onSelect}
      role="button"
    >
      <div>{props.isSelected ? <SelectedCircle /> : <NoSelectedCircle />}</div>

      <div className="space-y-2">
        <div>{props.title}</div>
        <div className="text-xs text-muted-foreground">{props.description}</div>
      </div>
    </div>
  );
};

RadioSelect.Item = RadioItem;

export default RadioSelect;
