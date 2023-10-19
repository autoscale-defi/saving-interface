import { cva } from 'class-variance-authority';

interface Props {
  variant?: 'blue' | 'orange' | 'green';
  className?: string;
}

// eslint-disable-next-line tailwindcss/no-contradicting-classname
const getBadgeClasses = cva(
  'inline-block flex h-[22px] items-center justify-center rounded-full px-3 text-[10px]',
  {
    variants: {
      variant: {
        blue: 'bg-[#26EAF6] text-[#283455]',
        green: 'bg-green-400 text-[#283455]',
        orange: 'bg-[#FF9900] text-[#283455]',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

export const Badge = (props: React.PropsWithChildren<Props>) => {
  const { variant, children } = props;

  return (
    <div
      className={`${getBadgeClasses({
        variant,
      })} ${props.className}`}
    >
      {children}
    </div>
  );
};
