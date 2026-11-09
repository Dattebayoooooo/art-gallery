/**
 * ==============================================================================
 * A LITTLE UNFRAMED - MAIN JAVASCRIPT
 * ==============================================================================
 * 
 * Brand: A Little Unframed
 * Artist: Anjali
 * 
 * ------------------------------------------------------------------------------
 * SECTION: CENTRAL CONTACT & BRAND CONFIGURATION
 * Edit your WhatsApp, Instagram, and artist details right here in this one object.
 * ------------------------------------------------------------------------------
 */
const ARTIST_CONFIG = {
  // Brand details
  brandName: "A Little Unframed",
  artistName: "Anjali",
  tagline: "A little paint. A lot of thoughts & everything in between.",
  secondaryTagline: "Little canvases. Endless feelings.",
  
  // WhatsApp Configuration (Do not include '+' in whatsappNumberForUrl)
  // Raw phone: 9496573833
  // International format for India: 91 + 9496573833
  whatsappDisplay: "+91 94965 73833",
  whatsappNumberForUrl: "919496573833",
  
  // Instagram Configuration
  instagramUsername: "@anjali._.gireesh",
  instagramUrl: "https://www.instagram.com/anjali._.gireesh/",
  
  // Currency and defaults
  currencySymbol: "₹",
  defaultCurrencyCode: "INR"
};

/**
 * ==============================================================================
 * WHATSAPP MESSAGE GENERATOR FUNCTIONS
 * ==============================================================================
 */

/**
 * Generate a WhatsApp enquiry link for a specific artwork.
 * @param {string} artworkName 
 * @param {number|string} price 
 * @param {string} availability ('available' | 'sold')
 * @returns {string} Fully encoded WhatsApp URL
 */
