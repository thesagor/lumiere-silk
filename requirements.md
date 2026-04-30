# Lumière Silk — Project Requirements

> **Client:** Sabrina (lumieresilk.ca@gmail.com)
> **Developer:** Sagor Ahmed (imthesagor@gmail.com / mail@thesagor.nl)
> **Platform:** Shopify (store: lumieresilk-2.myshopify.com)
> **Theme base:** Sheena (DesignThemes)
> **Status:** Active development — April 2026

---

## 1. Brand Overview

**Lumière Silk** is a premium accessories and gifting brand rooted in elegance, refinement, and timeless beauty. The brand launched with silk scarves and is expanding into selected jewelry and gift accessories.

### Brand Personality.

- Elegant, timeless, soft, and feminine
- Premium — but approachable and not overcomplicated
- Thoughtful and gift-oriented
- Boutique-style, polished, and emotionally appealing

---

## 2. Visual Direction

### Overall Feel

Minimal · Elegant · Premium · Clean · Soft · Refined · Luxury-inspired · Calm · Sophisticated

### Design Focus

- Product photography as the hero element
- Fabric texture and material quality
- Packaging and unboxing presentation
- Elevated brand atmosphere (not a crowded store)

### Color Palette

| Token                   | Color                  | Use                      |
| ----------------------- | ---------------------- | ------------------------ |
| Ivory `#faf8f5`         | Primary background     | Page backgrounds         |
| Cream `#f5f0e8`         | Secondary background   | Section backgrounds      |
| Beige / Blush `#f0e8e4` | Accent background      | Highlight sections       |
| Muted Gold `#c9a96e`    | Brand accent           | CTAs, borders, icons     |
| Gold Light `#dfc49a`    | Hover/secondary        | Hover states             |
| Warm Black `#2a2218`    | Primary text & buttons | Headlines, CTAs          |
| Muted Text `#8a7d6f`    | Body text              | Paragraphs, labels       |
| Sage Green `#c4d4c0`    | Optional accent        | Badges, success states   |
| Border `#e8e2d9`        | Dividers               | Card borders, separators |

### Typography

- **Serif headings:** Cormorant Garamond (Google Fonts) — weight 400
- **Sans body/UI:** Inter (Google Fonts) — weight 400/500/600
- Heading style: large, airy, elegant
- Body style: small, tracked, uppercase labels where needed

---

## 3. Products

### Stage 1 (Current)

| Product                         | Description                                |
| ------------------------------- | ------------------------------------------ |
| Signature Silk Scarf            | Timeless, feminine, everyday elegance      |
| Elegant Silk Scarf              | Understated luxury, graceful styling       |
| Silk Scarf Gift Box             | Scarf + branded gift box, gift-ready       |
| Silk Scarf & Brooch Set         | Scarf + decorative brooch, curated pairing |
| Silk Scarf & Pearl Earrings Set | Scarf + delicate pearl earrings            |

### Planned Future Products

- Brooches (standalone)
- Pearl earrings (standalone)
- Small jewelry accessories
- Giftable fashion accessories

### Product Page Content Structure

Each product page should include:

1. Product title
2. Short one-line description
3. Long description (brand story tone)
4. Material (silk blend / update with exact later)
5. Size (e.g., 86 × 86 cm — update with exact)
6. Packaging note ("elegantly presented…")
7. "Perfect For" bullet list
8. Care instructions (5 bullets)
9. Product tabs: Description · Care · Shipping · Returns

---

## 4. Homepage Structure

### Section Order & Copy

#### 1. Hero Banner

- **Main Title:** Elegant Silk, Beautifully Gifted
- **Subtitle:** Discover elegant silk scarves and gift-ready pieces designed to bring beauty, softness, and refinement to everyday life.
- **Button 1:** Shop Scarves → `/collections/silk-scarves`
- **Button 2:** Explore Gift Sets → `/collections/gift-sets`
- Style: Full-width, large image, center-aligned text overlay

#### 2. Brand Introduction

- **Section Title:** Timeless Beauty, Thoughtfully Presented
- **Body:** Lumière Silk is a premium accessories and gifting brand centered around elegance, softness, and refined details. From silk scarves to beautifully presented gift sets, each piece is chosen to offer a graceful and elevated experience for both personal use and meaningful gifting.
- Style: Centered text, 2-column or centered narrow column

#### 3. Signature Collection

- **Section Title:** Signature Silk Scarves
- **Body:** Our silk scarves are designed to feel timeless, feminine, and effortlessly elegant. With a focus on beauty, texture, and versatility, each piece is selected to add softness and sophistication to everyday style.
- **Tag line:** Classic pieces made to be worn, loved, and gifted.
- **Button:** View Collection → `/collections/silk-scarves`
- Style: Product carousel or 3-column grid

