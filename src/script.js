document.addEventListener('mousemove', function(e) {
    const highlight = document.getElementById('cursor-highlight');
    // Update the position of the highlight element to follow the cursor
    highlight.style.left = e.pageX + 'px';
    highlight.style.top = e.pageY + 'px';
});

document.addEventListener('mousemove', function(e) {
    const highlight = document.getElementById('cursor-highlight');
    const contactSection = document.querySelector('.contact');

    // Update the position of the highlight element
    highlight.style.left = e.pageX + 'px';
    highlight.style.top = e.pageY + 'px';

    // Check if the cursor is over the contact section
    if (contactSection && contactSection.contains(e.target)) {
        highlight.classList.add('cursor-glow');
    } else {
        highlight.classList.remove('cursor-glow');
    }
});
document.addEventListener('mousemove', (e) => {
    let trail = document.createElement('div'); // Create a new trail element
    trail.classList.add('trail'); // Add the 'trail' class
    document.body.appendChild(trail); // Append the trail to the body

    // Position the trail at the cursor's position
    trail.style.left = `${e.pageX - 5}px`; // Offset by half the size of the trail to center it
    trail.style.top = `${e.pageY - 5}px`;

    // Gradually fade out the trail element
    let fadeEffect = setInterval(() => {
        if (!trail.style.opacity) {
            trail.style.opacity = 1;
        }
        if (trail.style.opacity > 0) {
            trail.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
            document.body.removeChild(trail); // Remove the trail from the document
        }
    }, 50); // Adjust time for faster or slower fade
});
