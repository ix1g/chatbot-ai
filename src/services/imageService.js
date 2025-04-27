const { createWorker } = require('tesseract.js');
const vision = require('@google-cloud/vision');
const NodeCache = require('node-cache');
const sharp = require('sharp');
const axios = require('axios');
const { GOOGLE_CLOUD_VISION_KEYFILE } = require('../config/config');

// Initialize caches with 30 minutes TTL
const userImageCache = new NodeCache({ stdTTL: 1800 });
const userMemoryCache = new NodeCache({ stdTTL: 1800 });

// Initialize Google Cloud Vision client
const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: GOOGLE_CLOUD_VISION_KEYFILE
});

// Initialize Tesseract worker
let worker = null;
async function initializeTesseract() {
    if (!worker) {
        worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
    }
    return worker;
}

async function downloadImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}

async function optimizeImage(buffer) {
    return await sharp(buffer)
        .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
        .normalize()
        .sharpen()
        .toBuffer();
}

async function extractTextFromImage(imageBuffer) {
    try {
        const worker = await initializeTesseract();
        const { data: { text } } = await worker.recognize(imageBuffer);
        return text.trim();
    } catch (error) {
        console.error('Tesseract error:', error);
        return '';
    }
}

async function analyzeImageContent(imageBuffer) {
    try {
        const [labelDetection, objectDetection, safeSearch, faceDetection] = 
            await Promise.all([
                visionClient.labelDetection(imageBuffer),
                visionClient.objectLocalization(imageBuffer),
                visionClient.safeSearchDetection(imageBuffer),
                visionClient.faceDetection(imageBuffer)
            ]);

        return {
            labels: labelDetection[0].labelAnnotations.map(label => ({
                description: label.description,
                confidence: label.score
            })),
            objects: objectDetection[0].localizedObjectAnnotations.map(obj => ({
                name: obj.name,
                confidence: obj.score
            })),
            safeSearch: safeSearch[0].safeSearchAnnotation,
            faces: faceDetection[0].faceAnnotations.map(face => ({
                joy: face.joyLikelihood,
                sorrow: face.sorrowLikelihood,
                anger: face.angerLikelihood,
                confidence: face.detectionConfidence
            }))
        };
    } catch (error) {
        console.error('Vision API error:', error);
        return {
            labels: [],
            objects: [],
            safeSearch: null,
            faces: []
        };
    }
}

async function processImage(imageUrl, userId, messageContent = '') {
    try {
        const cacheKey = `${userId}-${imageUrl}`;
        const cachedResult = userImageCache.get(cacheKey);
        if (cachedResult) {
            console.log('Retrieved from cache for user:', userId);
            return cachedResult;
        }

        const imageBuffer = await downloadImage(imageUrl);
        const processedImage = await optimizeImage(imageBuffer);

        const [textResult, visionResult] = await Promise.all([
            extractTextFromImage(processedImage),
            analyzeImageContent(processedImage)
        ]);

        const result = {
            text: textResult,
            ...visionResult
        };

        updateUserMemory(userId, result, messageContent);
        userImageCache.set(cacheKey, result);

        return result;
    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Failed to process image');
    }
}

function updateUserMemory(userId, result, messageContent) {
    const userMemory = userMemoryCache.get(userId) || {
        recentImages: [],
        context: []
    };

    userMemory.recentImages.unshift({
        timestamp: Date.now(),
        result,
        messageContent
    });

    userMemory.recentImages = userMemory.recentImages.slice(0, 5);

    const newContext = {
        timestamp: Date.now(),
        objects: result.objects.map(obj => obj.name),
        labels: result.labels.map(label => label.description),
        text: result.text
    };
    
    userMemory.context.unshift(newContext);
    userMemory.context = userMemory.context.slice(0, 10);

    userMemoryCache.set(userId, userMemory);
}

function getUserContext(userId) {
    return userMemoryCache.get(userId) || {
        recentImages: [],
        context: []
    };
}

function clearUserMemory(userId) {
    userMemoryCache.del(userId);
    userImageCache.del(new RegExp(`^${userId}-`));
}

module.exports = {
    processImage,
    getUserContext,
    clearUserMemory
};