#### 4. Gift Sets

- **Section Title:** Gift-Ready Elegance
- **Body:** More than an accessory, Lumière Silk is designed to be a beautiful gifting experience. Explore scarf gift boxes and thoughtfully paired sets created for special moments, personal treats, and meaningful gestures.
- **Tag line:** Beautifully chosen. Elegantly presented.
- **Button:** Shop Gift Sets → `/collections/gift-sets`
- Style: 2-column or featured product layout

#### 5. Packaging / Gifting Experience

- **Section Title:** The Art of Gifting
- **Body:** Every detail matters — from the softness of the silk to the presentation of the final box. Our packaging is designed to feel refined, graceful, and ready to gift, creating a memorable unboxing experience that reflects the beauty of the brand.
- **Tag line:** Refined packaging, thoughtful details, timeless impression.
- Style: Large image + text side-by-side

#### 6. Brand Story

- **Section Title:** The World of Lumière Silk
- **Body:** Lumière Silk was created from a love of elegance, beauty, and thoughtful design. We believe the smallest details can make a lasting impression, and that a beautifully chosen piece can bring quiet confidence, warmth, and joy. Our vision is to create a brand that feels soft, polished, and timeless — a place where silk, presentation, and gifting come together with grace.
- **Button:** About Us → `/pages/about`
- Style: Dark background (warm black), ivory text, centered

#### 7. Newsletter / Contact (Optional)

- Email signup for brand updates
- Style: Minimal, centered, ivory background

---

## 5. Website Pages

### Required Pages

| Page                | URL Handle                  | Template              | Status                     |
| ------------------- | --------------------------- | --------------------- | -------------------------- |
| Home                | `/`                         | `index`               | ✅ Exists                  |
| Shop / All Products | `/collections/all`          | `collection`          | ✅ Shopify default         |
| Silk Scarves        | `/collections/silk-scarves` | `collection`          | Create collection in admin |
| Gift Sets           | `/collections/gift-sets`    | `collection`          | Create collection in admin |
| About Us            | `/pages/about`              | `page.about`          | ✅ Template exists         |
| Contact             | `/pages/contact`            | `page.contact` (JSON) | ✅ Template exists         |
| FAQ                 | `/pages/faq`                | `page.faq`            | ✅ Template exists         |
| Services            | `/pages/services`           | `page.services`       | ✅ Template exists         |
| Wishlist            | `/pages/wishlist`           | `page.wishlist`       | ⚠️ Create page in admin    |
| Shipping Policy     | `/policies/shipping-policy` | Shopify policy page   | Create in admin            |
| Return Policy       | `/policies/refund-policy`   | Shopify policy page   | Create in admin            |
| Privacy Policy      | `/policies/privacy-policy`  | Shopify policy page   | Create in admin            |

### Future Pages

- `/collections/accessories` — Accessories collection

---

## 6. Navigation Structure

### Main Menu

```
Home | Catalog | Contact
```

_(Current — to expand as products are added)_

### Recommended Final Menu

```
Home
Shop
  ├── All Products
  ├── Silk Scarves
  └── Gift Sets
About
Contact
FAQ
```

### Footer Menu

```
Shop | About | Contact | FAQ | Shipping Policy | Return Policy | Privacy Policy
```

---

## 7. Page Content

### FAQ Content

1. **What products do you offer?**
   Lumière Silk offers elegant silk scarves, gift-ready sets, and selected accessories designed with softness, refinement, and timeless beauty in mind.

2. **Do your products come in gift packaging?**
   Some products include gift-ready packaging or gift box presentation. Please refer to the individual product description for details.

3. **Do you ship within Canada?**
   Yes, Lumière Silk currently focuses mainly on shipping within Canada.

4. **Do you ship to the United States?**
   At this stage, our primary focus is Canada. U.S. shipping may be added in the future.

5. **How long does shipping take?**
   Shipping times may vary depending on the destination and shipping method selected at checkout. A confirmation email with tracking information will be provided when available.

6. **Can I return or exchange an item?**
   Eligible items may be returned or exchanged within the stated return period, provided they are unused, in original condition, and returned with the original packaging.

7. **Are gift sets and accessories returnable?**
   For hygiene and product protection reasons, certain items such as earrings or selected gift sets may be final sale unless they arrive damaged or incorrect.

8. **How should I care for my scarf?**
   We recommend gentle handling, avoiding harsh chemicals, and following the care instructions provided on the product page.

9. **How can I contact you?**
   Email: lumieresilk.ca@gmail.com

---

### Shipping Policy Content

**Processing Time:** 2–5 business days after payment (may extend during holidays/launches).

**Shipping Areas:** Primarily Canada. Additional destinations may be added in the future.

**Shipping Rates:** Calculated at checkout based on delivery address and selected method.

