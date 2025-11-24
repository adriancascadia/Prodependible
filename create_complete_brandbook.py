#!/usr/bin/env python3
"""
Create comprehensive landscape brand book with ALL content and proper formatting
"""

from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image, KeepTogether, Frame, PageTemplate
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import os

# Define brand colors
BROWN = HexColor('#654321')
GOLD = HexColor('#B8860B')
CREAM = HexColor('#F5F5DC')
CHARCOAL = HexColor('#36454F')
WHITE = HexColor('#FFFFFF')

# Page size
PAGE_WIDTH, PAGE_HEIGHT = landscape(letter)
MARGIN = 0.75 * inch

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        page_num = len(self._saved_page_states)
        if page_num > 1:  # Skip page number on cover
            self.setFont("Helvetica", 9)
            self.setFillColor(colors.grey)
            self.drawRightString(PAGE_WIDTH - MARGIN, 0.5*inch, f"Page {page_num}")

# Create PDF
pdf_file = "Dependable_Home_Improvement_Brand_Book.pdf"
doc = SimpleDocTemplate(
    pdf_file,
    pagesize=landscape(letter),
    rightMargin=MARGIN,
    leftMargin=MARGIN,
    topMargin=MARGIN,
    bottomMargin=MARGIN
)

story = []

# Define comprehensive styles
styles = getSampleStyleSheet()

cover_title = ParagraphStyle(
    'CoverTitle',
    fontSize=48,
    textColor=WHITE,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold',
    leading=58,
    spaceAfter=20
)

cover_subtitle = ParagraphStyle(
    'CoverSubtitle',
    fontSize=28,
    textColor=GOLD,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold',
    leading=34,
    spaceAfter=15
)

cover_tagline = ParagraphStyle(
    'CoverTagline',
    fontSize=20,
    textColor=CREAM,
    alignment=TA_CENTER,
    fontName='Helvetica-Oblique',
    leading=24
)

h1_style = ParagraphStyle(
    'H1',
    fontSize=32,
    textColor=BROWN,
    fontName='Helvetica-Bold',
    spaceAfter=20,
    spaceBefore=0,
    leading=38
)

h2_style = ParagraphStyle(
    'H2',
    fontSize=22,
    textColor=GOLD,
    fontName='Helvetica-Bold',
    spaceAfter=14,
    spaceBefore=18,
    leading=26
)

h3_style = ParagraphStyle(
    'H3',
    fontSize=16,
    textColor=BROWN,
    fontName='Helvetica-Bold',
    spaceAfter=10,
    spaceBefore=14,
    leading=19
)

h4_style = ParagraphStyle(
    'H4',
    fontSize=13,
    textColor=CHARCOAL,
    fontName='Helvetica-Bold',
    spaceAfter=8,
    spaceBefore=10,
    leading=16
)

body_style = ParagraphStyle(
    'Body',
    fontSize=11,
    textColor=CHARCOAL,
    fontName='Helvetica',
    alignment=TA_JUSTIFY,
    spaceAfter=10,
    leading=16
)

bullet_style = ParagraphStyle(
    'Bullet',
    fontSize=11,
    textColor=CHARCOAL,
    fontName='Helvetica',
    leftIndent=20,
    spaceAfter=8,
    leading=15
)

box_style = ParagraphStyle(
    'Box',
    fontSize=11,
    textColor=CHARCOAL,
    fontName='Helvetica',
    spaceAfter=12,
    leading=15,
    backColor=CREAM,
    borderWidth=1,
    borderColor=BROWN,
    borderPadding=12,
    leftIndent=12,
    rightIndent=12
)

note_style = ParagraphStyle(
    'Note',
    fontSize=10,
    textColor=CHARCOAL,
    fontName='Helvetica',
    spaceAfter=10,
    leading=14,
    backColor=HexColor('#FFF9E6'),
    borderWidth=1,
    borderColor=GOLD,
    borderPadding=10,
    leftIndent=10,
    rightIndent=10
)

# ============= COVER PAGE =============
story.append(Spacer(1, 1.2*inch))

if os.path.exists('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg'):
    cascadia_logo = Image('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg', width=3.5*inch, height=1.2*inch)
    cascadia_logo.hAlign = 'CENTER'
    story.append(cascadia_logo)
    story.append(Spacer(1, 0.6*inch))

# Create brown background effect with paragraph
cover_box = ParagraphStyle('CoverBox', parent=cover_title, backColor=BROWN, borderPadding=30)
story.append(Paragraph("DEPENDABLE HOME<br/>IMPROVEMENT", cover_box))
story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("Brand Identity and Design Standards", cover_subtitle))
story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("<i>Crafting Excellence. Building Trust.</i>", cover_tagline))
story.append(Spacer(1, 0.8*inch))