function getArtworkWhatsAppUrl(artworkName, price, availability = "available") {
  const isAvailable = String(availability).toLowerCase() === "available";
  let message = "";
  
  if (isAvailable) {
    message = `Hi ${ARTIST_CONFIG.artistName}! I'm interested in your artwork '${artworkName}' priced at ${ARTIST_CONFIG.currencySymbol}${price}. Is it still available?`;
  } else {
    message = `Hi ${ARTIST_CONFIG.artistName}! I love your artwork '${artworkName}' which is currently marked as Sold. Could you create a similar piece or discuss a custom commission?`;
  }
  
  return `https://wa.me/${ARTIST_CONFIG.whatsappNumberForUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp link for custom artwork commissions.
 * @returns {string} Fully encoded WhatsApp URL
 */
function getCustomArtworkWhatsAppUrl() {
  const message = `Hi ${ARTIST_CONFIG.artistName}! I discovered ${ARTIST_CONFIG.brandName} and would love to discuss a custom painting. Could you share more details?`;
  return `https://wa.me/${ARTIST_CONFIG.whatsappNumberForUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp link for general conversations / inquiries.
 * @returns {string} Fully encoded WhatsApp URL
 */
function getGeneralChatWhatsAppUrl() {
  const message = `Hi ${ARTIST_CONFIG.artistName}! I discovered ${ARTIST_CONFIG.brandName} and would love to say hello and learn more about your paintings.`;
  return `https://wa.me/${ARTIST_CONFIG.whatsappNumberForUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * ==============================================================================
 * DOM ELEMENTS & APPLICATION STATE
 * ==============================================================================
 */
let currentCategory = "All Art";
let activeArtwork = null;

// DOM Selectors
const elements = {
  header: document.getElementById("main-header"),
  mobileMenuBtn: document.getElementById("mobile-menu-btn"),
  mobileNav: document.getElementById("mobile-nav"),
  navLinks: document.querySelectorAll(".nav-link"),
  featuredContainer: document.getElementById("featured-artworks-grid"),
  galleryContainer: document.getElementById("gallery-artworks-grid"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  modal: document.getElementById("artwork-modal"),
  modalBackdrop: document.getElementById("modal-backdrop"),
  modalCloseBtn: document.getElementById("modal-close-btn"),
  modalImage: document.getElementById("modal-artwork-image"),
  modalTitle: document.getElementById("modal-artwork-title"),
  modalCategory: document.getElementById("modal-artwork-category"),
  modalPrice: document.getElementById("modal-artwork-price"),
  modalSize: document.getElementById("modal-artwork-size"),
  modalMedium: document.getElementById("modal-artwork-medium"),
  modalStatus: document.getElementById("modal-artwork-status"),
  modalDescription: document.getElementById("modal-artwork-description"),
  modalWhatsappBtn: document.getElementById("modal-whatsapp-btn"),
  backToTopBtn: document.getElementById("back-to-top-btn"),
  currentYearSpan: document.getElementById("current-year"),
  customArtWhatsappBtn: document.getElementById("custom-art-whatsapp-btn"),
  contactWhatsappBtn: document.getElementById("contact-whatsapp-btn"),
  heroTalkBtn: document.getElementById("hero-talk-btn")
};

/**
 * ==============================================================================
 * ARTWORK CARD TEMPLATE GENERATOR
 * ==============================================================================
 */
function createArtworkCardHtml(artwork, isFeaturedSection = false) {
  const isAvailable = artwork.availability.toLowerCase() === "available";
  const statusClass = isAvailable ? "status-available" : "status-sold";
  const statusText = isAvailable ? "Available" : "Sold";
  const buttonText = isAvailable ? "Enquire Now" : "Enquire Similar";

  return `
    <article class="artwork-card group" data-id="${artwork.id}" data-category="${artwork.category}">
      <div class="artwork-card-image-wrap" tabindex="0" role="button" aria-label="View details for ${artwork.name}" onclick="openArtworkModal(${artwork.id})">
        <img 
          src="${artwork.image}" 
          alt="${artwork.name} - Handmade canvas painting by Anjali" 
          loading="lazy" 
          class="artwork-card-image"
          onerror="handleImageFallback(this)"
        />
        <div class="artwork-badge ${statusClass}">
          ${statusText}
        </div>
        <div class="artwork-hover-overlay">
          <span class="quick-view-label">View Details</span>
        </div>
      </div>
      
      <div class="artwork-card-info">
        <div class="artwork-card-header">
          <span class="artwork-meta-category">${artwork.category}</span>
          <span class="artwork-meta-size">${artwork.size}</span>
        </div>
        
        <h3 class="artwork-card-title" onclick="openArtworkModal(${artwork.id})">${artwork.name}</h3>
        
        <p class="artwork-card-medium">${artwork.medium}</p>
        
        <div class="artwork-card-footer">
          <div class="artwork-price-wrap">
            <span class="artwork-price-label">Price</span>
            <span class="artwork-price-value">${ARTIST_CONFIG.currencySymbol}${artwork.price}</span>
          </div>
          <button 
            type="button" 
            class="artwork-action-btn ${isAvailable ? 'btn-primary-action' : 'btn-sold-action'}"
            onclick="handleDirectEnquiry(event, ${artwork.id})"
            aria-label="${buttonText} for ${artwork.name}"
          >
            ${buttonText}
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Handle graceful fallback if an artwork image is missing or cannot be loaded
 */
function handleImageFallback(imgElement) {
  imgElement.onerror = null;
  imgElement.src = "assets/artworks/artwork-01.jpg";
}

/**
 * ==============================================================================
 * RENDER FUNCTIONS
 * ==============================================================================
 */

/**
 * Render featured artworks in Section 3
 */
function renderFeaturedArtworks() {
  if (!elements.featuredContainer) return;
  
  const artworks = window.ARTWORK_DATA || [];
  // Grab items marked as featured, fallback to first 3 if none
  let featured = artworks.filter(item => item.featured === true);
  if (featured.length === 0) {
    featured = artworks.slice(0, 3);
  }
  
  elements.featuredContainer.innerHTML = featured
    .map(artwork => createArtworkCardHtml(artwork, true))
    .join("");
}

/**
 * Render gallery artworks in Section 4 with filtering
 */
function renderGalleryArtworks(category = "All Art") {
  if (!elements.galleryContainer) return;
  
  const artworks = window.ARTWORK_DATA || [];
  
  let filtered = artworks;
  if (category !== "All Art") {
    filtered = artworks.filter(item => item.category === category);
  }
  
  if (filtered.length === 0) {
    elements.galleryContainer.innerHTML = `
      <div class="gallery-empty-state">
        <p class="empty-state-title">No paintings found in "${category}" right now.</p>
        <p class="empty-state-text">Anjali is constantly creating fresh canvases! You can also request a personalised custom painting anytime.</p>
        <button type="button" class="btn btn-outline" onclick="resetGalleryFilter()">View All Paintings</button>
      </div>
    `;
    return;
  }
  
  elements.galleryContainer.innerHTML = filtered
    .map(artwork => createArtworkCardHtml(artwork, false))
    .join("");
}

/**
 * Reset filter to "All Art"
 */
function resetGalleryFilter() {
  currentCategory = "All Art";
  elements.filterButtons.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-category") === "All Art");
  });
  renderGalleryArtworks("All Art");
}

