/*On Page Refresh*/
updateAge();
/*On Page Refresh*/

function downloadCV() {
    var link = document.createElement('a');
    link.href = '../assets/files/Louis Thompson-Resume-October-2023.pdf'; 
    link.download = 'Louis Thompson Resume October 2023.pdf';  
  
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
}

function calculateAge(birthDate) {
    const birthDateObj = new Date(birthDate); 
    const today = new Date();

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}

function updateAge() {
    const birthDate = "1999-09-01";
    const age = calculateAge(birthDate);
    document.getElementById("age").textContent = age;
}