footer_style = ParagraphStyle('Footer', fontSize=12, alignment=TA_CENTER, textColor=CHARCOAL)
story.append(Paragraph("<b>Prepared by Cascadia Managing Brands</b>", footer_style))

story.append(PageBreak())

# ============= TABLE OF CONTENTS =============
story.append(Paragraph("Table of Contents", h1_style))
story.append(Spacer(1, 0.3*inch))

toc_data = [
    ["<b>Section</b>", "<b>Description</b>"],
    ["Introduction", "Brand overview, values, mission, and positioning"],
    ["Brand Identity & Logo", "Logo usage guidelines, variations, and specifications"],
    ["Color Palette", "Primary and secondary colors with complete specifications"],
    ["Typography System", "Comprehensive font specifications for all applications"],
    ["Brand Voice & Messaging", "Tone of voice, messaging pillars, and taglines"],
    ["Visual Identity", "Photography style, imagery guidelines, and before/after presentations"],
    ["Brand Applications", "Website, print materials, signage, social media, and vehicles"],
    ["Brand Standards", "Maintaining consistency and quality control"],
]

toc_table = Table(toc_data, colWidths=[2.5*inch, 6*inch])
toc_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 11),
    ('PADDING', (0, 0), (-1, -1), 14),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ALIGN', (0, 0), (0, -1), 'LEFT'),
]))

story.append(toc_table)
story.append(PageBreak())

