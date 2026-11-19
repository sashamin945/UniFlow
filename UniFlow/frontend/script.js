document.addEventListener("DOMContentLoaded", function() {
  
  const radioSolo = document.getElementById('radio-solo');
  const radioTeam = document.getElementById('radio-team');
  const teamFields = document.getElementById('team-fields');
  const form = document.querySelector('.reg-form');

  if (form && radioSolo && radioTeam && teamFields) {
    const teamInputs = teamFields.querySelectorAll('input'); 

    function toggleTeamFields() {
      if (radioSolo.checked) {
        teamFields.style.display = 'none';
        teamInputs.forEach(input => input.removeAttribute('required'));
      } else {
        teamFields.style.display = 'block';
        teamInputs.forEach(input => input.setAttribute('required', 'true'));
      }
    }
    
    toggleTeamFields();
    radioSolo.addEventListener('change', toggleTeamFields);
    radioTeam.addEventListener('change', toggleTeamFields);

    const customAlert = document.getElementById('custom-alert');

    
    function validateField(input) {
      const errorSpan = input.parentElement.querySelector('.error-msg');
      
      if (input.value.trim() === '') {
        input.classList.add('input-error');
        if (errorSpan) {
          errorSpan.classList.add('show');
        }
        return false;
      } else {
        input.classList.remove('input-error');
        if (errorSpan) errorSpan.classList.remove('show');
        return true;
      }
    }

    const requiredInputs = form.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
           input.classList.remove('input-error');
           const errorSpan = input.parentElement.querySelector('.error-msg');
           if (errorSpan) errorSpan.classList.remove('show');
        }
      });
    });

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      let isFormValid = true;

      const inputsToValidate = form.querySelectorAll('input[required]');
      inputsToValidate.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        return; 
      }

      const formData = new FormData(form);
      
      const userData = {
        name: formData.get('username'),
        email: formData.get('useremail'),
        college: formData.get('college'),
        course: formData.get('course'),
        telegram: formData.get('telegram'),
        role: formData.get('role'),
        participation: formData.get('participation'),
        teamName: formData.get('participation') === 'team' ? formData.get('team_name') : 'Нет',
        eventName: "NEON HACK 2026",
        regDate: new Date().toLocaleDateString('ru-RU')
      };

      try {
        localStorage.setItem('uniFlowUser', JSON.stringify(userData));
      } catch(e) {
        console.log("Не удалось сохранить в localStorage");
      }

      customAlert.classList.add('show');
      form.reset(); 
      
      if (radioTeam.checked) toggleTeamFields(); 

      setTimeout(function() {
        customAlert.classList.remove('show');
      }, 3000);
    });
  }
  

  const searchInput = document.getElementById('searchInput');
  const dateFilter = document.getElementById('dateFilter');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  if (searchInput && dateFilter && filterBtns.length > 0) {
    let currentCategory = 'all';

    function filterCards() {
      const searchText = searchInput.value.toLowerCase().trim();
      const selectedDate = dateFilter.value;

      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const category = card.getAttribute('data-category');
        const date = card.getAttribute('data-date');

        const matchesSearch = text.includes(searchText);
        const matchesDate = selectedDate === 'all' || date === selectedDate;
        const matchesCategory = currentCategory === 'all' || category === currentCategory;

        if (matchesSearch && matchesDate && matchesCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    searchInput.addEventListener('input', filterCards);
    dateFilter.addEventListener('change', filterCards);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter');
        filterCards();
      });
    });
  }

});

const NavMenu = document.getElementById('Naavmenu');
const navMenu = document.getElementById('navMenu');

if (NavMenu && navMenu) {
  NavMenu.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    NavMenu.classList.toggle('active');
  });
}
