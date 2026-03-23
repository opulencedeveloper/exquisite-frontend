document
  .getElementById("form-signup")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin uk-margin-small-right"></i> Establishing Protocol...';
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';

    const referralIdInputValue = document.getElementById("referralId").value;

    const formData = {
      fullName: document.getElementById("fullName").value,
      userName: document.getElementById("userName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
    };

    if (referralIdInputValue?.length > 0) {
      formData.referralId = referralIdInputValue;
    }

    let response;
    try {
      response = await fetch(
        "https://api.exquisiteinvestmentlimited.com/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Show success toast
        Toastify({
          text: "Sign up successful!",
          duration: 3000,
          gravity: "top", // Position on top
          position: "center", // Center alignment
          backgroundColor: "#28a745",
        }).showToast(); 
        localStorage.setItem("userEmail", formData.email);
        setTimeout(() => {
          window.location.href = "/dashboard"; // "/sign-up/email-verification";
        }, 1500);
      } else {
        // Show error toast
        Toastify({
          text: `Error: ${result.description || "Sign up failed"}`,
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#dc3545",
        }).showToast();
      }
    } catch (error) {
      Toastify({
        text: error?.message || "Sign up failed",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();
    } finally {
      if (!response || !response.ok) {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
      }
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const refId = urlParams.get("ref") || "";
  document.getElementById("referralId").value = refId;
});
