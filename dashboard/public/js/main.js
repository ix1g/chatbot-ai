document.addEventListener('DOMContentLoaded', function() {
    // Enable Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Auto-updating bot status
    function updateBotStatus() {
        fetch('/stats/status')
            .then(response => response.json())
            .then(data => {
                const statusBadge = document.querySelector('.bot-status');
                if (statusBadge) {
                    statusBadge.className = `badge bg-${data.status === 'Online' ? 'success' : 'danger'} bot-status`;
                    statusBadge.textContent = data.status;
                }
            })
            .catch(console.error);
    }

    // Update status every 30 seconds if status badge exists
    if (document.querySelector('.bot-status')) {
        setInterval(updateBotStatus, 30000);
    }
});