**Delivery Time:** Estimates vary by destination and carrier — timelines are not guaranteed.

**Order Tracking:** Tracking details emailed once dispatched (when available).

**Address Accuracy:** Customer is responsible for providing a complete and accurate address.

**Delays:** Lumière Silk is not responsible for carrier delays, weather, or external factors.

**Damaged / Lost Packages:** Contact lumieresilk.ca@gmail.com as soon as possible.

---

### Return Policy Content

**Return Window:** 7 days from delivery for eligible items.

**Eligibility Requirements:**

- Unused and in original condition
- Returned with original packaging
- Proof of purchase required

**Non-Returnable Items:**

- Earrings
- Worn or used items
- Items damaged by misuse
- Customized or special-order items
- Certain gift sets (stated in product description)

**Damaged / Incorrect Items:** Contact within 48 hours of delivery with order number and clear photos.

**Return Process:** Email lumieresilk.ca@gmail.com with order number and reason. Instructions provided upon approval.

**Return Shipping:** Customer's responsibility unless item is incorrect or damaged.

**Refunds:** Issued to original payment method after inspection and approval.

**Exchanges:** Offered for eligible items subject to availability.

---

## 8. Shopify Admin Setup Checklist

### Store Settings

- [ ] Store name: LumiereSilk
- [ ] Contact email: lumieresilk.ca@gmail.com
- [ ] Currency: CAD
- [ ] Time zone: Canada (Eastern or Pacific depending on location)
- [ ] Tax: Enable Canadian taxes (GST/HST/PST as applicable)

### Payments

- [ ] Enable Shopify Payments (preferred)
- [ ] Enable PayPal
- [ ] Enable Shop Pay

### Shipping

- [ ] Canada — set shipping rates (free over threshold or flat rate)
- [ ] United States — disable or set as "coming soon"

### Policies (via Settings → Policies)

- [ ] Shipping policy — paste content from Section 7
- [ ] Refund policy — paste content from Section 7
- [ ] Privacy policy — generate + customize
- [ ] Terms of service — generate + customize

### Pages to Create in Admin

- [ ] About (handle: `about`, template: `page.about`)
- [ ] FAQ (handle: `faq`, template: `page.faq`)
- [ ] Contact (handle: `contact`, template: `page.contact`)
- [ ] Services (handle: `services`, template: `page.services`)
- [ ] Wishlist (handle: `wishlist`, template: `page.wishlist`)

### Collections to Create in Admin

- [ ] Silk Scarves (handle: `silk-scarves`)
- [ ] Gift Sets (handle: `gift-sets`)

### Products to Create

- [ ] Signature Silk Scarf
- [ ] Elegant Silk Scarf
- [ ] Silk Scarf Gift Box
- [ ] Silk Scarf & Brooch Set
- [ ] Silk Scarf & Pearl Earrings Set

### Theme Setup

- [ ] Upload all theme files from `sheena-lumiere-upload/`
- [ ] Set `lumiere-design.css` and `lumiere-pages.css` as stylesheet assets
- [ ] Verify Google Fonts (Cormorant Garamond + Inter) loaded in `theme.liquid`
- [ ] Enable wishlist in theme settings
- [ ] Enable quickview in theme settings
- [ ] Enable product icon buttons (icon alignment: right)
- [ ] Set ajax cart method to drawer
- [ ] Configure homepage sections in theme customizer

---

## 9. Materials Needed from Client

- [ ] Logo files (SVG + PNG, light and dark versions)
- [ ] Product photos (all 5 products, multiple angles)
- [ ] Packaging / gift box photos
- [ ] Exact product dimensions (scarf sizes)
- [ ] Exact material descriptions
- [ ] Prices (in CAD)
- [ ] Product variants (if any — colors, sizes)
- [ ] Brand reference websites / visual inspirations
- [ ] Contact address (for Contact page and policies)

---

## 10. Target Market

| Market        | Status           |
| ------------- | ---------------- |
| Canada        | Primary — active |
| United States | Future expansion |

---

## 11. Communication

- **Client email:** lumieresilk.ca@gmail.com
- **Developer email:** imthesagor@gmail.com

---

## 12. Tone of Voice

Written content should be:

- **Elegant** — refined word choices, no casual slang
- **Warm** — emotionally appealing, not cold or corporate
- **Refined** — polished sentences, correct grammar
- **Soft** — gentle, inviting language
- **Professional** — clear and trustworthy
- **Feminine** — without being overly casual

**Style guide examples:**

- ✅ "Beautifully crafted for those who appreciate the quiet luxury of silk."
- ✅ "A thoughtful gift, elegantly presented."
- ❌ "Check out our awesome scarves!"
- ❌ "Get yours today!"

---

_Last updated: 2026-04-29_
