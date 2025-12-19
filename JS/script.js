// Navbar mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');

    menuBtn.addEventListener('click', () => {
      const isHidden = mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      menuIcon.textContent = isHidden ? '✕' : '☰';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIcon.textContent = '☰';
      });
    });

    // Programs filter
    const filterButtons = document.querySelectorAll('.program-filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('bg-slate-900', 'border-slate-600');
          b.classList.add('border-slate-700');
        });

        btn.classList.add('bg-slate-900', 'border-slate-600');

        programCards.forEach(card => {
          const level = card.getAttribute('data-level');
          if (filter === 'all' || level === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // FAQ accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const faqItem = toggle.parentElement;
        const content = faqItem.querySelector('.faq-content');
        const icon = toggle.querySelector('span:last-child');

        const isHidden = content.classList.contains('hidden');
        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-toggle span:last-child').forEach(i => i.textContent = '+');

        if (isHidden) {
          content.classList.remove('hidden');
          icon.textContent = '−';
        } else {
          content.classList.add('hidden');
          icon.textContent = '+';
        }
      });
    });

    // Mini inquiry form validation
    const miniForm = document.getElementById('miniInquiryForm');
    miniForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('miniName');
      const phone = document.getElementById('miniPhone');
      const program = document.getElementById('miniProgram');
      const nameError = document.getElementById('miniNameError');
      const phoneError = document.getElementById('miniPhoneError');
      const programError = document.getElementById('miniProgramError');

      let valid = true;

      if (!name.value.trim()) {
        nameError.classList.remove('hidden');
        valid = false;
      } else {
        nameError.classList.add('hidden');
      }

      if (!/^[0-9]{10}$/.test(phone.value.trim())) {
        phoneError.classList.remove('hidden');
        valid = false;
      } else {
        phoneError.classList.add('hidden');
      }

      if (!program.value) {
        programError.classList.remove('hidden');
        valid = false;
      } else {
        programError.classList.add('hidden');
      }

      if (valid) {
        showToast('Callback request submitted! Our team will contact you soon.');
        miniForm.reset();
      }
    });

    // Main form validation
    const admissionForm = document.getElementById('admissionForm');
    const formStatus = document.getElementById('formStatus');

    admissionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const program = document.getElementById('program');
      const terms = document.getElementById('terms');

      const errors = {
        name: '',
        email: '',
        phone: '',
        program: '',
        terms: ''
      };

      if (!name.value.trim()) {
        errors.name = 'Please enter your full name.';
      }
      if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
      if (!/^[0-9]{10}$/.test(phone.value.trim())) {
        errors.phone = 'Please enter a valid 10-digit mobile number.';
      }
      if (!program.value) {
        errors.program = 'Please select a program.';
      }
      if (!terms.checked) {
        errors.terms = 'Please agree to be contacted by the college.';
      }

      // Clear & show errors
      document.querySelectorAll('[data-error-for]').forEach(el => {
        const field = el.getAttribute('data-error-for');
        if (errors[field]) {
          el.textContent = errors[field];
          el.classList.remove('hidden');
        } else {
          el.textContent = '';
          el.classList.add('hidden');
        }
      });

      if (!errors.name && !errors.email && !errors.phone && !errors.program && !errors.terms) {
        // Here you would send data to backend using fetch(...)
        // For now we just show success
        formStatus.classList.remove('hidden');
        showToast('Admission inquiry submitted successfully!');
        admissionForm.reset();
        document.getElementById('messageCount').textContent = '0 / 300 characters';

        // Hide success after some time
        setTimeout(() => {
          formStatus.classList.add('hidden');
        }, 5000);
      }
    });

    // Message character count
    const message = document.getElementById('message');
    const messageCount = document.getElementById('messageCount');
    message.addEventListener('input', () => {
      const val = message.value.slice(0, 300);
      message.value = val;
      messageCount.textContent = val.length + ' / 300 characters';
    });

    // Toast function
    const toast = document.getElementById('toast');
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3500);
    }

    // Scroll to inquiry with pre-selected program
    function scrollToInquiry(programName) {
      const programSelect = document.getElementById('program');
      programSelect.value = programName;
      document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });
    }

    // Make function global
    window.scrollToInquiry = scrollToInquiry;

    // Set current year in footer
    document.getElementById('yearSpan').textContent = new Date().getFullYear();

    // Gallery data — matches the thumbnails above
    (function(){
      const images = [
        { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80', alt: 'Campus Building' },
        { src: 'https://images.unsplash.com/photo-1508873699372-7ae6d9a59b17?w=1600&q=80', alt: 'Library' },
        { src: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1600&q=80', alt: 'Laboratory' },
        { src: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1600&q=80', alt: 'Classroom' },
        { src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&q=80', alt: 'Cultural Event' },
        { src: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1600&q=80', alt: 'Sports Day' }
      ];

      let current = 0;
      const thumbWraps = document.querySelectorAll('.thumb-wrap');
      const thumbs = document.querySelectorAll('.thumb');
      const modal = document.getElementById('galleryModal');
      const modalImage = document.getElementById('modalImage');
      const modalAlt = document.getElementById('modalAlt');
      const modalIndex = document.getElementById('modalIndex');
      const openBtn = document.getElementById('openGalleryBtn');
      const closeBtn = document.getElementById('closeGallery');
      const prevBtn = document.getElementById('prevImg');
      const nextBtn = document.getElementById('nextImg');
      const modalThumbs = document.getElementById('modalThumbs');
      const downloadBtn = document.getElementById('downloadImg');
      const openOriginalBtn = document.getElementById('openOriginal');

      function showImage(idx){
        const img = images[idx];
        // soft fade
        modalImage.style.opacity = 0;
        setTimeout(() => {
          modalImage.src = img.src;
          modalAlt.textContent = img.alt;
          modalIndex.textContent = (idx + 1) + ' / ' + images.length;
          modalImage.style.opacity = 1;
          // update thumb strip selection
          modalThumbs.querySelectorAll('img').forEach((t,i) => t.setAttribute('aria-current', i === idx ? 'true' : 'false'));
          current = idx;
        }, 120);
      }

      function openGallery(idx = 0) {
        showImage(idx);
        modal.classList.remove('hidden');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        // focus first control for keyboard users
        setTimeout(() => prevBtn.focus(), 80);
      }
      function closeGallery(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

      function prevImage(){ showImage((current - 1 + images.length) % images.length); }
      function nextImage(){ showImage((current + 1) % images.length); }

      // wire thumbnails and wrappers (click or enter)
      thumbWraps.forEach(t => {
        t.addEventListener('click', (e) => openGallery(parseInt(t.dataset.index, 10)));
        t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openGallery(parseInt(t.dataset.index, 10)); });
      });

      // build modal thumbnail strip
      images.forEach((img, i) => {
        const el = document.createElement('img');
        el.src = img.src;
        el.alt = img.alt;
        el.className = 'modal-thumb';
        el.setAttribute('data-index', i);
        el.setAttribute('role','button');
        el.addEventListener('click', () => showImage(i));
        modalThumbs.appendChild(el);
      });

      openBtn.addEventListener('click', () => openGallery(0));
      closeBtn.addEventListener('click', closeGallery);
      prevBtn.addEventListener('click', prevImage);
      nextBtn.addEventListener('click', nextImage);

      downloadBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = images[current].src;
        a.download = `gallery-${current + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });

      openOriginalBtn.addEventListener('click', () => {
        window.open(images[current].src, '_blank', 'noopener');
      });

      // keyboard navigation when modal open
      document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGallery();
      });

      // click overlay to close
      modal.addEventListener('click', (e) => { if (e.target === modal) closeGallery(); });

      // expose for debugging
      window.openGallery = openGallery;
    })();
    
