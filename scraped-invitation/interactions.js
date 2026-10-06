(() => {
  const invitationUrl = 'https://sadarnimantran.in/invite/arsalan-inaya';
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
      setTimeout(() => cover.remove(), 480);
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

    const more = document.createElement('button');
    more.type = 'button';
    more.textContent = 'More';
    more.setAttribute('aria-expanded', 'false');
    more.setAttribute('aria-controls', 'invitation-shortcuts');
    Object.assign(more.style, {
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
    const menu = document.createElement('div');
    menu.id = 'invitation-shortcuts';
    menu.style.display = 'none';
    Object.assign(menu.style, {
      background: '#fffdf5',
      border: '1px solid #c9aa6a',
      borderRadius: '1rem',
      bottom: 'calc(4.5rem + env(safe-area-inset-bottom))',
      boxShadow: '0 8px 28px #0b2d2633',
      display: 'grid',
      gap: '.25rem',
      padding: '.5rem',
      position: 'absolute',
      right: '0',
      width: '11rem',
    });
    [
      ['Our story', 'story'],
      ['Family', 'family'],
      ['Moments', 'gallery'],
      ['Venue', 'venue'],
    ].forEach(([label, id]) => {
      const link = document.createElement('button');
      link.type = 'button';
      link.textContent = label;
      Object.assign(link.style, {
        background: 'transparent',
        border: '0',
        borderRadius: '.6rem',
        color: '#173c32',
        cursor: 'pointer',
        font: '500 .95rem/1.3 system-ui, sans-serif',
        padding: '.65rem .75rem',
        textAlign: 'left',
      });
      link.addEventListener('click', () => {
        menu.hidden = true;
        menu.style.display = 'none';
        more.setAttribute('aria-expanded', 'false');
        openSection(id);
      });
      menu.append(link);
    });
    more.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menu.style.display !== 'none';
      menu.style.display = isOpen ? 'none' : 'grid';
      more.setAttribute('aria-expanded', String(!isOpen));
    });
    dock.append(more);
    dock.append(menu);
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
          'PRODID:-//Wedding Invitation//Arsalan and Inaya//EN',
          'CALSCALE:GREGORIAN',
          'BEGIN:VEVENT',
          `UID:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-2026@arsalan-inaya`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
          `DTSTART:${start}`,
          `DTEND:${end}`,
          `SUMMARY:${escapeIcs(`${title} - Arsalan and Inaya`)}`,
          `DESCRIPTION:${escapeIcs(`${time}. Arsalan weds Inaya.`)}`,
          `LOCATION:${escapeIcs(location)}`,
          'END:VEVENT',
          'END:VCALENDAR',
        ].join('\r\n');
        const file = URL.createObjectURL(new Blob([contents], { type: 'text/calendar;charset=utf-8' }));
        const download = document.createElement('a');
        download.href = file;
        download.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-arsalan-inaya.ics`;
        download.click();
        setTimeout(() => URL.revokeObjectURL(file), 60000);
        announce(`${title} added to your calendar download.`);
      });
    });

    const name = document.querySelector('#rsvp input[type="text"]');
    const note = document.querySelector('#rsvp textarea');
    const reply = document.querySelector('#rsvp a[data-rsvp="send"]');
    if (reply && name) {
      const updateReply = () => {
        const guestName = name.value.trim();
        const attending = document.querySelector('#rsvp [data-rsvp="yes"]:checked');
        const notAttending = document.querySelector('#rsvp [data-rsvp="no"]:checked');
        const message = [
          'Namaste! Reply for Arsalan weds Inaya.',
          `Name: ${guestName}`,
          attending ? "Attendance: Yes, we'll be there." : notAttending ? "Attendance: Sorry, can't make it." : '',
          note?.value.trim() ? `Note: ${note.value.trim()}` : '',
        ].filter(Boolean).join('\n');
        reply.href = `https://wa.me/919411955202?text=${encodeURIComponent(message)}`;
      };
      [name, note, ...document.querySelectorAll('#rsvp input[type="radio"]')]
        .filter(Boolean)
        .forEach((field) => field.addEventListener('input', updateReply));
      reply.addEventListener('click', (event) => {
        if (!name.value.trim()) {
          event.preventDefault();
          name.focus();
          name.setAttribute('aria-invalid', 'true');
          announce('Enter your name before sending your reply.');
          return;
        }
        name.removeAttribute('aria-invalid');
        updateReply();
      });
      updateReply();
    }

    const share = [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Share');
    if (share) {
      share.addEventListener('click', async () => {
        const data = { title: 'Arsalan weds Inaya', text: 'You are warmly invited to Arsalan and Inaya’s Nikah.', url: invitationUrl };
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
        window.open('https://sadarnimantran.in/start?design=arsalan-inaya', '_blank', 'noopener,noreferrer');
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
