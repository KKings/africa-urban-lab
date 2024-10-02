'use client';

import type { URL } from 'node:url';
import React, { useEffect, useState } from 'react';

type Props = {
  url: string | URL;
  className?: string;
};

const SvgRenderer = ({ url, className }: Props) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    fetchSvg();
  }, [url]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgRenderer;