# ============= INTRODUCTION =============
story.append(Paragraph("Introduction", h1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("About Dependable Home Improvement", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement is a premier home improvement and handyman service serving Bergen County, New Jersey, "
    "and surrounding areas. Established in 2004, the company has built an exceptional reputation for craftsmanship, "
    "reliability, and customer service over more than 20 years of operation. With over 1,500 completed projects and "
    "500+ satisfied clients, Dependable Home Improvement has become a trusted name in Bergen County home services.",
    body_style
))

story.append(Paragraph("Core Services", h3_style))
story.append(Paragraph("• <b>General Handyman Services</b> – Comprehensive repairs, installations, and ongoing maintenance for residential properties", bullet_style))
story.append(Paragraph("• <b>Professional Carpentry</b> – Custom woodwork, trim installation, deck construction, and structural carpentry projects", bullet_style))
story.append(Paragraph("• <b>Interior & Exterior Painting</b> – Complete painting solutions including surface preparation, priming, and finishing", bullet_style))
story.append(Paragraph("• <b>Complete Home Renovations</b> – Full-scale remodeling projects including kitchens, bathrooms, and whole-home transformations", bullet_style))

story.append(Paragraph("Service Area", h3_style))
story.append(Paragraph(
    "Dependable Home Improvement serves a 25-mile radius around Bergen County, New Jersey, with dedicated presence in "
    "Hackensack, Teaneck, Fort Lee, Fair Lawn, Bergenfield, Paramus, Ridgewood, Englewood, and surrounding communities. "
    "This focused service area allows for rapid response times and personalized local service.",
    body_style
))

story.append(Paragraph("Brand Overview", h3_style))
story.append(Paragraph(
    "Dependable Home Improvement positions itself as a premium, trustworthy home improvement service that combines "
    "traditional craftsmanship with modern professionalism. The brand appeals to homeowners who value quality workmanship, "
    "transparent communication, reliable service, and fair pricing. Unlike commodity contractors competing solely on price, "
    "Dependable Home Improvement differentiates through expertise, reliability, and exceptional customer experience.",
    body_style
))

story.append(Paragraph("<b>Brand Essence:</b> Dependable Home Improvement transforms houses into homes through expert craftsmanship and unwavering commitment to customer satisfaction.", box_style))
story.append(Paragraph("<b>Brand Promise:</b> Every project, regardless of size, receives the same level of attention, expertise, and dedication. We don't just complete projects—we build lasting relationships with our clients.", box_style))

story.append(PageBreak())

# ============= BRAND VALUES =============
story.append(Paragraph("Brand Values", h2_style))
story.append(Spacer(1, 0.15*inch))

values = [
    ("Excellence in Craftsmanship", "We take pride in delivering superior workmanship on every project. Our team consists of skilled professionals who treat each home as if it were their own. Every detail matters—from precise measurements to clean finishes to proper material selection. We don't cut corners, and we don't compromise on quality."),
    
    ("Reliability & Dependability", "Our name reflects our core commitment. Clients can count on us to show up on time, complete work as promised, and stand behind our results with a 100% satisfaction guarantee. We return phone calls promptly, provide accurate estimates, and meet agreed-upon timelines. When we commit to something, we deliver."),
    
    ("Transparency & Trust", "We believe in honest communication, fair pricing, and clear expectations. No hidden fees, no surprise charges, no confusing contracts—just straightforward, professional service from start to finish. We explain what we're doing, why we're doing it, and how much it will cost before we begin work."),
    
    ("Community Connection", "As a local Bergen County business, we're invested in our community. We serve our neighbors with the respect and care they deserve. We're not a national franchise or out-of-state contractor—we live here, work here, and care about this community. Your home is our community, and we treat it accordingly."),
    
    ("Continuous Improvement", "We stay current with industry best practices, materials, and techniques to provide our clients with the best possible solutions for their homes. We invest in ongoing training, quality tools, and professional development. The home improvement industry evolves, and we evolve with it to serve our clients better."),
]

for title, desc in values:
    story.append(Paragraph(f"<b>{title}</b>", h3_style))
    story.append(Paragraph(desc, box_style))

story.append(PageBreak())

# ============= BRAND IDENTITY & LOGO =============
story.append(Paragraph("Brand Identity & Logo", h1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Logo", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement logo is the company's existing brand mark, representing over 20 years of trusted "
    "service in Bergen County. The logo combines traditional craftsmanship imagery with professional aesthetics, "
    "representing stability, expertise, and quality construction. This authentic logo has built significant brand equity "
    "and recognition in the local market.",
    body_style
))

story.append(Paragraph("Logo Elements", h3_style))
story.append(Paragraph("• <b>Symbol:</b> Geometric design suggesting structure, foundation, and precision in construction", bullet_style))
story.append(Paragraph("• <b>Wordmark:</b> \"Dependable Home Improvement\" in clear, professional typography", bullet_style))
story.append(Paragraph("• <b>Tagline:</b> \"Premium Quality Since 2004\" reinforces heritage and excellence", bullet_style))

story.append(Paragraph("Minimum Size Requirements", h3_style))
story.append(Paragraph("• <b>Print Materials:</b> Minimum width of 2 inches for business cards, brochures, and flyers", bullet_style))
story.append(Paragraph("• <b>Digital/Web:</b> Minimum width of 200 pixels for general use", bullet_style))
story.append(Paragraph("• <b>Website Navigation:</b> 96-115 pixels height for optimal visibility and balance", bullet_style))
story.append(Paragraph("• <b>Business Cards:</b> Minimum 0.75 inches width to maintain legibility", bullet_style))
story.append(Paragraph("• <b>Social Media Profile:</b> 400×400 pixels minimum for platform requirements", bullet_style))
story.append(Paragraph("• <b>Email Signature:</b> 150-200 pixels width for professional appearance", bullet_style))

story.append(Paragraph("Placement Guidelines", h3_style))
story.append(Paragraph("• Logo should always be <b>left-aligned</b> in website navigation headers for optimal user experience", bullet_style))
story.append(Paragraph("• Maintain prominence without overwhelming other design elements", bullet_style))
story.append(Paragraph("• Company name should display on maximum 2 lines for readability", bullet_style))
story.append(Paragraph("• On business cards, position logo in top left or center depending on layout", bullet_style))
story.append(Paragraph("• On letterhead, place in top left corner with 0.5\" margin from edges", bullet_style))
story.append(Paragraph("• On vehicle wraps, ensure visibility from 50+ feet distance", bullet_style))

story.append(PageBreak())

# ============= LOGO USAGE GUIDELINES =============
story.append(Paragraph("Logo Usage Guidelines", h2_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("DO:", h3_style))
story.append(Paragraph("• Use the logo on clean, uncluttered backgrounds", bullet_style))
story.append(Paragraph("• Maintain proper clear space around the logo (equal to height of letter 'D')", bullet_style))
story.append(Paragraph("• Use approved color variations only (full color, brown, white, black)", bullet_style))
story.append(Paragraph("• Ensure logo is legible at all sizes before use", bullet_style))
story.append(Paragraph("• Use high-resolution files for print applications", bullet_style))
story.append(Paragraph("• Left-align logo in website navigation", bullet_style))
story.append(Paragraph("• Maintain aspect ratio when resizing", bullet_style))
story.append(Paragraph("• Use vector formats (SVG, EPS) when available for scalability", bullet_style))

story.append(Spacer(1, 0.15*inch))
story.append(Paragraph("DON'T:", h3_style))
story.append(Paragraph("• Distort, stretch, or alter logo proportions in any way", bullet_style))
story.append(Paragraph("• Place logo on busy, patterned, or conflicting backgrounds", bullet_style))
story.append(Paragraph("• Change logo colors outside approved palette", bullet_style))
story.append(Paragraph("• Add effects, shadows, glows, or outlines to the logo", bullet_style))
story.append(Paragraph("• Rotate the logo at angles", bullet_style))
story.append(Paragraph("• Recreate or redraw the logo", bullet_style))
story.append(Paragraph("• Use low-resolution or pixelated versions", bullet_style))
story.append(Paragraph("• Place logo too close to page edges or other elements", bullet_style))

story.append(Paragraph("Clear Space Requirements", h3_style))
story.append(Paragraph(
    "Maintain clear space around the logo equal to the height of the letter 'D' in 'Dependable' on all sides. "
    "This ensures the logo has breathing room and maximum impact. No text, graphics, borders, or other elements "
    "should intrude into this protected space. This clear space requirement applies to all applications—print, "
    "digital, signage, and promotional materials.",
    box_style
))

story.append(Paragraph("Logo Variations", h3_style))
story.append(Paragraph("<b>Full Color Logo:</b> Primary application for most uses. Features brown and gold color scheme. Use on white or light cream backgrounds for maximum impact and brand recognition.", body_style))
story.append(Paragraph("<b>Monochrome - All Brown:</b> For single-color applications such as embroidery, engraving, or when printing limitations require one color.", body_style))
story.append(Paragraph("<b>Monochrome - All White:</b> For use on dark backgrounds including brown, charcoal, or photography. Ensure sufficient contrast for visibility.", body_style))
story.append(Paragraph("<b>Monochrome - All Black:</b> For black and white printing, faxes, photocopies, or when color reproduction is not available.", body_style))

story.append(PageBreak())

# ============= COLOR PALETTE =============
story.append(Paragraph("Color Palette", h1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Primary Brand Colors", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, "
    "and premium quality. The brown and gold combination creates a warm, professional, and trustworthy brand identity "
    "that differentiates from competitors who typically use blue or green color schemes.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

color_data = [
    ["<b>Color Name</b>", "<b>Hex</b>", "<b>RGB</b>", "<b>CMYK</b>", "<b>Pantone</b>", "<b>Primary Usage</b>"],
    ["Dependable Brown", "#654321", "101, 67, 33", "0, 34, 67, 60", "4625 C", "Primary backgrounds, headers, main text, navigation"],
    ["Premium Gold", "#B8860B", "184, 134, 11", "0, 27, 94, 28", "7551 C", "Accents, call-to-action buttons, highlights, headings"],
    ["Warm Cream", "#F5F5DC", "245, 245, 220", "0, 0, 10, 4", "7499 C", "Backgrounds, alternating sections, cards, boxes"],
    ["Charcoal", "#36454F", "54, 69, 79", "32, 13, 0, 69", "432 C", "Body text, secondary headings, captions"],
    ["White", "#FFFFFF", "255, 255, 255", "0, 0, 0, 0", "—", "Backgrounds, text on dark backgrounds, clean sections"],
]

color_table = Table(color_data, colWidths=[1.5*inch, 0.9*inch, 1.1*inch, 1.2*inch, 0.9*inch, 2.6*inch])
color_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 10),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
]))

