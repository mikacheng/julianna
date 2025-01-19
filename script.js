// Function to toggle sub-navigation menus
function toggleSubnav(id) {
  // Hide all subnav menus
  const subnavs = document.querySelectorAll('.subnav');
  subnavs.forEach(subnav => {
    if (subnav.id !== id) {
      subnav.style.display = 'none';
    }
  });

  // Toggle the selected subnav
  const selectedSubnav = document.getElementById(id);
  if (selectedSubnav.style.display === 'block') {
    selectedSubnav.style.display = 'none'; // Hide if already visible
  } else {
    selectedSubnav.style.display = 'block'; // Show the selected subnav
  }
}