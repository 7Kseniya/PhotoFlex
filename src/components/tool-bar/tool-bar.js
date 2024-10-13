import React, { useState } from 'react';
import styles from './tool-bar.module.css';
import TuneIcon from '@mui/icons-material/Tune';
import CropIcon from '@mui/icons-material/Crop';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import SettingsOverscanIcon from '@mui/icons-material/SettingsOverscan';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import TextureIcon from '@mui/icons-material/Texture';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import TitleIcon from '@mui/icons-material/Title';

const ToolBar = ({ onRotate }) => {
  const [activeIcon, setActiveIcon] = useState(-1);

  const icons = [
    { component: TuneIcon },
    { component: CropIcon },
    { component: Rotate90DegreesCcwIcon, action: onRotate },
    { component: SettingsOverscanIcon },
    { component: PhotoFilterIcon },
    { component: TextureIcon },
    { component: WallpaperIcon },
    { component: TitleIcon },
  ];

  return (
    <div className={styles.mainContainer}>
      {icons.map(({ component: IconComponent, action }, index) => (
        <IconComponent
            data-testid={`icon-${index}`}
          key={index}
          className={`${styles.icon} ${
            activeIcon === index ? styles.clicked : styles.default
          }`}
          onClick={() => {
            setActiveIcon(index);
            if (action) action();
          }}
        />
      ))}
    </div>
  );
};

export default ToolBar;
