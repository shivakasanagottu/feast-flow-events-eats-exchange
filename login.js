/**
 * FeastFlow: EventEats Exchange - Authentication Engine (login.js)
 * Manages Sign-In, Sign-Up, Role Switching, Quick Demos, Password Strength & Local Session
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");

  const rolePills = document.querySelectorAll(".role-pill");
  const authAlert = document.getElementById("authAlert");

  // Inputs
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const rememberMeCheckbox = document.getElementById("rememberMeCheckbox");
  const toggleLoginPasswordBtn = document.getElementById("toggleLoginPasswordBtn");
  const toggleLoginPasswordIcon = document.getElementById("toggleLoginPasswordIcon");

  const regFullName = document.getElementById("regFullName");
  const regOrgName = document.getElementById("regOrgName");
  const regEmail = document.getElementById("regEmail");
  const regPhone = document.getElementById("regPhone");
  const regPassword = document.getElementById("regPassword");
  const regConfirmPassword = document.getElementById("regConfirmPassword");
  const regTermsCheckbox = document.getElementById("regTermsCheckbox");
  const toggleRegPasswordBtn = document.getElementById("toggleRegPasswordBtn");
  const toggleRegPasswordIcon = document.getElementById("toggleRegPasswordIcon");

  const strengthFill = document.getElementById("strengthFill");
  const strengthStatusText = document.getElementById("strengthStatusText");
  const passwordMatchBadge = document.getElementById("passwordMatchBadge");

  // Demo Buttons
  const demoStudentBtn = document.getElementById("demoStudentBtn");
  const demoCatererBtn = document.getElementById("demoCatererBtn");
  const demoDeanBtn = document.getElementById("demoDeanBtn");

  // SSO Buttons
  const googleSsoBtn = document.getElementById("googleSsoBtn");
  const microsoftSsoBtn = document.getElementById("microsoftSsoBtn");

  // Forgot Password Modal
  const openForgotModalBtn = document.getElementById("openForgotModalBtn");
  const closeForgotModalBtn = document.getElementById("closeForgotModalBtn");
  const cancelForgotBtn = document.getElementById("cancelForgotBtn");
  const forgotModalOverlay = document.getElementById("forgotModalOverlay");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const forgotEmail = document.getElementById("forgotEmail");
  const forgotModalAlert = document.getElementById("forgotModalAlert");

  // State
  let activeRole = "organizer";
  let activeRoleName = "Student / Event Lead";

  // Pre-configured Demo Accounts
  const DEMO_ACCOUNTS = {
    organizer: {
      email: "priya.festhead@campus.edu",
      password: "FestOrganizer2026!",
      name: "Priya Sharma",
      org: "IIT Delhi Cultural Council",
      role: "Student Lead",
      roleKey: "organizer",
      avatar: "fa-graduation-cap"
    },
    caterer: {
      email: "contact@royalfeast.com",
      password: "RoyalMasterChef#1",
      name: "Chef Rajesh (Royal Feast)",
      org: "Royal Feast Caterers Pvt Ltd",
      role: "Caterer Partner",
      roleKey: "caterer",
      avatar: "fa-utensils"
    },
    admin: {
      email: "dean.finance@campus.edu",
      password: "DeanSanction2026$",
      name: "Dr. S. K. Raman",
      org: "Deanery of Student Affairs & Finance",
      role: "Dean / Approver",
      roleKey: "admin",
      avatar: "fa-building-columns"
    }
  };

  // ==========================================
  // 1. TAB SWITCHING (Sign In vs Create Account)
  // ==========================================
  tabSignIn.addEventListener("click", () => {
    switchAuthTab("signin");
  });

  tabSignUp.addEventListener("click", () => {
    switchAuthTab("signup");
  });

  function switchAuthTab(mode) {
    clearAlert();
    if (mode === "signin") {
      tabSignIn.classList.add("active");
      tabSignUp.classList.remove("active");
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
    } else {
      tabSignUp.classList.add("active");
      tabSignIn.classList.remove("active");
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
    }
  }

  // ==========================================
  // 2. ROLE SELECTION
  // ==========================================
  rolePills.forEach(pill => {
    pill.addEventListener("click", () => {
      rolePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeRole = pill.getAttribute("data-role");
      activeRoleName = pill.getAttribute("data-name");

      // Update placeholders
      if (activeRole === "organizer") {
        loginEmail.placeholder = "e.g. priya.festhead@campus.edu";
        regOrgName.placeholder = "e.g. IIT Cultural Council";
      } else if (activeRole === "caterer") {
        loginEmail.placeholder = "e.g. orders@royalfeast.com";
        regOrgName.placeholder = "e.g. Royal Feast Caterers";
      } else {
        loginEmail.placeholder = "e.g. dean.finance@campus.edu";
        regOrgName.placeholder = "e.g. University Finance Committee";
      }
    });
  });

  // ==========================================
  // 3. ONE-CLICK DEMO FILLERS
  // ==========================================
  demoStudentBtn.addEventListener("click", () => {
    applyDemoAccount("organizer");
  });

  demoCatererBtn.addEventListener("click", () => {
    applyDemoAccount("caterer");
  });

  demoDeanBtn.addEventListener("click", () => {
    applyDemoAccount("admin");
  });

  function applyDemoAccount(roleKey) {
    switchAuthTab("signin");

    // Select role pill
    rolePills.forEach(p => {
      if (p.getAttribute("data-role") === roleKey) {
        p.click();
      }
    });

    const account = DEMO_ACCOUNTS[roleKey];
    loginEmail.value = account.email;
    loginPassword.value = account.password;

    showAlert(`Loaded credentials for ${account.name} (${account.role})! Click "Sign In" below.`, "info");
    showToast(`Autofilled demo login for ${account.name}`);
  }

  // ==========================================
  // 4. PASSWORD VISIBILITY TOGGLE
  // ==========================================
  if (toggleLoginPasswordBtn) {
    toggleLoginPasswordBtn.addEventListener("click", () => {
      togglePasswordVisibility(loginPassword, toggleLoginPasswordIcon);
    });
  }

  if (toggleRegPasswordBtn) {
    toggleRegPasswordBtn.addEventListener("click", () => {
      togglePasswordVisibility(regPassword, toggleRegPasswordIcon);
    });
  }

  function togglePasswordVisibility(input, icon) {
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  }

  // ==========================================
  // 5. LIVE PASSWORD STRENGTH METER
  // ==========================================
  if (regPassword) {
    regPassword.addEventListener("input", () => {
      const val = regPassword.value;
      const score = calculatePasswordStrength(val);

      if (val.length === 0) {
        strengthFill.style.width = "0%";
        strengthFill.style.background = "transparent";
        strengthStatusText.textContent = "Password strength: Empty";
        strengthStatusText.style.color = "var(--text-muted)";
      } else if (score < 2) {
        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";
        strengthStatusText.textContent = "Strength: Weak (Too simple)";
        strengthStatusText.style.color = "#ef4444";
      } else if (score === 2) {
        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";
        strengthStatusText.textContent = "Strength: Fair (Add special chars/numbers)";
        strengthStatusText.style.color = "#f59e0b";
      } else if (score === 3) {
        strengthFill.style.width = "75%";
        strengthFill.style.background = "#3b82f6";
        strengthStatusText.textContent = "Strength: Strong (Good password)";
        strengthStatusText.style.color = "#3b82f6";
      } else {
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#10b981";
        strengthStatusText.textContent = "Strength: Excellent (Bank-grade)";
        strengthStatusText.style.color = "#10b981";
      }

      checkPasswordMatch();
    });
  }

  if (regConfirmPassword) {
    regConfirmPassword.addEventListener("input", checkPasswordMatch);
  }

  function calculatePasswordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  function checkPasswordMatch() {
    if (!passwordMatchBadge || !regPassword || !regConfirmPassword) return;
    const pwd = regPassword.value;
    const confirm = regConfirmPassword.value;

    if (confirm.length > 0 && pwd === confirm) {
      passwordMatchBadge.style.display = "flex";
      passwordMatchBadge.style.color = "#10b981";
    } else {
      passwordMatchBadge.style.display = "none";
    }
  }

  // ==========================================
  // 6. SIGN IN FORM SUBMIT
  // ==========================================
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAlert();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email) {
      showAlert("Please enter your official email or campus ID.", "error");
      loginEmail.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address.", "error");
      loginEmail.focus();
      return;
    }

    if (!password) {
      showAlert("Please enter your account password.", "error");
      loginPassword.focus();
      return;
    }

    // Determine user display name & role
    let matchedUser = DEMO_ACCOUNTS[activeRole];
    if (!matchedUser || matchedUser.email.toLowerCase() !== email.toLowerCase()) {
      // Custom user
      const namePart = email.split("@")[0].replace(/[._-]/g, " ");
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      matchedUser = {
        email: email,
        name: formattedName,
        org: activeRole === "organizer" ? "Student Committee" : activeRole === "caterer" ? "Partner Caterer" : "Campus Authority",
        role: activeRoleName,
        roleKey: activeRole,
        avatar: activeRole === "organizer" ? "fa-graduation-cap" : activeRole === "caterer" ? "fa-utensils" : "fa-building-columns"
      };
    }

    // Submit UI state
    const submitBtn = document.getElementById("signInSubmitBtn");
    setButtonLoading(submitBtn, true, "Verifying credentials...");

    setTimeout(() => {
      // Save session
      const userData = {
        email: matchedUser.email,
        name: matchedUser.name,
        org: matchedUser.org,
        role: matchedUser.role,
        roleKey: matchedUser.roleKey,
        avatar: matchedUser.avatar,
        loggedInAt: new Date().toISOString()
      };

      try {
        localStorage.setItem("feastflow_user", JSON.stringify(userData));
      } catch (err) {
        console.warn("localStorage unavailable", err);
      }

      setButtonLoading(submitBtn, false, "Sign In to FeastFlow");
      showAlert(`Welcome back, ${matchedUser.name}! Redirecting to Marketplace...`, "success");
      showToast(`Welcome back, ${matchedUser.name}!`);

      setTimeout(() => {
        window.location.href = "index.html?login=success";
      }, 700);
    }, 600);
  });

  // ==========================================
  // 7. SIGN UP FORM SUBMIT
  // ==========================================
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAlert();

    const fullName = regFullName.value.trim();
    const orgName = regOrgName.value.trim();
    const email = regEmail.value.trim();
    const phone = regPhone.value.trim();
    const password = regPassword.value;
    const confirmPassword = regConfirmPassword.value;
    const agreeTerms = regTermsCheckbox.checked;

    if (!fullName) {
      showAlert("Please enter your full name.", "error");
      regFullName.focus();
      return;
    }

    if (!email || !isValidEmail(email)) {
      showAlert("Please provide a valid official email address.", "error");
      regEmail.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      showAlert("Please enter a valid 10-digit mobile number for order and tasting coordination.", "error");
      regPhone.focus();
      return;
    }

    if (password.length < 6) {
      showAlert("Password must be at least 6 characters long.", "error");
      regPassword.focus();
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match. Please check your entries.", "error");
      regConfirmPassword.focus();
      return;
    }

    if (!agreeTerms) {
      showAlert("You must agree to FeastFlow's Terms of Service and Privacy Policy.", "error");
      return;
    }

    const submitBtn = document.getElementById("signUpSubmitBtn");
    setButtonLoading(submitBtn, true, "Creating your verified account...");

    setTimeout(() => {
      const newUser = {
        name: fullName,
        email: email,
        phone: phone,
        org: orgName || "Independent Host",
        role: activeRoleName,
        roleKey: activeRole,
        avatar: activeRole === "organizer" ? "fa-graduation-cap" : activeRole === "caterer" ? "fa-utensils" : "fa-building-columns",
        loggedInAt: new Date().toISOString()
      };

      try {
        localStorage.setItem("feastflow_user", JSON.stringify(newUser));
      } catch (err) {
        console.warn("localStorage error", err);
      }

      setButtonLoading(submitBtn, false, "Create Free FeastFlow Account");
      showAlert(`Account created successfully! Welcome to FeastFlow, ${fullName}.`, "success");
      showToast(`Account created for ${fullName}`);

      setTimeout(() => {
        window.location.href = "index.html?login=newuser";
      }, 700);
    }, 700);
  });

  // ==========================================
  // 8. SSO SIGN IN (Google & Microsoft 365)
  // ==========================================
  googleSsoBtn.addEventListener("click", () => {
    simulateSsoLogin("Google Account", "priya.google@gmail.com", "Priya Sharma (Google SSO)");
  });

  microsoftSsoBtn.addEventListener("click", () => {
    simulateSsoLogin("Campus 365 SSO", "student@univ.edu.in", "Campus Scholar (Microsoft 365)");
  });

  function simulateSsoLogin(provider, email, name) {
    showToast(`Connecting to ${provider}...`);
    setTimeout(() => {
      const ssoUser = {
        email: email,
        name: name,
        org: "Institutional Partner",
        role: activeRoleName,
        roleKey: activeRole,
        avatar: activeRole === "organizer" ? "fa-graduation-cap" : activeRole === "caterer" ? "fa-utensils" : "fa-building-columns",
        ssoProvider: provider,
        loggedInAt: new Date().toISOString()
      };
      try {
        localStorage.setItem("feastflow_user", JSON.stringify(ssoUser));
      } catch (e) {
        console.warn(e);
      }
      showToast(`Signed in via ${provider}! Redirecting...`);
      setTimeout(() => {
        window.location.href = "index.html?login=sso";
      }, 600);
    }, 500);
  }

  // ==========================================
  // 9. FORGOT PASSWORD MODAL
  // ==========================================
  if (openForgotModalBtn) {
    openForgotModalBtn.addEventListener("click", () => {
      forgotModalOverlay.style.display = "flex";
      forgotEmail.value = loginEmail.value || "";
      forgotEmail.focus();
    });
  }

  if (closeForgotModalBtn) {
    closeForgotModalBtn.addEventListener("click", () => {
      forgotModalOverlay.style.display = "none";
    });
  }

  if (cancelForgotBtn) {
    cancelForgotBtn.addEventListener("click", () => {
      forgotModalOverlay.style.display = "none";
    });
  }

  // Close on outside backdrop click
  forgotModalOverlay.addEventListener("click", (e) => {
    if (e.target === forgotModalOverlay) {
      forgotModalOverlay.style.display = "none";
    }
  });

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mail = forgotEmail.value.trim();
    if (!mail || !isValidEmail(mail)) {
      showModalAlert("Please enter a valid registered email address.", "error");
      return;
    }

    const sendBtn = document.getElementById("sendResetBtn");
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending link...`;

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<span>Sent!</span> <i class="fa-solid fa-check"></i>`;
      showModalAlert(`A secure password reset link has been dispatched to ${mail}. Check your inbox!`, "success");
      showToast(`Password reset link sent to ${mail}`);

      setTimeout(() => {
        forgotModalOverlay.style.display = "none";
        sendBtn.innerHTML = `<span>Send Recovery Link</span> <i class="fa-solid fa-paper-plane"></i>`;
        forgotModalAlert.style.display = "none";
      }, 2400);
    }, 700);
  });

  function showModalAlert(message, type) {
    forgotModalAlert.style.display = "block";
    forgotModalAlert.className = `auth-alert-message alert-${type}`;
    forgotModalAlert.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i> <span>${message}</span>`;
  }

  // ==========================================
  // 10. UTILITIES
  // ==========================================
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showAlert(msg, type = "error") {
    authAlert.style.display = "flex";
    authAlert.className = `auth-alert-message alert-${type}`;
    const icon = type === "success" ? "fa-circle-check" : type === "info" ? "fa-circle-info" : "fa-triangle-exclamation";
    authAlert.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  }

  function clearAlert() {
    authAlert.style.display = "none";
    authAlert.innerHTML = "";
  }

  function setButtonLoading(btn, isLoading, text) {
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${text}</span>`;
    } else {
      btn.disabled = false;
      btn.innerHTML = `<span class="btn-text">${text}</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
  }

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
});
