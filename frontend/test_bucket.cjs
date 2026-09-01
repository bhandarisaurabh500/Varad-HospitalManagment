const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://ycfawzfgngechhvzvwwp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmF3emZnbmdlY2hodnp2d3dwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI4MzU2MywiZXhwIjoyMTAyODU5NTYzfQ.kST-sk8QHCpMAboup5dVeIZri2YHfz1Dsoe1H_miGd4'; // Service Role key from create_user.cjs

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
  const { data, error } = await supabase.storage.getBucket('varad-hospital-storage');
  if (error) {
    console.error('Bucket not found or error:', error.message);
    
    // Try to create the bucket
    console.log('Attempting to create bucket...');
    const { data: createData, error: createError } = await supabase.storage.createBucket('varad-hospital-storage', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
      fileSizeLimit: 5242880
    });
    
    if (createError) {
      console.error('Failed to create bucket:', createError.message);
    } else {
      console.log('Bucket created successfully!');
    }
  } else {
    console.log('Bucket exists:', data.name);
  }
}

checkBucket();
