const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  getPerson();
});

async function getPerson() {
  const url = "https://randomuser.me/api/";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if the response was successful
    if (response.ok) {
      const { first, last } = data.results[0].name;
      const { large } = data.results[0].picture;
      const { street } = data.results[0].location;
      const phone = data.results[0].phone;
      const email = data.results[0].email;

      showData(first, last, large, street, phone, email);
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

function showData(first, last, large, street, phone, email) {
  // Update DOM with new user data
  document.getElementById("name").textContent = `${first} ${last}`;
  document.getElementById("first").textContent = first;
  document.getElementById("last").textContent = last;
  document.getElementById("street").textContent = `${street.number} ${street.name}`;
  document.getElementById("phone").textContent = phone;
  document.getElementById("email").textContent = email;

  // Update photo with fade-in effect
  const photoElement = document.getElementById("photo");

  // Make sure the previous photo fades out before updating
  photoElement.style.opacity = "0";
  setTimeout(() => {
    photoElement.src = large;
    photoElement.style.transition = "opacity 1s ease-in-out";
    photoElement.style.opacity = "1";
  }, 300);
}