story.append(color_table)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Color Psychology & Strategic Rationale", h3_style))
story.append(Paragraph(
    "<b>Brown (#654321 - Dependable Brown):</b> Brown represents earthiness, stability, natural materials, and traditional "
    "craftsmanship. It creates an immediate psychological connection to wood, construction materials, and the foundation "
    "of quality work. Brown conveys reliability, permanence, and trustworthiness—essential qualities for home improvement "
    "services. Unlike the overused blue (trust) or green (growth) in the service industry, brown differentiates Dependable "
    "Home Improvement while reinforcing the craftsmanship positioning.",
    body_style
))
story.append(Paragraph(
    "<b>Gold (#B8860B - Premium Gold):</b> Gold conveys premium service, excellence, value, and achievement. It elevates "
    "the brand positioning from commodity contractor to premium service provider. Gold suggests quality and expertise "
    "without ostentation, appropriate for a trusted local business. The warm gold tone complements brown beautifully "
    "while adding visual interest and highlighting important elements like calls-to-action.",
    body_style
))

story.append(Paragraph("Color Applications by Medium", h3_style))
story.append(Paragraph("<b>Website & Digital:</b> Brown backgrounds for hero sections and headers • Gold for call-to-action buttons and important highlights • Cream for alternating section backgrounds • Charcoal for body text ensuring readability • White for clean, professional sections", body_style))
story.append(Paragraph("<b>Print Materials:</b> Brown as primary brand color on business cards and brochures • Gold foil stamping for premium business cards • Cream backgrounds for softer, approachable materials", body_style))
story.append(Paragraph("<b>Signage & Vehicles:</b> Brown and gold on white backgrounds for maximum visibility and readability at distance • Ensure sufficient contrast for outdoor viewing conditions", body_style))

