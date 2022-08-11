if (!document.querySelector(".hksl-sign-button.active")) {
  Swal.fire({
    icon: "error",
    text: "XXX",
    showConfirmButton: false,
    timer: 1000,
  });
  return;
}
