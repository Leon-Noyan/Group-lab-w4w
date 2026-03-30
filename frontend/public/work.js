document.addEventListener('DOMContentLoaded', () => {
    const applicationModal = document.getElementById('applicationModal');
    
    applicationModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const role = button.getAttribute('data-role');
        const modalTitle = applicationModal.querySelector('.modal-title');
        
        modalTitle.textContent = `Apply for: ${role}`;
        document.getElementById('applied-role').value = role;
    });

    const applyForm = document.getElementById('apply-form');
    
    applyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        alert('Tack för din ansökan! Vi har mottagit den och hör av oss snart.');
        applyForm.reset();
        
        const modalInstance = bootstrap.Modal.getInstance(applicationModal);
        modalInstance.hide();
    });
});