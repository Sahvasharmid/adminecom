import React from 'react';

const NotFoundPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <p style={styles.text}>Page Not Found</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    heading: {
        fontSize: '5rem',
        margin: 0,
    },
    text: {
        fontSize: '1.5rem',
    },
};

export default NotFoundPage;
