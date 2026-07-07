/* ============================================
   LUMIÈRE SILK — Brand JavaScript
   Shopify Theme v1.0
   ============================================ */

(function () {
  'use strict';

  // ---- Announcement Ticker (duplicate slides for seamless marquee) ----
  const annInner = document.getElementById('announcement-inner');
  if (annInner) {
    const slides = annInner.querySelectorAll('.announcement-slide');
    if (slides.length > 1) {
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        annInner.appendChild(clone);
      });
    }
  }

  // ---- Sticky Header ----
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('lumiere-overlay');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger && hamburger.classList.add('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger && hamburger.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);

  const mobileNavClose = document.getElementById('mobile-nav-close');
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  // Close mobile nav on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-sub').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ---- Search Overlay ----
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-overlay-close');

  function openSearch() {
    if (!searchOverlay) return;
    closeMobileNav();
    searchOverlay.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const input = searchOverlay.querySelector('.search-input');
    if (input) setTimeout(() => input.focus(), 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // ---- Cart Drawer ----
  const cartDrawer = document.getElementById('cart-drawer');
  const cartButtons = document.querySelectorAll('[data-open-cart]');
  const cartClose = document.getElementById('cart-drawer-close');

  function openCart() {
    if (!cartDrawer) return;
    closeMobileNav();
    closeSearch();
    cartDrawer.classList.add('open');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    refreshCart();
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('open');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartButtons.forEach(btn => btn.addEventListener('click', openCart));
  if (cartClose) cartClose.addEventListener('click', closeCart);

  // Overlay click closes everything
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMobileNav();
      closeSearch();
      closeCart();
    });
  }

  // Escape key closes everything
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeSearch();
      closeCart();
    }
  });

  // ---- Cart API ----
  async function refreshCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      updateCartUI(cart);
    } catch (e) {
      console.warn('Cart fetch failed', e);
    }
  }

  function updateCartUI(cart) {
    // Update count badges
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.setAttribute('data-count', cart.item_count);
      el.textContent = cart.item_count;
    });

    // Update drawer items
    const itemsContainer = document.getElementById('cart-drawer-items');
    const emptyState = document.getElementById('cart-drawer-empty');
    const footerEl = document.getElementById('cart-drawer-footer');

    if (!itemsContainer) return;

    if (cart.item_count === 0) {
      itemsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    itemsContainer.innerHTML = cart.items.map(item => `
      <div class="cart-item" data-key="${item.key}">
        <img class="cart-item-image" src="${item.image}" alt="${item.product_title}" width="80" height="100" loading="lazy">
        <div class="cart-item-details">
          <p class="cart-item-title">${item.product_title}</p>
          ${item.variant_title ? `<p class="cart-item-variant">${item.variant_title}</p>` : ''}
          <div class="cart-item-qty">
            <button class="qty-btn" data-key="${item.key}" data-qty="${item.quantity - 1}" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" data-key="${item.key}" data-qty="${item.quantity + 1}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <span class="cart-item-price">${formatMoney(item.final_line_price)}</span>
      </div>
    `).join('');

    // Update subtotal
    const subtotalEl = document.getElementById('cart-subtotal-amount');
    if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);

    // Qty buttons
    itemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const key = btn.dataset.key;
        const qty = parseInt(btn.dataset.qty);
        await updateCartItem(key, qty);
      });
    });
  }

  async function updateCartItem(key, qty) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      });
      const cart = await res.json();
      updateCartUI(cart);
    } catch (e) {
      console.warn('Cart update failed', e);
    }
  }

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ---- Add to Cart ----
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-atc]');
    if (!btn || btn.disabled) return;

    // Always read variant ID from the form's hidden input — it stays in sync with variant selection
    const form = btn.closest('form');
    const variantId = form?.querySelector('[name="id"]')?.value;
    if (!variantId) return;

    const qty = parseInt(form?.querySelector('[name="quantity"]')?.value || '1');

    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = 'Adding…';

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(variantId), quantity: qty })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.description || 'Add to cart failed');
      }

      btn.textContent = 'Added!';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);

      openCart();
    } catch (err) {
      console.warn('ATC error:', err.message);
      btn.textContent = 'Try again';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }
  });

  // ---- Product Gallery ----
  const thumbs = document.querySelectorAll('.product-gallery-thumb');
  const mainImg = document.getElementById('product-main-img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.src;
      if (mainImg && src) {
        mainImg.src = src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    });
  });

  // ---- Gallery Filter (variant-based image groups) ----
  // Image alt text convention: "Label | scarf-only" / "Label | gift-set" / "Label" (= all)
  // instant=true skips the fade animation (used on initial page load)
  let _galleryFirstApply = true;

  function filterGallery(allowedGroups, instant) {
    const thumbsWrap = document.getElementById('product-gallery-thumbs');
    if (!thumbsWrap) return;

    const allThumbs = thumbsWrap.querySelectorAll('.product-gallery-thumb');
    if (!allThumbs.length) return;

    // Bail early if no images are actually grouped — nothing to filter
    const hasGrouped = Array.from(allThumbs).some(
      t => (t.dataset.imageGroup || 'all') !== 'all'
    );
    if (!hasGrouped) return;

    function doFilter() {
      let firstVisible = null;

      allThumbs.forEach(thumb => {
        const group = thumb.dataset.imageGroup || 'all';
        const show  = allowedGroups.includes(group);
        thumb.dataset.hidden = show ? 'false' : 'true';
        if (show && !firstVisible) firstVisible = thumb;
      });

      // If the currently active thumb became hidden, promote the first visible one
      const active  = thumbsWrap.querySelector('.product-gallery-thumb.active');
      const mainImg = document.getElementById('product-main-img');
      if (active && active.dataset.hidden === 'true' && firstVisible) {
        allThumbs.forEach(t => t.classList.remove('active'));
        firstVisible.classList.add('active');
        if (mainImg) mainImg.src = firstVisible.dataset.src;
      }

      thumbsWrap.classList.remove('ls-gallery--filtering');
    }

    if (instant) {
      doFilter();
    } else {
      thumbsWrap.classList.add('ls-gallery--filtering');
      setTimeout(doFilter, 200);
    }
  }

  // ---- Variant Selector ----
  const variantForm = document.getElementById('product-form');
  if (variantForm) {
    const hiddenVariantInput = variantForm.querySelector('[name="id"]');
    const priceEl = document.getElementById('product-price');
    const comparePriceEl = document.getElementById('product-compare-price');
    const atcBtn = document.getElementById('atc-btn');
    const variantsData = window.__variants || [];

    // Apply a variant's state to the UI (price, button, hidden input, gallery)
    function applyVariant(variant) {
      if (!variant) return;
      if (hiddenVariantInput) hiddenVariantInput.value = variant.id;
      if (priceEl) priceEl.textContent = formatMoney(variant.price);
      if (comparePriceEl) {
        if (variant.compare_at_price > variant.price) {
          comparePriceEl.textContent = formatMoney(variant.compare_at_price);
          comparePriceEl.style.display = '';
        } else {
          comparePriceEl.style.display = 'none';
        }
      }
      if (atcBtn) {
        atcBtn.disabled = !variant.available;
        atcBtn.textContent = variant.available ? 'Add to Bag' : 'Sold Out';
      }

      // Swap variant-specific short description if available
      const shortDescMap  = window.__variantShortDescs || {};
      const shortDescEl   = document.getElementById('product-short-desc');
      const shortDescText = shortDescMap[String(variant.id)];
      if (shortDescEl && typeof shortDescText === 'string' && shortDescText.trim()) {
        shortDescEl.textContent = shortDescText;
      }

      // Swap variant-specific description tab if available
      const descMap  = window.__variantDescriptions || {};
      const descEl   = document.getElementById('product-description-content');
      const descHtml = descMap[String(variant.id)];
      if (descEl && typeof descHtml === 'string' && descHtml.trim()) {
        descEl.innerHTML = descHtml;
      }

      // Filter gallery images to only show those relevant to this variant
      const galleryMap    = window.__variantGallery || {};
      const allowedGroups = galleryMap[String(variant.id)] || ['all'];
      const instant       = _galleryFirstApply;
      _galleryFirstApply  = false;
      filterGallery(allowedGroups, instant);
    }

    // Read which option buttons are currently active and return their values
    function getSelectedOptions() {
      const options = [];
      variantForm.querySelectorAll('[data-option-index]').forEach(group => {
        const active = group.querySelector('.variant-btn.active');
        if (active) options.push(active.dataset.value);
      });
      return options;
    }

    // Find a variant that exactly matches the given option array
    function findVariant(selectedOptions) {
      return variantsData.find(v =>
        v.options.length === selectedOptions.length &&
        v.options.every((opt, i) => opt === selectedOptions[i])
      ) || null;
    }

    // On page load: sync button/price with whatever variant Liquid pre-selected
    // This catches any mismatch between server render and JS variant data
    if (variantsData.length && hiddenVariantInput) {
      const initialId = parseInt(hiddenVariantInput.value, 10);
      const initialVariant = variantsData.find(v => v.id === initialId);
      if (initialVariant) applyVariant(initialVariant);
    }

    // On variant button click: update active state then apply matching variant
    variantForm.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-option-index]');
        if (group) {
          group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        }
        btn.classList.add('active');

        const matched = findVariant(getSelectedOptions());
        if (matched) applyVariant(matched);
      });
    });
  }

  // ---- Product Tabs ----
  document.querySelectorAll('.product-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const tabContainer = btn.closest('.product-tabs');
      if (!tabContainer) return;

      tabContainer.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      tabContainer.querySelectorAll('.product-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = tabContainer.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.classList.add('active');
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Newsletter Form ----
  document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value;
      const btn = form.querySelector('button[type="submit"]');
      if (!email || !btn) return;

      const originalText = btn.textContent;
      btn.textContent = 'Subscribing…';
      btn.disabled = true;

      // Shopify newsletter subscription
      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `form_type=customer&utf8=✓&contact[email]=${encodeURIComponent(email)}&contact[tags]=newsletter`
        });
        btn.textContent = 'Thank you!';
        form.querySelector('input[type="email"]').value = '';
      } catch {
        btn.textContent = 'Try again';
      } finally {
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  });

  // ---- Scroll Animations ----
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  // ---- Collection Sort ----
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      window.location.href = url.toString();
    });
  }

  // Init cart count on load
  refreshCart();

})();

