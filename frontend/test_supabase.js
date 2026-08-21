import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ycfawzfgngechhvzvwwp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmF3emZnbmdlY2hodnp2d3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyODM1NjMsImV4cCI6MjEwMjg1OTU2M30.ABsSdBxHevyS-g2Q4XIWPWDd-OJKUpuWIGpzial3PZI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Fetching appointments...');
  
  // Test 1: all appts
  const { data: allAppts, error: err1 } = await supabase.from('appointments').select('*');
  if (err1) {
    console.error('Error fetching allAppts:', err1);
  } else {
    console.log('allAppts count:', allAppts.length);
  }
  
  // Test 2: recent appts with join
  const { data: recent, error: err2 } = await supabase
    .from('appointments')
    .select(`
      id, appointment_no, appointment_date, appointment_time, status, symptoms,
      patients ( 
        id, 
        users ( full_name, phone ) 
      )
    `)
    .limit(5);
    
  if (err2) {
    console.error('Error fetching nested recent:', err2.message);
  } else {
    console.log('nested recent count:', recent.length);
  }
}
test();
