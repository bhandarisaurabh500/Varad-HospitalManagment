const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ycfawzfgngechhvzvwwp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmF3emZnbmdlY2hodnp2d3dwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI4MzU2MywiZXhwIjoyMTAyODU5NTYzfQ.kST-sk8QHCpMAboup5dVeIZri2YHfz1Dsoe1H_miGd4';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDoctor() {
  const email = 'doctor@varadnetralaya.com';
  const password = 'Borude@2026';

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Dr. R.K. Borude', role: 'ADMIN' }
  });

  if (error) {
    if (error.message.includes('already registered')) {
        console.log('User already exists. Update password just in case.');
        const { data: users, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;
        const user = users.users.find(u => u.email === email);
        if (user) {
           await supabase.auth.admin.updateUserById(user.id, { password });
           console.log('Password updated successfully');
        }
    } else {
        console.error('Error:', error.message);
    }
  } else {
    console.log('User created successfully:', data.user.id);
  }
}

createDoctor();
