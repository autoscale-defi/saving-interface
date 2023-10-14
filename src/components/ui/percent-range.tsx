import { useTheme } from 'next-themes';
import React from 'react';
import { getTrackBackground, Range } from 'react-range';
import { IRenderMarkParams, IRenderTrackParams } from 'react-range/lib/types';

const PERCENTS_BREAKPOINT = [0, 25, 50, 75, 100];

type Props = {
  percent: number;
  onChange(percent: number): void;
};

export const PercentRange = (props: Props) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const markBackgroundColor = isDark ? '#5A6686' : '#959FBB';
  const markBorderColor = isDark ? '#082137' : 'rgba(238, 242, 245, 0.6)';
  const noSelectedTrackBackground = isDark ? '#5A6686' : '#959FBB';

  const renderMark = React.useCallback(
    ({ props: markProps, index: markerIndex }: IRenderMarkParams) => {
      if (!PERCENTS_BREAKPOINT.includes(markerIndex)) return null;
      const isSelected = markerIndex <= props.percent;
      return (
        <div
          {...markProps}
          className="z-10 flex h-4 w-4 justify-center rounded-full border-2"
          style={{
            ...markProps.style,
            backgroundColor: isSelected ? '#548BF4' : markBackgroundColor,
            borderColor: markBorderColor,
          }}
        >
          <p
            className={`mt-4 text-xs ${
              isSelected
                ? 'font-bold text-primary'
                : 'font-medium text-muted-foreground'
            }`}
          >
            {markerIndex}%
          </p>
        </div>
      );
    },
    [props.percent, markBackgroundColor, markBorderColor]
  );

  const renderTrack = React.useCallback(
    ({ props: traktProps, children }: IRenderTrackParams) => (
      <div
        onMouseDown={traktProps.onMouseDown}
        onTouchStart={traktProps.onTouchStart}
        style={{
          ...traktProps.style,
          height: '40px',
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          ref={traktProps.ref}
          style={{
            height: '5px',
            width: '100%',
            background: getTrackBackground({
              values: [props.percent],
              colors: ['#265FF6', noSelectedTrackBackground],
              min: 0,
              max: 100,
            }),
            alignSelf: 'center',
          }}
        >
          {children}
        </div>
      </div>
    ),
    [props.percent, noSelectedTrackBackground]
  );

  return (
    <Range
      step={1}
      min={0}
      max={100}
      values={[props.percent]}
      onChange={(values) => props.onChange(values[0])}
      renderMark={renderMark}
      renderTrack={renderTrack}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{ height: '5px' }}
          className="w-1 rounded-r-lg bg-primary"
        />
      )}
    />
  );
};
