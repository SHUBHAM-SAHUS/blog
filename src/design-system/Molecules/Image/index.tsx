'use client';
import NextImage from 'next/image';
import React from 'react';
import { ImageProps } from './interface';

const Image: React.FC<ImageProps> = ({
  width,
  height,
  className = '',
  alt = 'Image', // Default alt text
  src = '/placeholder.png', // Default image src
  isLoading = false,
  onClick,
  style,
  layout = 'responsive',
  objectFit = '',
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
  };

  return (
    <>
      {isLoading ? (
        <div style={containerStyle}>'Skeleton'</div>
      ) : (
        <div
          className={`relative flex justify-center ${className}`}
          style={containerStyle}
        >
          <NextImage
            alt={alt}
            className={className}
            src={src}
            style={style}
            layout={layout}
            objectFit={objectFit}
            {...(layout !== 'fill' && { width, height })}
            {...(objectFit !== 'cover' && { objectFit })}
            onClick={onClick}
          />
        </div>
      )}
    </>
  );
};

export default Image;
