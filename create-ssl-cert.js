/**
 * Script to generate SSL certificates for local development
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create certs directory if it doesn't exist
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

// Check if certificates already exist
const keyPath = path.join(certsDir, 'localhost.key');
const certPath = path.join(certsDir, 'localhost.crt');

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log('SSL certificates already exist in the certs directory.');
  process.exit(0);
}

// Generate certificates using OpenSSL
try {
  console.log('Generating SSL certificates for local development...');
  
  // Generate private key
  execSync(`openssl genrsa -out ${keyPath} 2048`);
  
  // Generate certificate signing request
  execSync(`openssl req -new -key ${keyPath} -out ${path.join(certsDir, 'localhost.csr')} -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`);
  
  // Generate self-signed certificate
  execSync(`openssl x509 -req -days 365 -in ${path.join(certsDir, 'localhost.csr')} -signkey ${keyPath} -out ${certPath}`);
  
  // Remove CSR file
  fs.unlinkSync(path.join(certsDir, 'localhost.csr'));
  
  console.log('SSL certificates generated successfully!');
  console.log(`Key: ${keyPath}`);
  console.log(`Certificate: ${certPath}`);
  console.log('\nNote: You may need to add this certificate to your trusted certificates.');
} catch (error) {
  console.error('Error generating SSL certificates:', error.message);
  process.exit(1);
}
