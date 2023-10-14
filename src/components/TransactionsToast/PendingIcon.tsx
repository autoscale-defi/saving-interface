import { RefreshIcon } from '@heroicons/react/outline';

export const PendingIcon = () => {
  return (
    <div className="animate-spin rounded-full bg-[#FF6F02] p-1 drop-shadow-[0px_0px_24px_rgba(255,111,2,0.4)]">
      <RefreshIcon className="h-[10px] w-[10px] text-white" />
    </div>
  );
};