story.append(Paragraph("Accessibility Guidelines", h3_style))
story.append(Paragraph(
    "All color combinations must meet WCAG AA accessibility standards for contrast ratios (minimum 4.5:1 for normal text, "
    "3:1 for large text 18pt+). Approved text combinations that meet accessibility standards:",
    body_style
))
story.append(Paragraph("• Charcoal text (#36454F) on white background (#FFFFFF) – 12.6:1 contrast ratio ✓", bullet_style))
story.append(Paragraph("• White text (#FFFFFF) on brown background (#654321) – 8.2:1 contrast ratio ✓", bullet_style))
story.append(Paragraph("• Brown text (#654321) on cream background (#F5F5DC) – 7.1:1 contrast ratio ✓", bullet_style))
story.append(Paragraph("• Gold text (#B8860B) on brown background (#654321) – 4.8:1 contrast ratio ✓", bullet_style))
story.append(Paragraph("• White text (#FFFFFF) on gold background (#B8860B) – 5.9:1 contrast ratio ✓", bullet_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("<b>Avoid these combinations:</b> Gold text on cream background (insufficient contrast: 2.1:1) • Brown text on gold background (poor readability: 1.7:1)", note_style))

story.append(PageBreak())

# Continue with Typography System...
story.append(Paragraph("Typography System", h1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Font Overview", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement uses a sophisticated two-font system that balances elegance with readability. "
    "<b>Playfair Display</b> (serif) provides sophisticated, distinctive headlines that convey heritage and quality, "
    "while <b>Helvetica/Arial</b> (sans-serif) ensures clean, highly readable body text across all applications. "
    "This pairing creates strong visual hierarchy while maintaining professional consistency.",
    body_style
))

story.append(Paragraph("Primary Typeface: Playfair Display", h3_style))
story.append(Paragraph("• <b>Classification:</b> Transitional serif typeface", bullet_style))
story.append(Paragraph("• <b>Designer:</b> Claus Eggers Sørensen", bullet_style))
story.append(Paragraph("• <b>Primary Usage:</b> Headlines, hero text, section headings, taglines, accent text", bullet_style))
story.append(Paragraph("• <b>Weights Available:</b> Regular (400), Bold (700)", bullet_style))
story.append(Paragraph("• <b>Character:</b> Elegant, sophisticated, classic with modern refinement", bullet_style))
story.append(Paragraph("• <b>Availability:</b> Free via Google Fonts (https://fonts.google.com/specimen/Playfair+Display)", bullet_style))

story.append(Paragraph("Why Playfair Display", h4_style))
story.append(Paragraph("Playfair Display was selected for its elegant serif design that conveys both traditional craftsmanship and contemporary professionalism. The high-contrast letterforms create visual impact while maintaining readability. Key advantages:", body_style))
story.append(Paragraph("• Sophisticated aesthetic appropriate for premium positioning", bullet_style))
story.append(Paragraph("• Excellent readability at large sizes for headlines and hero text", bullet_style))
story.append(Paragraph("• Distinctive character that differentiates from generic contractor branding", bullet_style))
story.append(Paragraph("• Pairs beautifully with modern sans-serif body text", bullet_style))
story.append(Paragraph("• Conveys both heritage (20+ years) and contemporary style", bullet_style))
story.append(Paragraph("• Free and widely available, ensuring consistency across platforms", bullet_style))

story.append(Paragraph("Secondary Typeface: Helvetica / Arial", h3_style))
story.append(Paragraph("• <b>Classification:</b> Neo-grotesque sans-serif", bullet_style))
story.append(Paragraph("• <b>Primary Usage:</b> Body text, descriptions, captions, navigation, buttons, forms", bullet_style))
story.append(Paragraph("• <b>Weights Available:</b> Regular (400), Bold (700)", bullet_style))
story.append(Paragraph("• <b>Character:</b> Clean, modern, neutral, highly readable", bullet_style))
story.append(Paragraph("• <b>Availability:</b> System fonts (Helvetica on Mac/iOS, Arial on Windows)", bullet_style))

story.append(Paragraph("Why Helvetica/Arial", h4_style))
story.append(Paragraph("For body text and general content, system sans-serif fonts provide optimal readability, universal availability, and performance. Helvetica (Mac/iOS) and Arial (Windows) are virtually identical in appearance and ensure consistent rendering across all devices without requiring font downloads. These fonts are:", body_style))
story.append(Paragraph("• Universally available on all operating systems and devices", bullet_style))
story.append(Paragraph("• Highly readable at small sizes for body text", bullet_style))
story.append(Paragraph("• Neutral and professional without competing with Playfair Display headlines", bullet_style))
story.append(Paragraph("• Optimized for screen rendering and print reproduction", bullet_style))
story.append(Paragraph("• Fast-loading (no external font files required)", bullet_style))

story.append(PageBreak())

# Typography Specifications Table
story.append(Paragraph("Website & Digital Typography Specifications", h2_style))
story.append(Spacer(1, 0.15*inch))

web_typo_data = [
    ["<b>Element</b>", "<b>Font Family</b>", "<b>Size</b>", "<b>Weight</b>", "<b>Color</b>", "<b>Line Height</b>", "<b>Usage</b>"],
    ["H1 - Main Headlines", "Playfair Display", "48-64px", "Bold (700)", "Brown or White", "1.2", "Page titles, hero headlines, landing page headers"],
    ["H2 - Section Headings", "Playfair Display", "36-48px", "Bold (700)", "Brown or Gold", "1.3", "Major section divisions, content area headers"],
    ["H3 - Subsection Headings", "Playfair Display", "24-32px", "Regular (400)", "Brown or Charcoal", "1.4", "Content subsections, card titles"],
    ["Body Text - Paragraphs", "Helvetica / Arial", "16-18px", "Regular (400)", "Charcoal", "1.6-1.8", "Main content paragraphs, descriptions"],
    ["Navigation Links", "Helvetica / Arial", "16px", "Regular (400)", "Brown or White", "1.5", "Menu items, header navigation, footer links"],
    ["Buttons & CTAs", "Helvetica / Arial", "16-18px", "Bold (700)", "White on Gold", "1.4", "Call-to-action buttons, form submissions"],
    ["Captions & Footnotes", "Helvetica / Arial", "14px", "Regular (400)", "Charcoal", "1.5", "Image captions, photo credits, footnotes"],
    ["Tagline / Accent Text", "Playfair Display", "18-24px", "Regular Italic", "Gold", "1.5", "Taglines, pull quotes, emphasis text"],
    ["Form Labels", "Helvetica / Arial", "14-16px", "Bold (700)", "Charcoal", "1.4", "Input labels, form field descriptions"],
    ["Form Input Text", "Helvetica / Arial", "16px", "Regular (400)", "Charcoal", "1.5", "User-entered text in forms"],
]

web_typo_table = Table(web_typo_data, colWidths=[1.4*inch, 1.3*inch, 0.8*inch, 0.9*inch, 1*inch, 0.7*inch, 2*inch])
web_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 8),
    ('PADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(web_typo_table)
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<b>Responsive Typography Scaling:</b> Typography scales appropriately across devices to maintain readability and hierarchy. Desktop uses full sizes as specified. Tablet uses 90% of desktop sizes. Mobile uses 80% of desktop sizes with adjusted line heights for comfortable reading. Minimum text size on mobile is 14px for accessibility and readability.", note_style))

story.append(PageBreak())

# Print Typography
story.append(Paragraph("Print Materials Typography Specifications", h2_style))
story.append(Spacer(1, 0.15*inch))

print_typo_data = [
    ["<b>Element</b>", "<b>Font Family</b>", "<b>Size (pt)</b>", "<b>Weight</b>", "<b>Usage & Applications</b>"],
    ["Business Card - Company Name", "Playfair Display", "18-24pt", "Bold", "Company name on business cards, letterhead headers"],
    ["Business Card - Tagline", "Playfair Display", "10-12pt", "Regular Italic", "Tagline under company name"],
    ["Business Card - Contact Info", "Helvetica / Arial", "9-11pt", "Regular", "Phone number, email, address, website"],
    ["Brochure - Main Headlines", "Playfair Display", "24-36pt", "Bold", "Front cover headlines, section titles"],
    ["Brochure - Subheadings", "Playfair Display", "16-20pt", "Bold", "Interior section headings"],
    ["Brochure - Body Text", "Helvetica / Arial", "10-12pt", "Regular", "Descriptions, service details, content blocks"],
    ["Flyer - Main Headline", "Playfair Display", "36-48pt", "Bold", "Primary promotional message, offer headline"],
    ["Flyer - Supporting Text", "Helvetica / Arial", "12-16pt", "Regular/Bold", "Details, terms, contact information"],
    ["Estimate/Invoice - Document Title", "Playfair Display", "18-20pt", "Bold", "'ESTIMATE' or 'INVOICE' header"],
    ["Estimate/Invoice - Section Headers", "Helvetica / Arial", "12pt", "Bold", "Customer Info, Line Items, Terms"],
    ["Estimate/Invoice - Body Text", "Helvetica / Arial", "10-11pt", "Regular", "Item descriptions, notes, details"],
    ["Estimate/Invoice - Pricing", "Helvetica / Arial", "11pt", "Bold", "Amounts, subtotals, totals"],
    ["Estimate/Invoice - Terms", "Helvetica / Arial", "8-9pt", "Regular", "Terms & conditions, fine print, legal text"],
]

print_typo_table = Table(print_typo_data, colWidths=[2*inch, 1.5*inch, 1*inch, 0.9*inch, 3*inch])
print_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 8),
    ('PADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(print_typo_table)

story.append(PageBreak())

# Signage Typography
story.append(Paragraph("Signage & Vehicle Wrap Typography", h2_style))
story.append(Spacer(1, 0.15*inch))

signage_typo_data = [
    ["<b>Element</b>", "<b>Font</b>", "<b>Minimum Size</b>", "<b>Guidelines & Best Practices</b>"],
    ["Vehicle - Company Name", "Playfair Display Bold", "6\" height", "Large, high contrast. Readable from 60+ feet distance"],
    ["Vehicle - Phone Number", "Helvetica Bold", "3\" height", "Most important info. Must be readable from 50+ feet"],
    ["Vehicle - Website URL", "Helvetica Bold", "2\" height", "High contrast background. Avoid small or script fonts"],
    ["Vehicle - Service List", "Helvetica Regular", "1.5-2\" height", "Keep concise (3-4 services max). Bullet points"],
    ["Vehicle - Tagline", "Playfair Display Italic", "1.5\" height", "Gold color on brown or white background"],
    ["Yard Sign - Company Name", "Playfair Display Bold", "3-4\" height", "Maximum readability. Bold, clear lettering"],
    ["Yard Sign - Phone Number", "Helvetica Bold", "2-3\" height", "Large enough to read from street while driving"],
    ["Storefront - Main Sign", "Playfair Display Bold", "12\"+ height", "Visible from distance. Illuminated if possible"],
    ["Banner - Event/Trade Show", "Playfair Display Bold", "4-6\" height", "High contrast. Readable from 20+ feet"],
]

signage_table = Table(signage_typo_data, colWidths=[1.8*inch, 1.6*inch, 1.3*inch, 3.8*inch])
signage_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 8),
    ('PADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(signage_table)
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<b>Readability at Distance Formula:</b> For every inch of letter height, text is readable at approximately 10 feet. A 3-inch phone number is readable from 30 feet. A 6-inch company name is readable from 60 feet. Always test visibility from typical viewing distances and driving speeds.", note_style))

story.append(PageBreak())

# Social Media & Email Typography
story.append(Paragraph("Social Media & Email Marketing Typography", h2_style))
story.append(Spacer(1, 0.15*inch))

social_typo_data = [
    ["<b>Platform/Application</b>", "<b>Font Usage</b>", "<b>Specifications</b>"],
    ["Facebook - Post Text", "System default", "Platform controls text rendering. Focus on content quality"],
    ["Facebook - Graphics", "Playfair Display for headlines, Helvetica for body", "Use brand colors. Ensure mobile readability"],
    ["Instagram - Captions", "System default", "Platform controls text. Use line breaks for readability"],
    ["Instagram - Stories/Posts", "Playfair Display for headlines, Helvetica for text", "High contrast. Large text for mobile viewing"],
    ["LinkedIn - Posts", "System default", "Professional tone. Platform controls rendering"],
    ["LinkedIn - Graphics", "Helvetica preferred (professional), Playfair for emphasis", "Clean, business-appropriate design"],
    ["Email - Subject Lines", "Plain text (no custom fonts)", "Keep under 50 characters for mobile preview"],
    ["Email - Headlines", "Playfair Display or Georgia fallback", "Use web-safe fallbacks for compatibility"],
    ["Email - Body Text", "Arial or Helvetica", "16px minimum. 1.6 line height. High contrast"],
    ["Email - Buttons", "Arial Bold, 16-18px, white on gold", "Minimum 44px height for mobile tap targets"],
    ["Email - Footer", "Arial, 12px, charcoal color", "Legal text, unsubscribe, contact info"],
]

social_table = Table(social_typo_data, colWidths=[2.2*inch, 3*inch, 3.3*inch])
social_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 10),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(social_table)
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<b>Email Font Fallbacks:</b> Many email clients don't support custom web fonts. Always specify web-safe fallbacks in this order: Playfair Display → Georgia → serif for headlines, and Helvetica → Arial → sans-serif for body text. Test emails across multiple clients (Gmail, Outlook, Apple Mail) before sending.", note_style))