/* Wishlist (localStorage) ============================ */
(function () {
  var key = 'lumiere_wishlist';
  function read() { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; } }
  function write(items) { localStorage.setItem(key, JSON.stringify(items)); }

  function syncButtons() {
    var ids = read().map(function (i) { return String(i.id); });
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      var active = ids.indexOf(String(btn.dataset.productId)) !== -1;
      btn.setAttribute('data-wishlist-active', active ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-wishlist-toggle]');
    if (!btn) return;
    e.preventDefault();
    var items = read();
    var id = String(btn.dataset.productId);
    var idx = items.findIndex(function (i) { return String(i.id) === id; });
    if (idx >= 0) {
      items.splice(idx, 1);
    } else {
      items.push({
        id: id,
        title: btn.dataset.productTitle,
        url: btn.dataset.productUrl,
        image: btn.dataset.productImage,
        price: btn.dataset.productPrice
      });
    }
    write(items);
    syncButtons();
  });

  document.addEventListener('DOMContentLoaded', syncButtons);
})();

/* Quick view (light modal: fetches product .json) ============ */
(function () {
  function ensureModal() {
    var modal = document.getElementById('lumiere-quickview');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'lumiere-quickview';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(42,34,24,.55);display:none;align-items:center;justify-content:center;z-index:1000;padding:1rem;';
    modal.innerHTML = '<div data-qv-card style="background:#faf8f5;max-width:720px;width:100%;max-height:90vh;overflow:auto;border-radius:4px;padding:2rem;position:relative;"><button type="button" data-qv-close aria-label="Close" style="position:absolute;top:.75rem;right:.75rem;background:none;border:0;font-size:1.5rem;cursor:pointer;">&times;</button><div data-qv-body>Loading…</div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-qv-close]')) close();
    });
    return modal;
  }
  function open(html) {
    var modal = ensureModal();
    modal.querySelector('[data-qv-body]').innerHTML = html;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
  function close() {
    var modal = document.getElementById('lumiere-quickview');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-quickview]');
    if (!btn) return;
    e.preventDefault();
    var handle = btn.dataset.productHandle;
    open('Loading…');
    fetch('/products/' + handle + '.js').then(function (r) { return r.json(); }).then(function (p) {
      var img = p.featured_image ? '<img src="' + p.featured_image + '" alt="" style="width:100%;height:auto;margin-bottom:1rem;">' : '';
      var price = (p.price / 100).toFixed(2);
      open(
        img +
        '<h2 class="heading-serif" style="margin-bottom:.5rem;">' + p.title + '</h2>' +
        '<p style="color:#c9a96e;margin-bottom:1rem;">$' + price + '</p>' +
        '<div style="color:#8a7d6f;line-height:1.6;margin-bottom:1.5rem;">' + (p.description || '') + '</div>' +
        '<a href="' + p.url + '" class="btn btn-primary">View full details</a>'
      );
    }).catch(function () { open('<p>Unable to load product.</p>'); });
  });
})();
