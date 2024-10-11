import styles from './main-page.module.css';
import Header from '../../header/header';
import ToolBar from '../../tool-bar/tool-bar';
import Tools from '../../tools/tools';
import UploadContainer from '../../upload-container/upload-container';
import React from 'react';

const MainPage = () => {
  return (
    <div className={styles.mainContainer} data-testid="main-page">
      <Header />
      <div className={styles.toolContainer}>
        <ToolBar />
        <Tools />
        <UploadContainer />
      </div>
    </div>
  );
};

export default MainPage;
