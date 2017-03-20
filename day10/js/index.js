  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  let lastCheckedInput;

  function handleCheckbox (e) {      
      let inBetween = false;
      
      if (e.shiftKey && this.checked) {          
          checkboxes.forEach(checkbox => {              
              if (checkbox === this || checkbox === lastCheckedInput) {
                  inBetween = !inBetween;
              }
              if (inBetween) {                  
                  checkbox.checked = true;                  
              }
          });
      }
      lastCheckedInput = this;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleCheckbox);
  });
