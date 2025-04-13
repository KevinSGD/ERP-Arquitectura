
document.addEventListener('DOMContentLoaded', function() {
    
    const menuButtons = document.querySelectorAll('.menu-button');
    
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            menuButtons.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
           
            console.log(`Selected menu: ${this.textContent}`);
        });
    });
    
    
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        
        console.log('Back button clicked');
        
    });
    
        const profileButton = document.querySelector('.profile-button');
    profileButton.addEventListener('click', function() {
        
        console.log('Profile button clicked');
       
    });
});