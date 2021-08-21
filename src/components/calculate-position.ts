const calculatePosition = (draggedEl: HTMLElement) => {
    
  const x = parseInt(draggedEl.style.left, 10);
  const y = parseInt(draggedEl.style.top, 10);
  let z = 1;

  const draggedRect = draggedEl.getBoundingClientRect();

  document.querySelectorAll('div.note-item')
    .forEach((n: any) => {
      if (n !== draggedEl) {
        const rect = n.getBoundingClientRect();
        if ((
              rect.left <= draggedRect.left && 
              rect.right >= draggedRect.left && 
              rect.top <= draggedRect.top && 
              rect.bottom >= draggedRect.top
            ) || (
              rect.left <= draggedRect.right && 
              rect.right >= draggedRect.right && 
              rect.top <= draggedRect.top && 
              rect.bottom >= draggedRect.top
            ) || (
              rect.left <= draggedRect.left && 
              rect.right >= draggedRect.left && 
              rect.top <= draggedRect.bottom && 
              rect.bottom >= draggedRect.bottom
            ) || (
              rect.left <= draggedRect.right && 
              rect.right >= draggedRect.right && 
              rect.top <= draggedRect.bottom && 
              rect.bottom >= draggedRect.bottom
            )
          ) {
          z = Math.max(+n.style.zIndex, z) + 1;
        }
      }
  });

  return {x, y, z};
}

export default calculatePosition;