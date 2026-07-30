document.addEventListener('DOMContentLoaded', () => {
  
  // MOBILE NAVIGATION MENU TOGGLER
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // ECOSYSTEM INTERACTIVE TAB SYSTEM
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // remove active states
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // add active state to clicked button and matched tab panel
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const matchedPane = document.getElementById(`tab-${tabId}`);
      if (matchedPane) {
        matchedPane.classList.add('active');
      }
    });
  });

  // FAQ ACCORDIONS
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      
      if (parent.classList.contains('active')) {
        content.style.maxHeight = null;
        parent.classList.remove('active');
      } else {
        // Close other active panels first for accordion effect
        document.querySelectorAll('.faq-item.active').forEach(item => {
          item.classList.remove('active');
          item.querySelector('.faq-content').style.maxHeight = null;
        });
        
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // INTERACTIVE TREASURY CALCULATOR REAL-TIME LOGIC
  const depositSlider = document.getElementById('depositSlider');
  const subAccountSlider = document.getElementById('subAccountSlider');
  const depositValueText = document.getElementById('depositValue');
  const subAccountValueText = document.getElementById('subAccountValue');
  
  const enableLedgerLink = document.getElementById('enableLedgerLink');
  const enableTreasurySweep = document.getElementById('enableTreasurySweep');
  
  const calculatedYield = document.getElementById('calculatedYield');
  const calculatedHours = document.getElementById('calculatedHours');

  function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US');
  }

  function runCalculator() {
    if (!depositSlider || !subAccountSlider) return;
    
    const deposits = parseFloat(depositSlider.value);
    const subAccounts = parseInt(subAccountSlider.value);
    
    // Update display labels
    depositValueText.innerText = formatCurrency(deposits);
    subAccountValueText.innerText = `${subAccounts} Account${subAccounts > 1 ? 's' : ''}`;
    
    // Calculate estimated treasury yield (e.g. up to 5.42% APY)
    let rate = 0.015; // base 1.5%
    if (enableTreasurySweep && enableTreasurySweep.checked) {
      rate = 0.0542; // Premium yield
    } else if (deposits > 2000000) {
      rate = 0.035; // tier upgrade
    }
    
    const estYield = Math.round(deposits * rate);
    calculatedYield.innerText = formatCurrency(estYield);
    
    // Calculate hours saved
    let baseHours = subAccounts * 1; // 1 hour per sub account standard
    if (enableLedgerLink && enableLedgerLink.checked) {
      baseHours = Math.round(subAccounts * 2.5); // extra efficiency boost shown
    }
    calculatedHours.innerText = `${baseHours} Hour${baseHours !== 1 ? 's' : ''}`;
  }

  if (depositSlider && subAccountSlider) {
    depositSlider.addEventListener('input', runCalculator);
    subAccountSlider.addEventListener('input', runCalculator);
    if (enableLedgerLink) enableLedgerLink.addEventListener('change', runCalculator);
    if (enableTreasurySweep) enableTreasurySweep.addEventListener('change', runCalculator);
    
    // Initial run
    runCalculator();
  }

  // DIRECT ADVISORY CONTACT FORM VALIDATION
  const relationshipForm = document.getElementById('relationshipForm');
  const formSuccess = document.getElementById('formSuccess');

  if (relationshipForm) {
    relationshipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredInputs = relationshipForm.querySelectorAll('input[required], select[required]');
      
      requiredInputs.forEach(input => {
        const formGroup = input.parentElement;
        if (!input.value.trim()) {
          formGroup.classList.add('has-error');
          isValid = false;
        } else {
          formGroup.classList.remove('has-error');
        }
      });

      // Simple Email verification pattern check
      const emailInput = document.getElementById('email');
      if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          emailInput.parentElement.classList.add('has-error');
          isValid = false;
        }
      }

      if (isValid) {
        relationshipForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      }
    });

    // Clear validation states on input typing
    relationshipForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }

  // MODAL LOGIC: SECURE SIGN-IN PANEL & MOCK ONLINE BANKING
  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.getElementById('openLoginBtn');
  const tabDemoPortalBtn = document.getElementById('tabDemoPortalBtn');
  const previewDemoBtn = document.getElementById('previewDemoBtn');
  const closeLoginBtn = document.getElementById('closeLoginBtn');
  const signinForm = document.getElementById('signinForm');
  const loginFormView = document.getElementById('loginFormView');
  const dashboardView = document.getElementById('dashboardView');
  const logoutBtn = document.getElementById('logoutBtn');

  function openLogin() {
    if (loginModal) {
      loginModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLogin() {
    if (loginModal) {
      loginModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (openLoginBtn) openLoginBtn.addEventListener('click', openLogin);
  if (tabDemoPortalBtn) tabDemoPortalBtn.addEventListener('click', openLogin);
  if (previewDemoBtn) previewDemoBtn.addEventListener('click', openLogin);
  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLogin);

  // Check simulated credentials
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userIdInput = document.getElementById('userId');
      const passwordInput = document.getElementById('password');
      
      let isValid = true;
      
      if (!userIdInput.value.trim()) {
        userIdInput.parentElement.classList.add('has-error');
        isValid = false;
      }
      if (!passwordInput.value.trim()) {
        passwordInput.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (isValid) {
        // Authenticated Simulation state transition
        loginFormView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        
        // Append a timestamp audit event to the dynamic console log
        appendAuditLog('Secure authentication pipeline established successfully. Sandbox state loaded.');
      }
    });

    // Input dynamic cleanup
    signinForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }

  // Secure Session Logouts
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Reset visual form fields and view states inside modal
      if (signinForm) signinForm.reset();
      loginFormView.classList.remove('hidden');
      dashboardView.classList.add('hidden');
      closeLogin();
    });
  }

  // MOCK ONLINE PORTAL INTERACTION: BALANCES & LEDGER TRANSACTIONS SIMULATOR
  let primaryBalanceVal = 1452380.00;
  let secondaryBalanceVal = 2500000.00;
  const primaryBalanceElement = document.getElementById('primaryBalance');
  const secondaryBalanceElement = document.getElementById('secondaryBalance');
  const simSourceAccount = document.getElementById('simSourceAccount');
  const simAmount = document.getElementById('simAmount');
  const transferSimulatorForm = document.getElementById('transferSimulatorForm');
  const auditLogsContainer = document.getElementById('auditLogs');

  function appendAuditLog(text) {
    if (!auditLogsContainer) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    const newEntry = document.createElement('div');
    newEntry.className = 'audit-entry';
    newEntry.innerHTML = `<span class="entry-time">[${timestamp}]</span> <span class="entry-text">${text}</span>`;
    
    auditLogsContainer.insertBefore(newEntry, auditLogsContainer.firstChild);
  }

  if (transferSimulatorForm) {
    transferSimulatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const amt = parseFloat(simAmount.value);
      const source = simSourceAccount.value;
      
      if (isNaN(amt) || amt <= 0) {
        alert('Please specify a valid numeric transfer value.');
        return;
      }

      if (source === 'primary') {
        if (amt > primaryBalanceVal) {
          alert('Error code VB-109: Insufficient liquid ledger assets in current source selection.');
          appendAuditLog(`[LEDGER REJECTION] Blocked transfer request of ${formatCurrency(amt)} due to insufficient checking liquidity.`);
          return;
        }
        primaryBalanceVal -= amt;
        secondaryBalanceVal += amt;
        appendAuditLog(`Executed routing flow of ${formatCurrency(amt)} from Checking to CPA Escrow trust Sweep. Status: Success.`);
      } else {
        if (amt > secondaryBalanceVal) {
          alert('Error code VB-109: Insufficient liquid ledger assets in current sweep collection.');
          appendAuditLog(`[LEDGER REJECTION] Blocked sweep recall request of ${formatCurrency(amt)} due to insufficient sweep balance.`);
          return;
        }
        secondaryBalanceVal -= amt;
        primaryBalanceVal += amt;
        appendAuditLog(`Recall flow executed: moved ${formatCurrency(amt)} from CPA Escrow Trust Sweep to main Operating Checking.`);
      }

      // Render update values
      if (primaryBalanceElement) primaryBalanceElement.innerText = formatCurrency(primaryBalanceVal);
      if (secondaryBalanceElement) secondaryBalanceElement.innerText = formatCurrency(secondaryBalanceVal);
      
      // reset input
      simAmount.value = '';
    });
  }

  // MODAL LOGIC: CONSULTATION DIALOG
  const consultationModal = document.getElementById('consultationModal');
  const openConsultationBtn = document.getElementById('openConsultationBtn');
  const heroConsultationBtn = document.getElementById('heroConsultationBtn');
  const closeConsultationBtn = document.getElementById('closeConsultationBtn');
  const consultationModalForm = document.getElementById('consultationModalForm');
  const modalConsultationSuccess = document.getElementById('modalConsultationSuccess');

  function openConsultation() {
    if (consultationModal) {
      consultationModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeConsultation() {
    if (consultationModal) {
      consultationModal.classList.remove('show');
      document.body.style.overflow = '';
      // Reset form states when closed
      if (consultationModalForm) {
        consultationModalForm.reset();
        consultationModalForm.classList.remove('hidden');
      }
      if (modalConsultationSuccess) {
        modalConsultationSuccess.classList.add('hidden');
      }
    }
  }

  if (openConsultationBtn) openConsultationBtn.addEventListener('click', openConsultation);
  if (heroConsultationBtn) heroConsultationBtn.addEventListener('click', openConsultation);
  if (closeConsultationBtn) closeConsultationBtn.addEventListener('click', closeConsultation);

  // Attach global click support triggers to service content tabs
  document.querySelectorAll('.open-consultation-trigger').forEach(trigger => {
    trigger.addEventListener('click', openConsultation);
  });

  if (consultationModalForm) {
    consultationModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredModalInputs = consultationModalForm.querySelectorAll('input[required]');
      
      requiredModalInputs.forEach(input => {
        const formGroup = input.parentElement;
        if (!input.value.trim()) {
          formGroup.classList.add('has-error');
          isValid = false;
        } else {
          formGroup.classList.remove('has-error');
        }
      });

      if (isValid) {
        consultationModalForm.classList.add('hidden');
        modalConsultationSuccess.classList.remove('hidden');
      }
    });
    
    consultationModalForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }

  // Esc closes open modals naturally for modern accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLogin();
      closeConsultation();
    }
  });
});