/**
 * ==============================================================================
 * ARTWORK MODAL / LIGHTBOX
 * ==============================================================================
 */
function openArtworkModal(artworkId) {
  const artworks = window.ARTWORK_DATA || [];
  const artwork = artworks.find(item => item.id === Number(artworkId));
  if (!artwork || !elements.modal) return;
  
  activeArtwork = artwork;
  const isAvailable = artwork.availability.toLowerCase() === "available";
  
  // Populate modal details
  elements.modalImage.src = artwork.image;
  elements.modalImage.alt = `${artwork.name} by Anjali`;
  elements.modalTitle.textContent = artwork.name;
  elements.modalCategory.textContent = artwork.category;
  elements.modalPrice.textContent = `${ARTIST_CONFIG.currencySymbol}${artwork.price}`;
  elements.modalSize.textContent = artwork.size;
  elements.modalMedium.textContent = artwork.medium;
  elements.modalDescription.textContent = artwork.description;
  
  // Status styling
  elements.modalStatus.textContent = isAvailable ? "Available" : "Sold";
  elements.modalStatus.className = `modal-status-pill ${isAvailable ? "status-available" : "status-sold"}`;
  
  // WhatsApp button
  const whatsappUrl = getArtworkWhatsAppUrl(artwork.name, artwork.price, artwork.availability);
  elements.modalWhatsappBtn.href = whatsappUrl;
  elements.modalWhatsappBtn.innerHTML = `
    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
    <span>${isAvailable ? "Enquire on WhatsApp" : "Enquire About Similar Artwork"}</span>
  `;
  
  // Show modal
  elements.modal.classList.add("open");
  elements.modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  
  // Set focus on close button
  setTimeout(() => {
    if (elements.modalCloseBtn) elements.modalCloseBtn.focus();
  }, 100);
}

function closeArtworkModal() {
  if (!elements.modal) return;
  elements.modal.classList.remove("open");
  elements.modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeArtwork = null;
}

/**
 * Handle direct card button click without opening full modal (or open directly in WhatsApp)
 */
