declare module 'react-responsive-carousel' {
    import * as React from 'react';

    export interface CarouselProps {
        showArrows?: boolean;
        showStatus?: boolean;
        showIndicators?: boolean;
        infiniteLoop?: boolean;
        showThumbs?: boolean;
        useKeyboardArrows?: boolean;
        autoPlay?: boolean;
        stopOnHover?: boolean;
        swipeable?: boolean;
        dynamicHeight?: boolean;
        emulateTouch?: boolean;
        autoFocus?: boolean;
        thumbWidth?: number;
        selectedItem?: number;
        interval?: number;
        transitionTime?: number;
        swipeScrollTolerance?: number;
        ariaLabel?: string;
        onClickItem?: (index: number, item: React.ReactNode) => void;
        onClickThumb?: (index: number, item: React.ReactNode) => void;
        onChange?: (index: number, item: React.ReactNode) => void;
        renderArrowPrev?: (onClickHandler: () => void, hasPrev: boolean, label: string) => React.ReactNode;
        renderArrowNext?: (onClickHandler: () => void, hasNext: boolean, label: string) => React.ReactNode;
        renderIndicator?: (onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void, isSelected: boolean, index: number, label: string) => React.ReactNode;
        renderItem?: (item: React.ReactNode, options?: { isSelected: boolean; isPrevious: boolean }) => React.ReactNode;
        renderThumbs?: (children: React.ReactNode[]) => React.ReactNode[];
        children?: React.ReactNode; // Add this line
    }

    export class Carousel extends React.Component<CarouselProps> {}
}
