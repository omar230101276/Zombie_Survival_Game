document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error");
  
    
    if (!email || !password) {
      errorMessage.textContent = "Please fill in all fields.";
      return;
    }
  
    if (password.length < 8) {
      errorMessage.textContent = "Password must be at least 8 characters long.";
      return;
    }
  });


  function openPage() {
    window.location.href = "index.html"; 
  }