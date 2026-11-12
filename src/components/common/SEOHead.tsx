import React, { useEffect } from 'react';
import { ScreenType } from '../../types';
import { applyClientHeadSEO } from '../../services/seoService';

interface SEOHeadProps {
  currentScreen: ScreenType;
  isKidsMode?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentScreen, isKidsMode }) => {
  useEffect(() => {
    const slug = isKidsMode ? 'kids' : currentScreen;
    applyClientHeadSEO(slug);
  }, [currentScreen, isKidsMode]);

  return null; // Side-effect only component (manages document.head)
};
