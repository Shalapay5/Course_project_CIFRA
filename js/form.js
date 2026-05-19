window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === '1') {
      alert('Спасибо! Ваш заказ успешно принят.');
      
     window.history.replaceState({}, '', window.location.pathname);
    }
  });