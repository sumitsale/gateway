const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configuration for the microservice
const MICROSERVICE_URL = process.env.MICROSERVICE_URL || 'http://localhost:8080';

// Example GET endpoint
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${MICROSERVICE_URL}/api/data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling microservice:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Microservice Error',
      message: error.message
    });
  }
});

// Example POST endpoint
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${MICROSERVICE_URL}/api/data`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error calling microservice:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Microservice Error',
      message: error.message
    });
  }
});

module.exports = router;
