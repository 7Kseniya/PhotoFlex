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

const ToolBar = ({ setActiveTool }) => {
  const [activeIcon, setActiveIcon] = useState(-1);

  const icons = [
    { component: TuneIcon, className: styles.tune },
    { component: CropIcon, className: styles.crop },
    {
      component: Rotate90DegreesCcwIcon,
      className: styles.rotate,
    },
    {
      component: SettingsOverscanIcon,
      className: styles.settings,
    },
    { component: PhotoFilterIcon, className: styles.photoFilter },
    { component: TextureIcon, className: styles.texture },
    { component: WallpaperIcon, className: styles.wallpaper },
    { component: TitleIcon, className: styles.title },
  ];

  return (
    <div className={styles.mainContainer}>
      {icons.map(
        ({ component: IconComponent, action, className }, index) => (
          <IconComponent
            data-testid={`icon-${index}`}
            key={index}
            className={`${styles.icon} ${
              activeIcon === index
                ? styles.clicked
                : styles.notClicked
            } ${className}`}
            onClick={() => {
              setActiveIcon(index);
              setActiveTool(index);
              if (action) action();
            }}
          />
        )
      )}
    </div>
  );
};

export default ToolBar;
