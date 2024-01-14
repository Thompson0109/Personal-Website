const { Console } = require('console');


function downloadCV() {
    var link = document.createElement('a');
    link.href = '../assets/files/Louis Thompson-Resume-October-2023.pdf'; 
    link.download = 'Louis Thompson Resume October 2023.pdf';  
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  }