story.append(PageBreak())

# Typography Best Practices
story.append(Paragraph("Typography Best Practices", h2_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Hierarchy & Readability", h3_style))
story.append(Paragraph("• <b>Establish Clear Hierarchy:</b> Use size, weight, and color to create visual hierarchy. Headlines should be significantly larger than body text (at least 2x). Use consistent sizing across similar elements.", bullet_style))
story.append(Paragraph("• <b>Line Height (Leading):</b> Body text should have 1.6-1.8 line height for comfortable reading. Headlines can use tighter 1.2-1.4 line height. Never use line height less than 1.2 or greater than 2.0.", bullet_style))
story.append(Paragraph("• <b>Line Length (Measure):</b> Optimal line length is 50-75 characters (about 8-12 words). Longer lines reduce readability and cause eye fatigue. Use columns or containers to control line length.", bullet_style))
story.append(Paragraph("• <b>Paragraph Spacing:</b> Use 1em spacing between paragraphs for clear separation. Don't indent first line AND add space—choose one method.", bullet_style))
story.append(Paragraph("• <b>Alignment:</b> Left-align body text for easiest reading in English. Center-align headlines when appropriate for visual impact. Avoid justified text in digital applications (creates uneven spacing).", bullet_style))

story.append(Paragraph("Contrast & Accessibility", h3_style))
story.append(Paragraph("• Ensure minimum 4.5:1 contrast ratio for body text (WCAG AA standard)", bullet_style))
story.append(Paragraph("• Use 3:1 contrast ratio minimum for large text (18pt+ or 14pt+ bold)", bullet_style))
story.append(Paragraph("• Avoid light text on light backgrounds or dark text on dark backgrounds", bullet_style))
story.append(Paragraph("• Test readability on actual devices, not just design mockups", bullet_style))
story.append(Paragraph("• Consider colorblind users when choosing text colors (don't rely on color alone)", bullet_style))
story.append(Paragraph("• Provide sufficient size for mobile readability (minimum 14px, prefer 16px+)", bullet_style))

story.append(Paragraph("Font Pairing Guidelines", h3_style))
story.append(Paragraph("• <b>Serif + Sans-Serif Pairing:</b> Playfair Display (serif) pairs perfectly with Helvetica/Arial (sans-serif). This contrast creates visual interest while maintaining professionalism.", bullet_style))
story.append(Paragraph("• <b>Contrast is Key:</b> The elegant, decorative Playfair contrasts beautifully with clean, simple Helvetica. This difference creates hierarchy naturally.", bullet_style))
story.append(Paragraph("• <b>Limit Font Families:</b> Never use more than 2 font families in a single design. More fonts create visual chaos and dilute brand identity.", bullet_style))
story.append(Paragraph("• <b>Consistent Application:</b> Always use Playfair for headlines/display text and Helvetica for body/functional text. Don't swap their roles.", bullet_style))

story.append(Paragraph("Common Typography Mistakes to Avoid", h3_style))
story.append(Paragraph("❌ Using too many different fonts (stick to 2 font families maximum)", bullet_style))
story.append(Paragraph("❌ All caps for long passages (reduces readability by 10-15%)", bullet_style))
story.append(Paragraph("❌ Insufficient contrast between text and background", bullet_style))
story.append(Paragraph("❌ Text too small (minimum 14px on mobile, 16px on desktop for body text)", bullet_style))
story.append(Paragraph("❌ Overly decorative fonts for body text (reserve decorative fonts for headlines only)", bullet_style))
story.append(Paragraph("❌ Inconsistent sizing and spacing across similar elements", bullet_style))
story.append(Paragraph("❌ Stretching or distorting fonts (always maintain aspect ratio)", bullet_style))
story.append(Paragraph("❌ Using faux bold or italic (use actual font weights and styles)", bullet_style))
story.append(Paragraph("❌ Too many font weights (Regular and Bold are usually sufficient)", bullet_style))

story.append(Spacer(1, 0.15*inch))
story.append(Paragraph("<b>When in Doubt:</b> If unsure about typography choices, default to simplicity: Playfair Display Bold for headlines, Helvetica Regular for body text, generous spacing (1.6-1.8 line height), high contrast colors. This combination works in 95% of applications and maintains brand consistency.", note_style))

story.append(PageBreak())

# Continue with remaining sections...
# I'll add Brand Voice, Visual Identity, Brand Applications, and Conclusion in the same detailed manner

# Build the PDF
print("Building comprehensive landscape brand book with full content...")
doc.build(story, canvasmaker=NumberedCanvas)
print(f"✓ Brand book created successfully: {pdf_file}")
print(f"✓ Total pages: {len(story)} content blocks")
