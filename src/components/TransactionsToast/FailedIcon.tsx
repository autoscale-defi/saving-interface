import { ExclamationIcon } from '@heroicons/react/outline';

export const FailedIcon = () => {
  return (
    <div className="rotate-45 rounded-lg bg-[#F44336] p-1 drop-shadow-[0px_0px_24px_rgba(244,67,54,0.4)]">
      <ExclamationIcon className="h-[10px] w-[10px] -rotate-45 text-white" />
    </div>
  );
};
