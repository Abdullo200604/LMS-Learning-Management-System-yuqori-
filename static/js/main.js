document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const sidebar = document.querySelector(".sidebar")

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  if (typeof bootstrap !== "undefined") {
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  }

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  if (typeof bootstrap !== "undefined") {
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  }

  // Attendance form
  const attendanceForm = document.querySelector(".attendance-form")
  if (attendanceForm) {
    const dateInput = attendanceForm.querySelector("#date")
    dateInput.addEventListener("change", function () {
      const url = new URL(window.location.href)
      url.searchParams.set("date", this.value)
      window.location.href = url.toString()
    })
  }
})
