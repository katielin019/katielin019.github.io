// https://web.dev/articles/drag-and-drop
document.addEventListener('DOMContentLoaded', (e) => {
    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';

        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            if (this.classList.contains('card-lrg') && dragSrcEl.classList.contains('card-med')) {
                this.classList.remove('card-lrg');
                this.classList.add('card-med');
                dragSrcEl.classList.remove('card-med');
                dragSrcEl.classList.add('card-lrg');
            } else if (this.classList.contains('card-med') && dragSrcEl.classList.contains('card-lrg')) {
                this.classList.remove('card-med');
                this.classList.add('card-lrg');
                dragSrcEl.classList.remove('card-lrg');
                dragSrcEl.classList.add('card-med');
            }
            this.style.opacity = '1';
            dragSrcEl.style.opacity = '1';
        }
        
        return false;
    }

    let items = document.querySelectorAll('div.card-lrg, div.card-med');
    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    });
});