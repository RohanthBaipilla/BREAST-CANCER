import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Breast Cancer Classification!</h1>
     
      <p style={styles.paragraph}>
        Breast cancer is one of the most common cancers affecting women globally. Early detection and accurate diagnosis are crucial for effective treatment and improved survival rates. This project aims to assist healthcare professionals by using deep learning models to classify ultrasound images as either benign (not cancer) or malignant (cancer). Our goal is to leverage technology to support the fight against breast cancer and help save lives.
      </p>
      <p style={styles.paragraph}>
        This app uses state-of-the-art image classification techniques to analyze ultrasound images and provide a prediction with a confidence score. It's an easy-to-use interface designed for clinicians, researchers, and anyone looking to contribute to this important cause.
      </p>
      
      <div style={styles.imagesContainer}>
        <div style={styles.imageWrapper}>
          <img 
            src="/images/benign.jpg" 
            alt="Benign" 
            style={styles.image} 
          />
          <a href="/images/benign.jpg" download style={styles.downloadLink}>Download Benign Image</a>
        </div>
        
        <div style={styles.imageWrapper}>
          <img 
            src="/images/malignant.jpg" 
            alt="Malignant" 
            style={styles.image} 
          />
          <a href="/images/malignant.jpg" download style={styles.downloadLink}>Download Malignant Image</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    lineHeight: '1.6',
    color: '#333',
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: '2.5em',
    color: '#FF1493',
    textAlign: 'center',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  contact: {
    fontSize: '1em',
    textAlign: 'center',
    marginTop: '20px',
  },
  developerName: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: '1.5em',
    textDecoration: 'underline',
    fontStyle: 'italic',
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  imageWrapper: {
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  downloadLink: {
    display: 'block',
    marginTop: '10px',
    color: '#FF1493',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default About;
