/**
 * Auto Link Generator
 * Makes it easier to create and share links to specific sections
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for Material for MkDocs to finish initializing
  setTimeout(function() {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    
    headings.forEach(function(heading) {
      if (heading.id) {
        // Create the copy link button
        const linkButton = document.createElement('button');
        linkButton.className = 'md-link-copy';
        linkButton.title = 'Copy link to this section';
        linkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        
        // Add click event to copy the link
        linkButton.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Create the full URL
          const url = window.location.origin + 
                      window.location.pathname + 
                      '#' + heading.id;
          
          // Copy to clipboard
          navigator.clipboard.writeText(url).then(function() {
            // Show success feedback
            linkButton.classList.add('md-link-copy--success');
            setTimeout(function() {
              linkButton.classList.remove('md-link-copy--success');
            }, 2000);
          });
        });
        
        // Add the button next to the heading
        heading.appendChild(linkButton);
      }
    });
  }, 500);
});