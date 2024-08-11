import React, { useEffect, useRef, useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

const ImageSlider = ({
    images,
    width = '700px',
    height = '700px',
}: {
    images: [string, string];
    width?: string;
    height?: string;
}) => {
    const containerSize = {
        width,
        height,
    };
    const [sliderOnMove, setSliderOnMove] = useState(false);

    const [sliderPos, setSliderPos] = useState<string>('25%');

    const imageRef = useRef<HTMLImageElement>(null);

    const onSliderMoveStart = () => setSliderOnMove(true);
    const onSliderMoveFinished = () => setSliderOnMove(false);

    const onSliderMove = (e: MouseEvent) => {
        if (!sliderOnMove) return;

        const xCord = getXCords(e);
        if (xCord) setSliderPos(xCord);
    };

    const getXCords = (e: MouseEvent): string | null => {
        e = e || (window.event as MouseEvent);
        if (!imageRef.current) return null;
        const imageBR = imageRef.current.getBoundingClientRect();
        let xCord = e.pageX - imageBR.left;
        xCord = xCord < 0 ? 0 : xCord;
        xCord = xCord > imageBR.width ? imageBR.width : xCord;
        return `${xCord}px`;
    };

    useEffect(() => {
        window.addEventListener('mouseup', onSliderMoveFinished);
        window.addEventListener('mousemove', onSliderMove);

        return () => {
            window.removeEventListener('mouseup', onSliderMoveFinished);
            window.removeEventListener('mousemove', onSliderMove);
        };
    }, [sliderOnMove]);

    return (
        <div className="container" style={containerSize}>
            <div>
                <img
                    draggable={false}
                    src={images[0]}
                    style={containerSize}
                    ref={imageRef}
                />
            </div>
            <div className="overlay" style={{ width: sliderPos }}>
                <img draggable={false} src={images[1]} style={containerSize} />
            </div>
            <div
                className="slider"
                onMouseDown={onSliderMoveStart}
                style={{ left: sliderPos }}
            ></div>
        </div>
    );
};

const images: [string, string] = [
    'https://images.unsplash.com/photo-1491227289289-742c2e7289a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1494122440615-9e21a6890164?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://pngpix.com/images/high/vegeta-moustache-png-mph59-1xzujtc608t8zcpi.webp',
    // 'https://pngpix.com/images/high/super-saiyan-vegeta-portrait-qinimiavgiub1ob3.webp',
];

const App = () => <ImageSlider images={images} />;
bootstrapReactApp(<App />);
