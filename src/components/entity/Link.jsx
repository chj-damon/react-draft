import React from 'react';
import styles from './styles';

const Link = ({ contentState, entityKey, children }) => {
    const { url } = contentState.getEntity(entityKey).getData();
    return (
        <a href={url} style={styles.link}>{children}</a>
    );
};
export default Link;