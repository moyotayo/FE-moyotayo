import type { ReactNode } from 'react';

import { BgCircles } from './BgCircles';
import { Mascot, type MascotPose, type MascotPosition } from './Mascot';
import { Stage } from './Stage';
import { TopNav } from './TopNav';

type Props = {
  children: ReactNode;
  showTopNav?: boolean;
  showMascot?: boolean;
  mascotPose?: MascotPose;
  mascotPosition?: MascotPosition;
  mascotSize?: number;
  mascotSpeech?: string | null;
  bgTopLeft?: boolean;
  bgBottomRight?: boolean;
};

export function ScreenWrap({
  children,
  showTopNav = true,
  showMascot = false,
  mascotPose = 'standing',
  mascotPosition = 'bottomRight',
  mascotSize = 280,
  mascotSpeech,
  bgTopLeft = true,
  bgBottomRight = true,
}: Props) {
  return (
    <Stage>
      <BgCircles topLeft={bgTopLeft} bottomRight={bgBottomRight} />
      {showTopNav ? <TopNav /> : null}
      {children}
      {showMascot ? (
        <Mascot
          pose={mascotPose}
          position={mascotPosition}
          size={mascotSize}
          speech={mascotSpeech}
        />
      ) : null}
    </Stage>
  );
}
