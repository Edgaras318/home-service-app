// TabPanel.tsx
import React, { useState } from 'react';
import styles from './TabPanel.module.scss';

interface TabPanelProps {
    tabs: { title: string; content: React.ReactNode }[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.tabPanel}>
            <div className={styles.tabHeaders}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${index === activeTab ? styles.active : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>{tabs[activeTab].content}</div>
        </div>
    );
};

export default TabPanel;
