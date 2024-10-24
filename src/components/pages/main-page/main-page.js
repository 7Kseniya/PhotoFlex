import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import ImageRotate from '../../editor-actions/image-rotate';
import React, { useState } from 'react';

const MainPage = () => {
  const [imageSrc] = useState('/placeholder.jpeg');
  const [rotation, setRotation] = useState(0);
  const [activeTool, setActiveTool] = useState(-1);

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar
          onRotate={handleRotate}
          setActiveTool={setActiveTool}
        />
        <Tools activeTool={activeTool} />
        <div className={styles.imageContainer}>
          <ImageRotate imageSrc={imageSrc} rotation={rotation} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
