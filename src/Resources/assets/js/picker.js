/**
 * Filemanager picker widget – modale iframe et écoute postMessage.
 * À charger sur les pages qui contiennent des champs filemanager_picker.
 */
(function () {
    const MESSAGE_TYPE = 'keyboardman.filemanager.picked';

    function openModal(widget) {
        const url = widget.getAttribute('data-picker-url') || '/filemanager';
        const channel = widget.getAttribute('data-channel') || '';
        const base = url.indexOf('?') !== -1 ? url + '&' : url + '?';
        const iframeSrc = base + 'picker=1&channel=' + encodeURIComponent(channel);

        let overlay = document.getElementById('filemanager-picker-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'filemanager-picker-overlay';
            overlay.className = 'filemanager-picker-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            overlay.innerHTML =
                '<div class="filemanager-picker-dialog" role="dialog">' +
                '<button type="button" class="filemanager-picker-close" aria-label="Fermer">&times;</button>' +
                '<iframe title="Choisir un fichier" class="filemanager-picker-iframe"></iframe>' +
                '</div>';
            document.body.appendChild(overlay);

            overlay.querySelector('.filemanager-picker-close').addEventListener('click', closeModal);
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeModal();
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') closeModal();
            });
        }

        overlay.querySelector('.filemanager-picker-iframe').src = iframeSrc;
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        const overlay = document.getElementById('filemanager-picker-overlay');
        if (!overlay) return;
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        const iframe = overlay.querySelector('.filemanager-picker-iframe');
        if (iframe) iframe.src = 'about:blank';
    }

    function onMessage(event) {
        if (event.origin !== window.location.origin) return;
        const data = event.data;
        if (!data || data.type !== MESSAGE_TYPE || !data.channel) return;
        const widgets = document.querySelectorAll('.filemanager-picker-widget');
        for (let i = 0; i < widgets.length; i++) {
            if (widgets[i].getAttribute('data-channel') === data.channel) {
                const input = widgets[i].querySelector('input');
                if (input) {
                    input.value = data.path || '';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
                closeModal();
                break;
            }
        }
    }

    function init() {
        window.addEventListener('message', onMessage);
        document.querySelectorAll('.filemanager-picker-widget').forEach(function (widget) {
            const btn = widget.querySelector('.filemanager-picker-btn');
            if (btn) btn.addEventListener('click', function () { openModal(widget); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
