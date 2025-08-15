// Script pentru generarea rapidă de sunete de test
// Rulează cu: node generate-test-audio.js

const fs = require('fs');
const path = require('path');

// Generează un buffer pentru un bip simplu (440Hz pentru 0.2 secunde)
function generateBeepBuffer(frequency = 440, duration = 0.2, sampleRate = 44100) {
    const samples = duration * sampleRate;
    const buffer = Buffer.alloc(samples * 2); // 16-bit audio
    
    for (let i = 0; i < samples; i++) {
        const value = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3; // Volum redus
        const sample = Math.floor(value * 32767); // Convert la 16-bit
        
        // Little-endian format
        buffer.writeInt16LE(sample, i * 2);
    }
    
    return buffer;
}

// Generează header WAV
function generateWavHeader(dataSize, sampleRate = 44100) {
    const header = Buffer.alloc(44);
    
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + dataSize, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16); // PCM header size
    header.writeUInt16LE(1, 20);  // PCM format
    header.writeUInt16LE(1, 22);  // Mono
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * 2, 28); // Byte rate
    header.writeUInt16LE(2, 32);  // Block align
    header.writeUInt16LE(16, 34); // Bits per sample
    header.write('data', 36);
    header.writeUInt32LE(dataSize, 40);
    
    return header;
}

// Crează directoarele necesare
const audioDir = path.join(__dirname, 'assets', 'audio', 'effects');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Generează sunetele de test
const sounds = [
    { name: 'button_click.wav', freq: 800, duration: 0.1 },
    { name: 'success.wav', freq: 600, duration: 0.5 },
    { name: 'error.wav', freq: 200, duration: 0.3 },
    { name: 'reward.wav', freq: 1000, duration: 0.8 }
];

sounds.forEach(sound => {
    const audioBuffer = generateBeepBuffer(sound.freq, sound.duration);
    const header = generateWavHeader(audioBuffer.length);
    const fullFile = Buffer.concat([header, audioBuffer]);
    
    const filePath = path.join(audioDir, sound.name);
    fs.writeFileSync(filePath, fullFile);
    console.log(`Generated: ${sound.name}`);
});

console.log('Test audio files generated successfully!');
