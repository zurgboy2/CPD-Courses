document.addEventListener('DOMContentLoaded', fetchCourses);

function fetchCourses() {
  const script = document.createElement('script');
  const cacheBuster = new Date().getTime(); // Use timestamp to bust cache
  script.src = `https://script.google.com/macros/s/AKfycbzoZCalGB_Zvxe0eIoF-XTO-Oh2d1HiQ8dr0FYc4adF3_L_9MzFLH34czV0O_aHmtTW0Q/exec?callback=displayCourses&cacheBuster=${cacheBuster}`;
  document.body.appendChild(script);
}

function displayCourses(coursesByHost) {
  const courseContainer = document.getElementById('courses');
  courseContainer.innerHTML = '';
  for (const host in coursesByHost) {
    const hostElement = document.createElement('section');
    hostElement.innerHTML = `<h2>${host}</h2>`;
    coursesByHost[host].forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = 'course';
      courseElement.innerHTML = `
        <h3>${course.name}</h3>
        <p>${course.hours} hours</p>
        <a href="${course.link}" target="_blank">Go to Course</a>
        <a href="#" onclick="showCertificate('${course.certificate}')">View Certificate</a>
        <p>Date Added: ${course.date}</p>
      `;
      hostElement.appendChild(courseElement);
    });
    courseContainer.appendChild(hostElement);
  }
}

function showCertificate(url) {
  const modal = document.getElementById('modal');
  const iframe = document.getElementById('certificate');
  iframe.src = url;
  modal.style.display = "block";
}

document.querySelector('.close').onclick = function() {
  document.getElementById('modal').style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