function handleDirectEnquiry(event, artworkId) {
  event.stopPropagation();
  const artworks = window.ARTWORK_DATA || [];
  const artwork = artworks.find(item => item.id === Number(artworkId));
  if (!artwork) return;
  
  const url = getArtworkWhatsAppUrl(artwork.name, artwork.price, artwork.availability);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * ==============================================================================
 * NAVIGATION & SCROLL INTERACTIONS
 * ==============================================================================
 */
function initNavigation() {
  // Mobile hamburger toggle
  if (elements.mobileMenuBtn && elements.mobileNav) {
    elements.mobileMenuBtn.addEventListener("click", () => {
      const isOpen = elements.mobileNav.classList.contains("open");
      if (isOpen) {
        elements.mobileNav.classList.remove("open");
        elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
        elements.mobileMenuBtn.classList.remove("active");
      } else {
        elements.mobileNav.classList.add("open");
        elements.mobileMenuBtn.setAttribute("aria-expanded", "true");
        elements.mobileMenuBtn.classList.add("active");
      }
    });
  }
  
  // Close mobile nav on link click
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (elements.mobileNav) {
        elements.mobileNav.classList.remove("open");
        if (elements.mobileMenuBtn) {
          elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
          elements.mobileMenuBtn.classList.remove("active");
        }
      }
    });
  });
  
  // Sticky header background styling on scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    
    if (elements.header) {
      if (scrollY > 30) {
        elements.header.classList.add("scrolled");
      } else {
        elements.header.classList.remove("scrolled");
      }
    }
    
    // Back to top button visibility
    if (elements.backToTopBtn) {
      if (scrollY > 400) {
        elements.backToTopBtn.classList.add("visible");
      } else {
        elements.backToTopBtn.classList.remove("visible");
      }
    }
  }, { passive: true });
}

/**
 * Smooth scrolling helper
 */
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  const headerOffset = 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

/**
 * ==============================================================================
 * FILTER BUTTONS LISTENER
 * ==============================================================================
 */
function initFilterControls() {
  elements.filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      if (!category) return;
      
      currentCategory = category;
      elements.filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      renderGalleryArtworks(category);
    });
  });
}

/**
 * ==============================================================================
 * MODAL EVENT LISTENERS
 * ==============================================================================
 */
function initModalListeners() {
  if (elements.modalCloseBtn) {
    elements.modalCloseBtn.addEventListener("click", closeArtworkModal);
  }
  
  if (elements.modalBackdrop) {
    elements.modalBackdrop.addEventListener("click", closeArtworkModal);
  }
  
  // Close on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.modal && elements.modal.classList.contains("open")) {
      closeArtworkModal();
    }
  });
}

/**
 * ==============================================================================
 * INITIALIZE APPLICATION
 * ==============================================================================
 */
function initApp() {
  // Set current year in footer
  if (elements.currentYearSpan) {
    elements.currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Bind custom artwork whatsapp button
  if (elements.customArtWhatsappBtn) {
    elements.customArtWhatsappBtn.href = getCustomArtworkWhatsAppUrl();
  }
  
  // Bind contact section whatsapp button
  if (elements.contactWhatsappBtn) {
    elements.contactWhatsappBtn.href = getCustomArtworkWhatsAppUrl();
  }
  
  // Bind top navbar "Let's Talk" button
  const navTalkBtns = document.querySelectorAll(".nav-talk-btn");
  navTalkBtns.forEach(btn => {
    btn.href = getGeneralChatWhatsAppUrl();
  });
  
  // Bind Hero Explore & Meet buttons
  const exploreHeroBtn = document.getElementById("hero-explore-btn");
  if (exploreHeroBtn) {
    exploreHeroBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection("#gallery");
    });
  }
  
  const meetArtistHeroBtn = document.getElementById("hero-meet-btn");
  if (meetArtistHeroBtn) {
    meetArtistHeroBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection("#about");
    });
  }
  
  // Back to top click
  if (elements.backToTopBtn) {
    elements.backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  
  // Initialize sub-systems
  initNavigation();
  initFilterControls();
  initModalListeners();
  
  // Render artworks
  renderFeaturedArtworks();
  renderGalleryArtworks("All Art");
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Export functions to global scope for inline HTML handlers
window.openArtworkModal = openArtworkModal;
window.closeArtworkModal = closeArtworkModal;
window.handleDirectEnquiry = handleDirectEnquiry;
window.resetGalleryFilter = resetGalleryFilter;
window.handleImageFallback = handleImageFallback;
window.scrollToSection = scrollToSection;
