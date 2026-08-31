const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Replace all variations with "Dr. Raosaheb K. BORUDE"
    content = content.replace(/Dr\.\s*Raosaheb\s*Kundlik\s*Borude/gi, 'Dr. Raosaheb K. BORUDE');
    content = content.replace(/Dr\.\s*Ravsaheb\s*Borude/gi, 'Dr. Raosaheb K. BORUDE');
    content = content.replace(/Dr\.\s*Raosaheb\s*Borude/gi, 'Dr. Raosaheb K. BORUDE');
    content = content.replace(/Dr\s*Raosaheb\s*Borude/gi, 'Dr. Raosaheb K. BORUDE');
    
    // Specifically for Footer copyright text if the year is mentioned
    // It's probably matched by the above anyway, but just in case:
    // © {currentYear} Dr. Raosaheb Kundlik Borude -> © {currentYear} Dr. Raosaheb K. BORUDE
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log('Modified:', file);
    }
});

console.log(`Replaced names in ${changedCount} files.`);
