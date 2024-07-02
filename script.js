document.addEventListener('DOMContentLoaded', fetchCourses);

function fetchCourses() {
  const script = document.createElement('script');
  script.src = 'YOUR_GOOGLE_APP_SCRIPT_WEB_APP_URL?callback=displayCourses';
  document.body.appendChild(script);
}

function displayCourses(courses) {
  const courseContainer = document.getElementById('courses');
  courseContainer.innerHTML = '';
  courses.forEach(course => {
    const courseElement = document.createElement('div');
    courseElement.className = 'course';
    courseElement.innerHTML = `
      <img src="${course.link}" alt="Course Thumbnail">
      <h3>${course.name}</h3>
      <p>${course.hours} hours</p>
      <a href="${course.link}" target="_blank">Go to Course</a>
      <a href="#" onclick="showCertificate('${course.certificate}')">View Certificate</a>
    `;
    courseContainer.appendChild(courseElement);
  });
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
