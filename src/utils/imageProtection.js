// Deters casual image saving (right-click "Save As", drag-to-desktop, iOS
// long-press "Save to Photos"). Not foolproof — a screenshot or dev tools
// can always get the file — this just removes the easy, obvious paths.

export const noDownloadProps = {
    onContextMenu: (e) => e.preventDefault(),
    onDragStart: (e) => e.preventDefault(),
    draggable: false,
};

export const noDownloadStyle = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
};
