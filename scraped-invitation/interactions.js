(() => {
  const invitationUrl = 'https://sadarnimantran.in/invite/Tarique-inaya';
  const events = {
    'Manjha & Ubtan': ['20261105T063000Z', 'Kidwai Manzil, Golaganj, Lucknow', '12 pm'],
    Mehndi: ['20261106T133000Z', 'Kidwai Manzil, Golaganj, Lucknow', '7 pm'],
    Nikah: ['20261107T140000Z', 'Kothi Sitara Bagh, Kaiserbagh, Lucknow', '7:30 pm'],
    Walima: ['20261108T143000Z', 'Kothi Sitara Bagh, Kaiserbagh, Lucknow', '8 pm'],
  };

  function initialize() {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    Object.assign(toast.style, {
      background: '#0b2d26',
      border: '1px solid #c9aa6a',
      borderRadius: '999px',
      bottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
      color: '#fffdf5',
      left: '50%',
      maxWidth: 'calc(100vw - 2rem)',
      padding: '.7rem 1rem',
      position: 'fixed',
      textAlign: 'center',
      transform: 'translate(-50%, .5rem)',
      transition: 'opacity .2s ease, transform .2s ease',
      opacity: '0',
      pointerEvents: 'none',
      zIndex: '100',
    });
    document.body.append(toast);

    let toastTimer;
    function announce(message) {
      toast.textContent = message;
      toast.style.opacity = '1';
      toast.style.transform = 'translate(-50%, 0)';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, .5rem)';
      }, 2800);
    }

    function openSection(id) {
      const section = document.getElementById(id);
      if (!section) return;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function activateInvitationScene() {
      document.querySelector('#top .nr')?.parentElement.setAttribute('data-active', 'true');
    }

    function launchFlowerBurst() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof Path2D === 'undefined') return;

      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      Object.assign(canvas.style, {
        height: '100%',
        inset: '0',
        pointerEvents: 'none',
        position: 'fixed',
        width: '100%',
        zIndex: '60',
      });
      document.body.append(canvas);

      const context = canvas.getContext('2d');
      if (!context) {
        canvas.remove();
        return;
      }

      const paths = [
        (() => {
          const path = new Path2D();
          path.moveTo(0, 1);
          path.bezierCurveTo(0.5, 0.62, 0.66, -0.4, 0.46, -0.94);
          path.lineTo(0.22, -0.74);
          path.lineTo(0, -1);
          path.lineTo(-0.22, -0.74);
          path.lineTo(-0.46, -0.94);
          path.bezierCurveTo(-0.66, -0.4, -0.5, 0.62, 0, 1);
          path.closePath();
          return path;
        })(),
        (() => {
          const path = new Path2D();
          path.moveTo(0, 1);
          path.bezierCurveTo(0.9, 0.7, 1.08, -0.3, 0.56, -0.86);
          path.bezierCurveTo(0.36, -1.04, 0.12, -0.96, 0, -0.7);
          path.bezierCurveTo(-0.12, -0.96, -0.36, -1.04, -0.56, -0.86);
          path.bezierCurveTo(-1.08, -0.3, -0.9, 0.7, 0, 1);
          path.closePath();
          return path;
        })(),
      ];
      const colors = ['#a8445a', '#d28b9c', '#c19a4b', '#e5c16b', '#f6eedb'];
      const randomBetween = (min, max) => min + Math.random() * (max - min);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.min(1.4, Math.max(0.85, Math.sqrt(width * height) / 600));
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particles = Array.from({ length: 53 }, () => {
        const angle = randomBetween(-1.15, 1.15);
        const speed = height * randomBetween(0.3, 0.78);
        const isMarigold = Math.random() < 0.6;
        return {
          color: colors[Math.floor(Math.random() * colors.length)],
          fadeOut: 0.6,
          gravity: height * 0.4,
          life: -randomBetween(0, 0.25),
          maxLife: 10,
          rotation: randomBetween(0, Math.PI * 2),
          rotationSpeed: randomBetween(0.5, 2.2) * (Math.random() < 0.5 ? -1 : 1),
          shape: isMarigold ? 0 : 1,
          size: randomBetween(isMarigold ? 6 : 5.5, isMarigold ? 9.5 : 8.5) * scale,
          swayAmplitude: randomBetween(18, 52),
          swayFrequency: randomBetween(1.1, 2.4),
          phase: randomBetween(0, Math.PI * 2),
          x: width * 0.5 + randomBetween(-14, 14),
          y: height * 0.2 + randomBetween(-8, 8),
          vx: Math.sin(angle) * speed * Math.min(1, width / height * 1.15),
          vy: -Math.cos(angle) * speed,
          flip: randomBetween(1.4, 3.8),
          flipSpeed: randomBetween(1.4, 3.8),
        };
      });
      let previousTime = performance.now();

      function draw(time) {
        const elapsed = Math.min(0.05, Math.max(0, (time - previousTime) / 1000));
        previousTime = time;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        let active = false;

        particles.forEach((particle) => {
          particle.life += elapsed;
          if (particle.life < 0) {
            active = true;
            return;
          }
          if (
            particle.life >= particle.maxLife ||
            particle.y > height + 40 ||
            particle.y < -height * 0.6 ||
            particle.x < -60 ||
            particle.x > width + 60
          ) return;

          active = true;
          const drag = Math.max(0, 1 - 1.5 * elapsed);
          particle.vx *= drag;
          particle.vy = (particle.vy + particle.gravity * elapsed) * drag;
          particle.x += (particle.vx + particle.swayAmplitude * Math.sin(particle.phase + particle.life * particle.swayFrequency)) * elapsed;
          particle.y += particle.vy * elapsed;
          particle.rotation += particle.rotationSpeed * elapsed;
          particle.flip += particle.flipSpeed * elapsed;

          const fade = Math.min(1, particle.life / 0.12, (particle.maxLife - particle.life) / particle.fadeOut);
          const flip = Math.cos(particle.flip);
          const safeFlip = Math.abs(flip) < 0.22 ? Math.sign(flip || 1) * 0.22 : flip;
          const cosine = Math.cos(particle.rotation);
          const sine = Math.sin(particle.rotation);
          context.globalAlpha = Math.max(0, fade);
          context.fillStyle = particle.color;
          context.setTransform(
            cosine * particle.size * pixelRatio * safeFlip,
            sine * particle.size * pixelRatio * safeFlip,
            -sine * particle.size * pixelRatio,
            cosine * particle.size * pixelRatio,
            particle.x * pixelRatio,
            particle.y * pixelRatio,
          );
          context.fill(paths[particle.shape]);
        });

        context.globalAlpha = 1;
        if (active) {
          requestAnimationFrame(draw);
        } else {
          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          context.clearRect(0, 0, width, height);
          canvas.remove();
        }
      }

      requestAnimationFrame(draw);
    }

    function closeCover() {
      const cover = document.querySelector('[data-invite-cover]') ??
        document.querySelector('[role="dialog"][aria-label="Open the invitation"]');
      if (!cover) return;
      cover.style.transition = 'opacity .45s ease, transform .45s ease';
      cover.style.opacity = '0';
      cover.style.transform = 'translateY(-1rem)';
      cover.setAttribute('aria-hidden', 'true');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overscroll-behavior');
      document.body.style.removeProperty('overflow');
      setTimeout(() => {
        cover.remove();
        activateInvitationScene();
      }, 480);
    }

    let coverOpening = false;
    function rollUpChilman() {
      if (coverOpening || !document.querySelector('[data-invite-cover]')) return;
      coverOpening = true;
      const blind = document.querySelector('.ch-blind');
      const tassel = document.querySelector('.ch-tassel');
      if (!blind) {
        closeCover();
        return;
      }
      if (tassel) {
        tassel.style.animation = 'ch-tug .34s cubic-bezier(.3,0,.3,1) both';
      }
      setTimeout(() => {
        blind.style.transition = 'transform .85s cubic-bezier(.22,1,.36,1)';
        blind.style.transform = 'translateY(-105%)';
        setTimeout(launchFlowerBurst, 300);
        setTimeout(closeCover, 740);
      }, 140);
    }

    document.querySelector('[data-opener-trigger]')?.addEventListener('click', rollUpChilman);
    const openerLabel = [...document.querySelectorAll('[data-invite-cover] p')]
      .find((paragraph) => /roll up the chilman/i.test(paragraph.textContent));
    if (openerLabel) {
      openerLabel.style.cursor = 'pointer';
      openerLabel.style.pointerEvents = 'auto';
      openerLabel.addEventListener('click', rollUpChilman);
    }
    document.querySelector('[data-opener-skip]')?.addEventListener('click', closeCover);
    [...document.querySelectorAll('button')]
      .filter((button) => button.textContent.trim() === 'हिंदी')
      .forEach((button) => {
        button.addEventListener('click', () => {
          announce('Hindi text is not included in this offline copy.');
        });
      });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeCover();
    });

    const dock = document.createElement('nav');
    dock.setAttribute('aria-label', 'Invitation shortcuts');
    Object.assign(dock.style, {
      alignItems: 'center',
      background: '#fffdf5',
      border: '1px solid #c9aa6a',
      borderRadius: '1.25rem',
      bottom: 'calc(.75rem + env(safe-area-inset-bottom))',
      boxShadow: '0 8px 28px #0b2d2633',
      display: 'flex',
      gap: '.35rem',
      justifyContent: 'space-around',
      left: '50%',
      maxWidth: '28rem',
      padding: '.4rem',
      position: 'fixed',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)',
      zIndex: '40',
    });

    function dockButton(label, action, ariaLabel = label) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.setAttribute('aria-label', ariaLabel);
      Object.assign(button.style, {
        background: 'transparent',
        border: '0',
        borderRadius: '.8rem',
        color: '#173c32',
        cursor: 'pointer',
        flex: '1',
        font: '600 .9rem/1.2 system-ui, sans-serif',
        minHeight: '2.8rem',
        padding: '.4rem',
      });
      button.addEventListener('click', action);
      return button;
    }

    dock.append(
      dockButton('Reply', () => openSection('rsvp')),
      dockButton('Dates', () => openSection('events')),
      dockButton('Map', () => openSection('venue')),
      dockButton('Music', () => announce('This sample invitation has no music track.')),
    );

    document.body.append(dock);

    document.querySelector('a[aria-label*="See all samples"]')?.closest('aside')?.remove();
    document.querySelector('#closing a[href*="/start?design="]')?.parentElement.remove();
    const closing = document.querySelector('#closing');
    const attribution = closing?.querySelector('a[aria-label^="Invitation by"]');
    if (closing && attribution) {
      closing.style.paddingBottom = 'calc(8rem + env(safe-area-inset-bottom))';
    }

    const mapLinks = document.querySelectorAll('a[href^="/"]');
    mapLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.href = new URL(href, 'https://sadarnimantran.in').href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('button[aria-label^="Add to calendar:"]').forEach((button) => {
      button.addEventListener('click', () => {
        const title = button.getAttribute('aria-label').replace('Add to calendar: ', '');
        const event = events[title];
        if (!event) {
          announce(`Calendar details for ${title} are unavailable.`);
          return;
        }
        const [start, location, time] = event;
        const startDate = new Date(`${start.slice(0, 4)}-${start.slice(4, 6)}-${start.slice(6, 8)}T${start.slice(9, 11)}:${start.slice(11, 13)}:00Z`);
        const end = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
          .toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const escapeIcs = (value) => value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
        const contents = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Wedding Invitation//Tarique and Inaya//EN',
          'CALSCALE:GREGORIAN',
          'BEGIN:VEVENT',
          `UID:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-2026@Tarique-inaya`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
          `DTSTART:${start}`,
          `DTEND:${end}`,
          `SUMMARY:${escapeIcs(`${title} - Tarique and Inaya`)}`,
          `DESCRIPTION:${escapeIcs(`${time}. Tarique weds Inaya.`)}`,
          `LOCATION:${escapeIcs(location)}`,
          'END:VEVENT',
          'END:VCALENDAR',
        ].join('\r\n');
        const file = URL.createObjectURL(new Blob([contents], { type: 'text/calendar;charset=utf-8' }));
        const download = document.createElement('a');
        download.href = file;
        download.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-Tarique-inaya.ics`;
        download.click();
        setTimeout(() => URL.revokeObjectURL(file), 60000);
        announce(`${title} added to your calendar download.`);
      });
    });

    const reply = document.querySelector('#rsvp a[data-rsvp="send"]');
    const replyForm = reply?.closest('form');
    const name = replyForm?.querySelector('input[type="text"]');
    const note = replyForm?.querySelector('textarea');
    if (reply && replyForm && name) {
      const updateReply = () => {
        const guestName = name.value.trim();
        const attending = replyForm.querySelector('[data-rsvp="yes"]:checked');
        const notAttending = replyForm.querySelector('[data-rsvp="no"]:checked');
        const message = [
          'Namaste! Reply for Tarique weds Inaya.',
          `Name: ${guestName}`,
          attending ? "Attendance: Yes, we'll be there." : notAttending ? "Attendance: Sorry, can't make it." : '',
          note?.value.trim() ? `Note: ${note.value.trim()}` : '',
        ].filter(Boolean).join('\n');
        const whatsappUrl = new URL('https://wa.me/919411955202');
        whatsappUrl.searchParams.set('text', message);
        reply.href = whatsappUrl.href;
      };
      [name, note, ...replyForm.querySelectorAll('input[type="radio"]')]
        .filter(Boolean)
        .forEach((field) => {
          field.addEventListener('input', updateReply);
          field.addEventListener('change', updateReply);
        });
      const validateReply = (event) => {
        if (!name.value.trim()) {
          event.preventDefault();
          name.focus();
          name.setAttribute('aria-invalid', 'true');
          announce('Enter your name before sending your reply.');
          return false;
        }
        name.removeAttribute('aria-invalid');
        updateReply();
        return true;
      };
      reply.addEventListener('click', validateReply);
      replyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateReply(event)) {
          window.open(reply.href, '_blank', 'noopener,noreferrer');
        }
      });
      updateReply();
    }

    const share = [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Share');
    if (share) {
      share.addEventListener('click', async () => {
        const data = { title: 'Tarique weds Inaya', text: 'You are warmly invited to Tarique and Inaya’s Nikah.', url: invitationUrl };
        if (navigator.share) {
          try {
            await navigator.share(data);
          } catch (error) {
            if (error.name !== 'AbortError') announce('Sharing is unavailable in this browser.');
          }
          return;
        }
        try {
          await navigator.clipboard.writeText(invitationUrl);
          announce('Invitation link copied.');
        } catch {
          announce(`Share this invitation: ${invitationUrl}`);
        }
      });
    }

    const tryNames = [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Try with your names');
    if (tryNames) {
      tryNames.addEventListener('click', () => {
        window.open('https://sadarnimantran.in/start?design=Tarique-inaya', '_blank', 'noopener,noreferrer');
      });
    }

    const familyButton = document.querySelector('#family button[aria-expanded]');
    const familyLists = document.getElementById('family-lists');
    if (familyButton && familyLists) {
      familyButton.addEventListener('click', () => {
        const expanded = familyButton.getAttribute('aria-expanded') === 'true';
        familyButton.setAttribute('aria-expanded', String(!expanded));
        familyLists.hidden = expanded;
        familyLists.style.display = expanded ? 'none' : '';
      });
    }

    const countdown = document.getElementById('countdown');
    if (countdown) {
      countdown.querySelectorAll(':scope > p').forEach((paragraph) => {
        if (paragraph.textContent.includes('days') && paragraph.textContent.includes('seconds')) {
          paragraph.remove();
        }
      });
      const units = ['days', 'hours', 'minutes', 'seconds'];
      const cards = units.map((unit) => {
        const label = [...countdown.querySelectorAll('span.t-label')]
          .find((element) => element.textContent.trim() === unit);
        if (!label) return null;
        const card = label.parentElement;
        return {
          value: card.querySelector('.sr-only'),
          display: card.querySelector('[aria-hidden="true"].i-display'),
        };
      });
      const updateCountdown = () => {
        const remaining = new Date('2026-11-07T19:30:00+05:30').getTime() - Date.now();
        const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
        const values = [
          Math.floor(totalSeconds / 86400),
          Math.floor((totalSeconds % 86400) / 3600),
          Math.floor((totalSeconds % 3600) / 60),
          totalSeconds % 60,
        ];
        values.forEach((value, index) => {
          const card = cards[index];
          if (!card?.value || !card.display) return;
          const digits = String(value).padStart(2, '0');
          card.value.textContent = String(value);
          const cells = [...card.display.children];
          if (cells.length !== digits.length) {
            card.display.replaceChildren(...[...digits].map(() => {
              const cell = document.createElement('span');
              cell.className = 'relative inline-block w-[1ch] text-center';
              return cell;
            }));
          }
          [...card.display.children].forEach((cell, digitIndex) => {
            const digit = document.createElement('span');
            digit.className = 'block';
            digit.textContent = digits[digitIndex];
            cell.replaceChildren(digit);
          });
        });
      };
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    const gallery = document.getElementById('gallery');
    if (gallery) {
      const previous = gallery.querySelector('[aria-label="Previous picture"]');
      const next = gallery.querySelector('[aria-label="Next picture"]');
      const figures = [...gallery.querySelectorAll('figure')];
      const track = figures[0]?.parentElement?.parentElement;
      const status = document.createElement('p');
      status.setAttribute('role', 'status');
      status.className = 'sr-only';
      const pictures = [
        'The mangni',
        'Rumi Darwaza, in the January fog',
        'Kebab hunting in Aminabad, round three',
        'Both mothers, finally agreeing on the menu',
      ];
      let current = 0;
      const updateGallery = () => {
        status.textContent = `Picture ${current + 1} of ${pictures.length}: ${pictures[current]}`;
        if (previous) previous.disabled = current === 0;
        if (next) next.disabled = current === pictures.length - 1;
        const item = figures[current]?.parentElement;
        if (track && item) {
          track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        }
      };
      previous?.addEventListener('click', () => {
        current = Math.max(0, current - 1);
        updateGallery();
      });
      next?.addEventListener('click', () => {
        current = Math.min(pictures.length - 1, current + 1);
        updateGallery();
      });
      gallery.append(status);
      updateGallery();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
