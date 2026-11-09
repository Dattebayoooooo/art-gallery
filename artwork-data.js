/**
 * ==============================================================================
 * A LITTLE UNFRAMED - ARTWORK DATA MANAGEMENT
 * ==============================================================================
 * 
 * Brand: A Little Unframed
 * Artist: Anjali
 * 
 * ------------------------------------------------------------------------------
 * HOW TO MANAGE ARTWORK IN THIS FILE:
 * ------------------------------------------------------------------------------
 * 
 * 1. HOW TO ADD A NEW PAINTING:
 *    - Save your photo in the "assets/artworks/" folder (e.g., "artwork-06.jpg").
 *    - Copy one of the objects below and paste it at the end of the `ARTWORK_DATA` array.
 *    - Give it a unique `id` number (e.g., 6).
 *    - Fill in `name`, `image`, `price`, `size`, `medium`, `category`, `description`,
 *      `availability`, and `featured` (true or false).
 * 
 * 2. HOW TO REPLACE A PAINTING PHOTOGRAPH:
 *    - Save your new photo inside "assets/artworks/" with a descriptive name,
 *      or overwrite the existing file (e.g., "assets/artworks/artwork-01.jpg").
 *    - Update the `image` property in the matching artwork object below.
 * 
 * 3. HOW TO UPDATE ARTWORK NAME OR PRICE:
 *    - Find the artwork by its `name` or `id`.
 *    - Change the `name` string (e.g., name: "Sunlit Morning").
 *    - Change the `price` number (e.g., price: 599). The ₹ symbol is added automatically.
 * 
 * 4. HOW TO CHANGE SIZE OR MEDIUM:
 *    - Update `size` (e.g., "6 x 6 inches", "5 x 7 inches", "4 x 4 inches").
 *    - Update `medium` (e.g., "Acrylic on stretched canvas", "Oil & palette knife on mini canvas").
 * 
 * 5. HOW TO MARK A PAINTING AS SOLD:
 *    - Change `availability: "available"` to `availability: "sold"`.
 *    - The website will automatically show the "Sold" badge and adjust the WhatsApp
 *      enquiry button to ask Anjali about creating a similar custom piece.
 * 
 * 6. HOW TO CHANGE A CATEGORY:
 *    - Set `category` to one of:
 *      "Abstract", "Nature & Florals", "Miniature Art", or "Custom Creations".
 * 
 * 7. HOW TO FEATURE AN ARTWORK ON THE HOMEPAGE:
 *    - Set `featured: true` (recommended to keep 3 featured artworks).
 * ==============================================================================
 */

// NOTE: These initial five entries are demonstration samples.
// Replace them with Anjali's actual photographs and details when ready.
const ARTWORK_DATA = [
  {
    id: 1,
    name: "Little Sunshine",
    image: "assets/artworks/artwork-01.jpg",
    price: 499,
    size: "4 x 4 inches",
    medium: "Textured acrylic on mini canvas",
    category: "Abstract",
    description: "A joyful burst of warm ochre, golden yellow, and buttery cream impasto strokes. Displayed on a miniature wooden easel, this piece radiates cheerful warmth and optimism into any small desk corner.",
    availability: "available",
    featured: true
  },
  {
    id: 2,
    name: "Blooming Thoughts",
    image: "assets/artworks/artwork-02.jpg",
    price: 499,
    size: "4 x 4 inches",
    medium: "Acrylic on stretched mini canvas",
    category: "Nature & Florals",
    description: "A delicate floral bouquet sculpted with soft peach blossoms, sage green foliage, and lavender touches. Each petal carries tactile texture, capturing the quiet serenity of a blooming morning garden.",
    availability: "available",
    featured: true
  },
  {
    id: 3,
    name: "The Blue Escape",
    image: "assets/artworks/artwork-03.jpg",
    price: 499,
    size: "5 x 5 inches",
    medium: "Palette knife acrylic on canvas",
    category: "Abstract",
    description: "Layered palette knife strokes of cerulean blue, deep coastal teal, and seafoam white froth. Inspired by quiet moments watching ocean tides, bringing an instant calm to your bedside or workspace.",
    availability: "available",
    featured: true
  },
  {
    id: 4,
    name: "Golden Hour",
    image: "assets/artworks/artwork-04.jpg",
    price: 499,
    size: "4 x 4 inches",
    medium: "Textured acrylic on canvas",
    category: "Nature & Florals",
    description: "A dreamy sunset gradient transitioning from soft blush peach to warm mustard gold, framed by delicate silhouetted wildflowers and meadow grasses dancing in the evening breeze.",
    availability: "available",
    featured: false
  },
  {
    id: 5,
    name: "A Little Daydream",
    image: "assets/artworks/artwork-05.jpg",
    price: 499,
    size: "4 x 4 inches",
    medium: "Pastel acrylic & gold flecks on mini canvas",
    category: "Miniature Art",
    description: "Whimsical clouds painted in lilac, blush, and soft sky tones with subtle shimmering gold touches. A gentle reminder to pause, look up at the sky, and give yourself a little daydream.",
    availability: "available",
    featured: false
  }
];

// Attach to window object for straightforward browser access without bundlers
if (typeof window !== "undefined") {
  window.ARTWORK_DATA = ARTWORK_DATA;
}
