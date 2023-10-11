import BigNumber from 'bignumber.js';

export function toReadableNumber({
  amount,
  decimals,
}: {
  amount?: BigNumber | string | number | null;
  decimals?: number;
}) {
  if (!amount || !decimals) return new BigNumber(0);
  return new BigNumber(amount).multipliedBy(
    new BigNumber(10).exponentiatedBy(-decimals)
  );
}

export function toElrondNumber({
  amount,
  decimals,
}: {
  amount: BigNumber | string | number;
  decimals: number;
}) {
  const currentAmount = new BigNumber(amount);

  return new BigNumber(
    currentAmount.multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
  );
}

export function computeSumOfAmounts(amounts?: (string | number)[]) {
  if (!amounts || amounts.length === 0) return '0';

  return BigNumber.sum(
    ...amounts.map((amount) => new BigNumber(amount))
  ).toString();
}

export function getPercentOfAmount({
  amount,
  percent,
}: {
  amount: number;
  percent: number;
}) {
  return (amount * percent) / 100;
}

export function getPercentage({
  baseAmount,
  amount,
}: {
  baseAmount: number;
  amount?: number;
}) {
  if (!amount) return 0;
  if (baseAmount === 0) return 0;
  return (amount * 100) / baseAmount;
}

export const formatCompactUSDAmount = (amount: number) =>
  formatUSDAmount(amount, amount >= 1e6);

export function formatUSDAmount(amount: number = 0, compact = false) {
  const getMaximumFractionDigits = () => {
    if (compact) return 3;
    if (amount >= 1000) return 0;
    return 2;
  };

  return Intl.NumberFormat('en-us', {
    notation: compact ? 'compact' : 'standard',
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: getMaximumFractionDigits(),
    signDisplay: 'never',
  }).format(amount);
}

export const formatCompactNumber = (number: number = 0) =>
  formatNumber(number, number >= 1e6);

export function formatNumber(number: number = 0, compact = false) {
  const maxDecimals = Math.min(12, Math.abs(Math.floor(Math.log10(number))));

  const getMaximumFractionDigits = () => {
    if (compact) return 3;
    if (number >= 1000) return 0;
    return maxDecimals;
  };

  return Intl.NumberFormat('en-us', {
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: 0,
    maximumFractionDigits: getMaximumFractionDigits(),
    signDisplay: 'never',
  }).format(number);
}

export function formatPercent(percent: number = 0) {
  return percent.toLocaleString('en-us', {
    notation: percent > 99 ? 'compact' : 'standard',
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    signDisplay: 'never',
  });
}
