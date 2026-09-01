const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://ycfawzfgngechhvzvwwp.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmF3emZnbmdlY2hodnp2d3dwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI4MzU2MywiZXhwIjoyMTAyODU5NTYzfQ.kST-sk8QHCpMAboup5dVeIZri2YHfz1Dsoe1H_miGd4';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase credentials are missing. Cloud storage uploads will fail.');
}

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const BUCKET_NAME = 'varad-hospital-storage';

/**
 * Uploads a file buffer to Supabase Storage
 * @param {Buffer} fileBuffer - The file buffer from multer memory storage
 * @param {string} originalName - Original filename
 * @param {string} mimeType - File MIME type
 * @param {string} folder - Destination folder (e.g., 'medical-records', 'documents')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
async function uploadToSupabase(fileBuffer, originalName, mimeType, folder = '') {
  try {
    if (!supabase) throw new Error('Supabase client not initialized (missing credentials).');
    
    const ext = path.extname(originalName);
    const uniqueFilename = `${Date.now()}-${uuidv4().substring(0, 8)}${ext}`;
    const filePath = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Supabase upload error:', err);
    throw new Error('Failed to upload file to cloud storage.');
  }
}

/**
 * Deletes a file from Supabase Storage using its public URL
 * @param {string} fileUrl - The full public URL of the file
 */
async function deleteFromSupabase(fileUrl) {
  try {
    if (!fileUrl || !fileUrl.includes(BUCKET_NAME)) return;

    // Extract file path from URL
    // e.g. https://.../storage/v1/object/public/varad-hospital-storage/folder/file.jpg
    const baseUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`;
    if (!fileUrl.startsWith(baseUrl)) return;

    const filePath = fileUrl.replace(baseUrl, '');
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
  } catch (err) {
    console.error('Supabase delete error:', err);
  }
}

module.exports = {
  uploadToSupabase,
  deleteFromSupabase,
  supabase,
};
