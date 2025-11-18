# Help Section Schema Documentation

## Overview

Created two Sanity schema files for the Help Section component based on
`help-section.tsx` data structure.

## Files Created

### 1. `help-section-item-schema.ts`

**Type:** Object schema **Purpose:** Defines the structure for individual help
cards

#### Fields:

- **name** (internationalizedArrayString) - Card title in multiple languages
- **content** (internationalizedArrayText) - Card description in multiple
  languages
- **btnText** (internationalizedArrayString) - Button text in multiple languages
- **link** (string) - Relative URL path (validated with regex
  `/^\/[a-zA-Z0-9\-]*$/`)
  - Examples: `/volunteer`, `/payment`, `/donors-partners`
- **imageUrl** (image) - Card image with hotspot support (400x400px recommended)

#### Validation:

- All language fields are required and validated for all languages
- Link must be a valid path starting with `/`
- Image is required

#### Preview:

Displays card title and image in Sanity Studio

---

### 2. `help-section-schema.ts`

**Type:** Document schema **Purpose:** Main document that contains the help
section configuration

#### Fields:

- **badge_text** (internationalizedArrayString) - Section badge (e.g., "HOW YOU
  CAN HELP")
- **title** (internationalizedArrayString) - Section main title
- **description** (internationalizedArrayText) - Section description with quote
- **cta_button_text** (internationalizedArrayString) - "Contact Us" button text
- **help_items** (array) - Array of help_section_item objects
  - Min: 1 item (required)
  - Max: 5 items
- **stat_1_value** (string) - First statistic value (e.g., "100%")
- **stat_1_label** (internationalizedArrayString) - First stat label (e.g.,
  "Dedicated")
- **stat_2_value** (string) - Second statistic value (e.g., "Impactful")
- **stat_2_label** (internationalizedArrayString) - Second stat label (e.g.,
  "Mission")

#### Validation:

- All multi-language fields validated for all supported languages
- Help items must have at least 1 and at most 5 cards
- All stats are required

#### Preview:

Displays as "Help Section" in Sanity Studio

---

## Integration

Both schemas have been: ✅ Created in `src/sanity/schemaTypes/home/` ✅ Imported
in `src/sanity/schemaTypes/index.ts` ✅ Added to the schema types array ✅
Validated for TypeScript errors (all pass)

## Usage in Sanity Studio

1. Navigate to the Studio
2. Create a new document of type "Home Help Section"
3. Fill in all required fields (badge, title, description, CTA button)
4. Add 1-5 help cards with:
   - Title, description, button text (in all languages)
   - Link path (e.g., `/volunteer`)
   - Card image
5. Add statistics (value and label pairs)
6. Publish the document

## Data Structure Example

```typescript
{
  badge_text: [{ value: "HOW YOU CAN HELP", _type: "internationalizedArrayStringValue", _key: "en" }],
  title: [{ value: "Give a helping hand for needy people", _type: "internationalizedArrayStringValue", _key: "en" }],
  description: [{ value: "Your donation today helps...", _type: "internationalizedArrayTextValue", _key: "en" }],
  cta_button_text: [{ value: "CONTACT US", _type: "internationalizedArrayStringValue", _key: "en" }],
  help_items: [
    {
      name: [{ value: "Become a Volunteer", _type: "internationalizedArrayStringValue", _key: "en" }],
      content: [{ value: "Join our mission to transform lives...", _type: "internationalizedArrayTextValue", _key: "en" }],
      btnText: [{ value: "Join as Volunteer", _type: "internationalizedArrayStringValue", _key: "en" }],
      link: "/volunteer",
      imageUrl: { asset: { _ref: "image-..." } }
    }
    // ... more items
  ],
  stat_1_value: "100%",
  stat_1_label: [{ value: "Dedicated", _type: "internationalizedArrayStringValue", _key: "en" }],
  stat_2_value: "Impactful",
  stat_2_label: [{ value: "Mission", _type: "internationalizedArrayStringValue", _key: "en" }]
}
```

## Notes

- Uses internationalization pattern
  (internationalizedArrayString/internationalizedArrayText) consistent with
  other Anepal schemas
- Link validation ensures proper URL format
- Image hotspot enabled for better image cropping control in Studio
- Supports up to 5 help cards (easily modifiable in schema)
- All schemas follow Anepal Foundation naming conventions
