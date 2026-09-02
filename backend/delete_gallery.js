require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function deleteDummyEntry() {
  console.log("Deleting dummy gallery entry...");
  const { data, error } = await supabase
    .from('gallery')
    .delete()
    .eq('title', 'jhcfvj');
    
  if (error) {
    console.error("Error deleting:", error);
  } else {
    console.log("Deleted successfully.");
  }
}

deleteDummyEntry();
