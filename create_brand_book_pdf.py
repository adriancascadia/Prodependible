#!/usr/bin/env python3
"""
Generate professional PDF brand book for Dependable Home Improvement
"""

from weasyprint import HTML, CSS
from pathlib import Path

# HTML template with professional styling
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dependable Home Improvement - Brand Book</title>
    <style>
        @page {
            size: 8.5in 11in;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        /* Cover Page */
        .cover {
            height: 100vh;
            background: linear-gradient(135deg, #654321 0%, #8B6F47 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 60px;
            page-break-after: always;
        }
        
        .cover-logo {
            width: 200px;
            height: 200px;
            margin-bottom: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
        }
        
        .cover-logo img {
            max-width: 100%;
            max-height: 100%;
        }
        
        .cover h1 {
            font-size: 48pt;
            font-weight: bold;
            margin-bottom: 20px;
            letter-spacing: 2px;
        }
        
        .cover h2 {
            font-size: 32pt;
            font-weight: 300;
            margin-bottom: 60px;
            color: #B8860B;
        }
        
        .cover .tagline {
            font-size: 24pt;
            font-style: italic;
            margin-bottom: 80px;
            color: #F5F5DC;
        }
        
        .cover .cascadia-logo {
            margin-top: auto;
            width: 250px;
        }
        
        .cover .cascadia-logo img {
            width: 100%;
            height: auto;
        }
        
        /* Section Headers */
        .section-header {
            height: 100vh;
            background: #654321;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 60px 80px;
            page-break-after: always;
        }
        
        .section-header h1 {
            font-size: 64pt;
            font-weight: bold;
            margin-bottom: 30px;
        }
        
        .section-header p {
            font-size: 18pt;
            color: #F5F5DC;
            max-width: 600px;
            line-height: 1.8;
        }
        
        /* Content Pages */
        .content-page {
            padding: 60px 80px;
            min-height: 100vh;
            page-break-after: always;
        }
        
        .content-page h2 {
            font-size: 36pt;
            color: #654321;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 4px solid #B8860B;
        }
        
        .content-page h3 {
            font-size: 24pt;
            color: #B8860B;
            margin-top: 40px;
            margin-bottom: 20px;
        }
        
        .content-page h4 {
            font-size: 18pt;
            color: #654321;
            margin-top: 30px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .content-page p {
            font-size: 12pt;
            margin-bottom: 15px;
            text-align: justify;
        }
        
        .content-page ul, .content-page ol {
            margin-left: 30px;
            margin-bottom: 20px;
        }
        
        .content-page li {
            font-size: 12pt;
            margin-bottom: 10px;
        }
        
        /* Color Swatches */
        .color-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin: 30px 0;
        }
        
        .color-swatch {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .color-sample {
            height: 150px;
            width: 100%;
        }
        
        .color-info {
            padding: 20px;
            background: white;
        }
        
        .color-info h4 {
            margin: 0 0 10px 0;
            font-size: 16pt;
        }
        
        .color-info p {
            margin: 5px 0;
            font-size: 10pt;
            text-align: left;
        }
        
        /* Typography Examples */
        .type-example {
            margin: 30px 0;
            padding: 30px;
            background: #F5F5DC;
            border-left: 6px solid #B8860B;
        }
        
        .type-example h3 {
            margin-top: 0;
        }
        
        /* Brand Values */
        .value-box {
            background: #F5F5DC;
            padding: 25px;
            margin: 20px 0;
            border-left: 6px solid #654321;
        }
        
        .value-box h4 {
            color: #654321;
            margin-top: 0;
        }
        
        /* Footer */
        .page-footer {
            position: fixed;
            bottom: 30px;
            right: 80px;
            font-size: 10pt;
            color: #999;
        }
        
        /* Table of Contents */
        .toc {
            padding: 60px 80px;
            min-height: 100vh;
            page-break-after: always;
        }
        
        .toc h2 {
            font-size: 48pt;
            color: #654321;
            margin-bottom: 50px;
        }
        
        .toc-item {
            font-size: 14pt;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        
        .toc-item .title {
            color: #654321;
        }
        
        .toc-item .page {
            color: #B8860B;
        }
        
        /* Do's and Don'ts */
        .dos-donts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        
        .do-box, .dont-box {
            padding: 25px;
            border-radius: 8px;
        }
        
        .do-box {
            background: #E8F5E9;
            border-left: 6px solid #4CAF50;
        }
        
        .dont-box {
            background: #FFEBEE;
            border-left: 6px solid #F44336;
        }
        
        .do-box h4, .dont-box h4 {
            margin-top: 0;
        }
        
        .do-box h4 {
            color: #4CAF50;
        }
        
        .dont-box h4 {
            color: #F44336;
        }
        
        strong {
            color: #654321;
        }
        
        .highlight {
            background: #FFF9E6;
            padding: 2px 6px;
            border-radius: 3px;
        }
    </style>
</head>
<body>

    <!-- COVER PAGE -->
    <div class="cover">
        <div class="cover-logo">
            <img src="dependable-logo.svg" alt="Dependable Home Improvement Logo" />
        </div>
        <h1>DEPENDABLE HOME<br/>IMPROVEMENT</h1>
        <h2>BRAND IDENTITY<br/>AND DESIGN STANDARDS</h2>
        <p class="tagline">Crafting Excellence. Building Trust.</p>
        <div class="cascadia-logo">
            <img src="cascadia-logo.jpg" alt="Cascadia Managing Brands" />
        </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc">
        <h2>Contents</h2>
        <div class="toc-item">
            <span class="title">Introduction</span>
            <span class="page">3</span>
        </div>
        <div class="toc-item">
            <span class="title">Brand Identity</span>
            <span class="page">5</span>
        </div>
        <div class="toc-item">
            <span class="title">Color Palette</span>
            <span class="page">8</span>
        </div>
        <div class="toc-item">
            <span class="title">Typography</span>
            <span class="page">10</span>
        </div>
        <div class="toc-item">
            <span class="title">Brand Voice & Messaging</span>
            <span class="page">12</span>
        </div>
        <div class="toc-item">
            <span class="title">Visual Identity</span>
            <span class="page">15</span>
        </div>
        <div class="toc-item">
            <span class="title">Brand Applications</span>
            <span class="page">17</span>
        </div>
    </div>

    <!-- SECTION: INTRODUCTION -->
    <div class="section-header">
        <h1>Introduction</h1>
        <p>Welcome to the Dependable Home Improvement brand book. This comprehensive guide ensures consistent, professional representation of our brand across all touchpoints.</p>
    </div>

    <div class="content-page">
        <h2>About Dependable Home Improvement</h2>
        
        <p>Dependable Home Improvement is a premier home improvement and handyman service serving Bergen County, New Jersey, and surrounding areas. Established in 2004, the company has built a reputation for exceptional craftsmanship, reliability, and customer service over more than 20 years of operation.</p>
        
        <h3>Core Services</h3>
        <ul>
            <li><strong>General Handyman Services</strong> - Repairs, installations, and maintenance</li>
            <li><strong>Professional Carpentry</strong> - Custom woodwork and structural projects</li>
            <li><strong>Interior & Exterior Painting</strong> - Complete painting solutions</li>
            <li><strong>Complete Home Renovations</strong> - Full-scale remodeling projects</li>
        </ul>
        
        <h3>Service Area</h3>
        <p>Dependable Home Improvement serves a 25-mile radius around Bergen County, with dedicated presence in Hackensack, Teaneck, Fort Lee, Fair Lawn, Bergenfield, Paramus, Ridgewood, and Englewood.</p>
        
        <h3>Brand Overview</h3>
        <p>Dependable Home Improvement positions itself as a premium, trustworthy home improvement service that combines traditional craftsmanship with modern professionalism. The brand appeals to homeowners who value quality workmanship, transparent communication, and reliable service.</p>
        
        <div class="value-box">
            <h4>Brand Essence</h4>
            <p>Dependable Home Improvement transforms houses into homes through expert craftsmanship and unwavering commitment to customer satisfaction.</p>
        </div>
        
        <div class="value-box">
            <h4>Brand Promise</h4>
            <p>Every project, regardless of size, receives the same level of attention, expertise, and dedication. We don't just complete projects—we build lasting relationships with our clients.</p>
        </div>
    </div>

    <div class="content-page">
        <h2>Brand Values</h2>
        
        <div class="value-box">
            <h4>Excellence in Craftsmanship</h4>
            <p>We take pride in delivering superior workmanship on every project. Our team consists of skilled professionals who treat each home as if it were their own.</p>
        </div>
        
        <div class="value-box">
            <h4>Reliability & Dependability</h4>
            <p>Our name reflects our core commitment. Clients can count on us to show up on time, complete work as promised, and stand behind our results with a 100% satisfaction guarantee.</p>
        </div>
        
        <div class="value-box">
            <h4>Transparency & Trust</h4>
            <p>We believe in honest communication, fair pricing, and clear expectations. No hidden fees, no surprises—just straightforward, professional service.</p>
        </div>
        
        <div class="value-box">
            <h4>Community Connection</h4>
            <p>As a local Bergen County business, we're invested in our community. We serve our neighbors with the respect and care they deserve.</p>
        </div>
        
        <div class="value-box">
            <h4>Continuous Improvement</h4>
            <p>We stay current with industry best practices, materials, and techniques to provide our clients with the best possible solutions for their homes.</p>
        </div>
    </div>

    <!-- SECTION: BRAND IDENTITY -->
    <div class="section-header">
        <h1>Brand Identity</h1>
        <p>The visual elements that define Dependable Home Improvement and create instant recognition in the marketplace.</p>
    </div>

    <div class="content-page">
        <h2>Logo</h2>
        
        <p>The Dependable Home Improvement logo features a distinctive design that combines traditional craftsmanship imagery with modern aesthetics. The logo represents stability, expertise, and quality construction.</p>
        
        <h3>Logo Elements</h3>
        <ul>
            <li><strong>Symbol:</strong> Geometric design suggesting structure, foundation, and precision</li>
            <li><strong>Wordmark:</strong> "Dependable Home Improvement" in clear, professional typography</li>
            <li><strong>Tagline:</strong> "Premium Quality Since 2004" reinforces heritage and excellence</li>
        </ul>
        
        <h3>Minimum Size Requirements</h3>
        <ul>
            <li><strong>Print:</strong> Minimum width of 2 inches</li>
            <li><strong>Digital:</strong> Minimum width of 200 pixels</li>
            <li><strong>Navigation:</strong> 96-115 pixels height for optimal visibility</li>
        </ul>
        
        <h3>Placement Guidelines</h3>
        <ul>
            <li>Logo should always be left-aligned in navigation headers</li>
            <li>Maintain prominence without overwhelming other design elements</li>
            <li>Company name should display on maximum 2 lines</li>
        </ul>
    </div>

    <div class="content-page">
        <h2>Logo Usage Guidelines</h2>
        
        <div class="dos-donts">
            <div class="do-box">
                <h4>DO:</h4>
                <ul>
                    <li>Use the logo on clean, uncluttered backgrounds</li>
                    <li>Maintain proper clear space around the logo</li>
                    <li>Use approved color variations only</li>
                    <li>Ensure logo is legible at all sizes</li>
                </ul>
            </div>
            
            <div class="dont-box">
                <h4>DON'T:</h4>
                <ul>
                    <li>Distort, stretch, or alter logo proportions</li>
                    <li>Place logo on busy or conflicting backgrounds</li>
                    <li>Change logo colors outside approved palette</li>
                    <li>Add effects, shadows, or outlines to the logo</li>
                    <li>Rotate the logo at angles</li>
                </ul>
            </div>
        </div>
        
        <h3>Clear Space Requirements</h3>
        <p>Maintain clear space around the logo equal to the height of the letter "D" in "Dependable" on all sides. This ensures the logo has breathing room and maximum impact. No text, graphics, or other elements should intrude into this protected space.</p>
        
        <h3>Logo Variations</h3>
        <ul>
            <li><strong>Full Color Logo:</strong> Primary application for most uses featuring brown and gold color scheme</li>
            <li><strong>All Brown:</strong> For single-color applications</li>
            <li><strong>All White:</strong> For use on dark backgrounds</li>
            <li><strong>All Black:</strong> For black and white printing</li>
        </ul>
    </div>

    <!-- SECTION: COLOR PALETTE -->
    <div class="section-header">
        <h1>Color Palette</h1>
        <p>The brown and gold color scheme conveys reliability, craftsmanship, and premium quality—creating a warm, professional, and trustworthy brand identity.</p>
    </div>

    <div class="content-page">
        <h2>Primary Brand Colors</h2>
        
        <p>The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, and premium quality. The brown and gold combination creates a warm, professional, and trustworthy brand identity.</p>
        
        <div class="color-grid">
            <div class="color-swatch">
                <div class="color-sample" style="background: #654321;"></div>
                <div class="color-info">
                    <h4>Dependable Brown</h4>
                    <p><strong>Hex:</strong> #654321</p>
                    <p><strong>RGB:</strong> 101, 67, 33</p>
                    <p><strong>CMYK:</strong> 0, 34, 67, 60</p>
                    <p><strong>Usage:</strong> Primary backgrounds, headers, main text</p>
                </div>
            </div>
            
            <div class="color-swatch">
                <div class="color-sample" style="background: #B8860B;"></div>
                <div class="color-info">
                    <h4>Premium Gold</h4>
                    <p><strong>Hex:</strong> #B8860B</p>
                    <p><strong>RGB:</strong> 184, 134, 11</p>
                    <p><strong>CMYK:</strong> 0, 27, 94, 28</p>
                    <p><strong>Usage:</strong> Accents, CTAs, highlights, headings</p>
                </div>
            </div>
        </div>
        
        <h3>Color Psychology</h3>
        <p><strong>Brown</strong> represents earthiness, stability, natural materials, and traditional craftsmanship. It creates an immediate connection to wood, construction, and the foundation of quality work.</p>
        
        <p><strong>Gold</strong> conveys premium service, excellence, value, and achievement. It elevates the brand positioning from commodity contractor to premium service provider.</p>
    </div>

    <div class="content-page">
        <h2>Secondary Colors</h2>
        
        <div class="color-grid">
            <div class="color-swatch">
                <div class="color-sample" style="background: #F5F5DC;"></div>
                <div class="color-info">
                    <h4>Warm Cream</h4>
                    <p><strong>Hex:</strong> #F5F5DC</p>
                    <p><strong>RGB:</strong> 245, 245, 220</p>
                    <p><strong>Usage:</strong> Backgrounds, sections, cards</p>
                </div>
            </div>
            
            <div class="color-swatch">
                <div class="color-sample" style="background: #36454F;"></div>
                <div class="color-info">
                    <h4>Charcoal</h4>
                    <p><strong>Hex:</strong> #36454F</p>
                    <p><strong>RGB:</strong> 54, 69, 79</p>
                    <p><strong>Usage:</strong> Body text, secondary headings</p>
                </div>
            </div>
        </div>
        
        <h3>Accessibility Guidelines</h3>
        <p>All color combinations must meet WCAG AA accessibility standards for contrast. Approved text combinations include:</p>
        <ul>
            <li>Charcoal text on white background ✓</li>
            <li>White text on brown background ✓</li>
            <li>Brown text on cream background ✓</li>
            <li>Gold text on brown background ✓</li>
        </ul>
        
        <p><strong>Avoid:</strong> Gold text on cream background (insufficient contrast) and brown text on gold background (poor readability).</p>
    </div>

    <!-- SECTION: TYPOGRAPHY -->
    <div class="section-header">
        <h1>Typography</h1>
        <p>Playfair Display brings elegance and sophistication while maintaining excellent readability across all applications.</p>
    </div>

    <div class="content-page">
        <h2>Primary Typeface</h2>
        
        <div class="type-example">
            <h3 style="font-family: 'Georgia', serif; font-size: 32pt; margin-bottom: 10px;">Playfair Display</h3>
            <p><strong>Classification:</strong> Serif</p>
            <p><strong>Designer:</strong> Claus Eggers Sørensen</p>
            <p><strong>Usage:</strong> Headlines, hero text, section headings</p>
            <p><strong>Weights:</strong> Regular (400), Bold (700)</p>
        </div>
        
        <p>Playfair Display was selected for its elegant serif design that conveys both traditional craftsmanship and contemporary professionalism. The high-contrast letterforms create visual impact while maintaining readability.</p>
        
        <h3>Why Playfair Display</h3>
        <ul>
            <li>Sophisticated aesthetic appropriate for premium positioning</li>
            <li>Excellent readability at large sizes for headlines</li>
            <li>Distinctive character that differentiates from competitors</li>
            <li>Pairs well with modern sans-serif body text</li>
            <li>Conveys both heritage and contemporary style</li>
        </ul>
        
        <h3>Typography Hierarchy</h3>
        <ul>
            <li><strong>H1 - Main Headlines:</strong> Playfair Display Bold, 48-64px (web), 36-48pt (print)</li>
            <li><strong>H2 - Section Headings:</strong> Playfair Display Bold, 36-48px (web), 24-36pt (print)</li>
            <li><strong>H3 - Subsection Headings:</strong> Playfair Display Regular, 24-32px (web), 18-24pt (print)</li>
            <li><strong>Body Text:</strong> System sans-serif, 16-18px (web), 10-12pt (print)</li>
        </ul>
    </div>

    <!-- SECTION: BRAND VOICE -->
    <div class="section-header">
        <h1>Brand Voice<br/>& Messaging</h1>
        <p>Professional yet approachable, confident yet humble, expert yet educational—our voice builds trust and connection.</p>
    </div>

    <div class="content-page">
        <h2>Tone of Voice</h2>
        
        <p>Dependable Home Improvement's brand voice is <strong>professional yet approachable, confident yet humble, expert yet educational</strong>.</p>
        
        <h3>Voice Characteristics</h3>
        
        <div class="value-box">
            <h4>Professional</h4>
            <p>We communicate with the expertise and reliability expected from a 20-year-established business. Our language is clear, precise, and demonstrates deep knowledge of home improvement.</p>
        </div>
        
        <div class="value-box">
            <h4>Approachable</h4>
            <p>We avoid industry jargon and technical language that alienates homeowners. We explain processes clearly and welcome questions without condescension.</p>
        </div>
        
        <div class="value-box">
            <h4>Confident</h4>
            <p>We stand behind our work with a 100% satisfaction guarantee. Our messaging reflects certainty in our capabilities while avoiding arrogance.</p>
        </div>
        
        <div class="value-box">
            <h4>Trustworthy</h4>
            <p>We communicate with honesty and transparency. We set realistic expectations, provide clear timelines, and never make promises we can't keep.</p>
        </div>
        
        <div class="value-box">
            <h4>Educational</h4>
            <p>We position ourselves as helpful advisors, not just service providers. We share knowledge through blog content, how-to guides, and project consultations.</p>
        </div>
    </div>

    <div class="content-page">
        <h2>Brand Messaging Pillars</h2>
        
        <div class="value-box">
            <h4>1. Craftsmanship Excellence</h4>
            <p>"We don't just complete projects—we craft solutions. Every detail matters, every corner is finished properly, and every client receives work we're proud to sign."</p>
        </div>
        
        <div class="value-box">
            <h4>2. Reliability You Can Count On</h4>
            <p>"Our name says it all. When we commit to a timeline, we meet it. When we quote a price, we honor it. When we promise quality, we deliver it."</p>
        </div>
        
        <div class="value-box">
            <h4>3. Transparent Partnership</h4>
            <p>"No hidden fees. No surprise charges. No confusing contracts. Just honest communication, fair pricing, and straightforward service from start to finish."</p>
        </div>
        
        <div class="value-box">
            <h4>4. Local Community Connection</h4>
            <p>"We're your Bergen County neighbors. We live here, work here, and care about this community. Your home is our community, and we treat it accordingly."</p>
        </div>
        
        <div class="value-box">
            <h4>5. Experience That Shows</h4>
            <p>"Twenty years of transforming houses into homes. Over 1,500 completed projects. Hundreds of satisfied clients. Experience you can see in every detail."</p>
        </div>
        
        <h3>Tagline</h3>
        <div class="type-example">
            <h3 style="font-family: 'Georgia', serif; font-size: 28pt; font-style: italic; color: #B8860B;">Crafting Excellence. Building Trust.</h3>
            <p>This tagline encapsulates both the technical expertise (crafting excellence) and the relationship foundation (building trust) that define Dependable Home Improvement.</p>
        </div>
    </div>

    <!-- SECTION: VISUAL IDENTITY -->
    <div class="section-header">
        <h1>Visual Identity</h1>
        <p>Authentic photography and consistent imagery create credibility and showcase real craftsmanship.</p>
    </div>

    <div class="content-page">
        <h2>Photography Style</h2>
        
        <p>Dependable Home Improvement's visual identity relies heavily on authentic project photography that demonstrates real work, real results, and real craftsmanship.</p>
        
        <h3>Photography Principles</h3>
        
        <div class="value-box">
            <h4>Authenticity Over Perfection</h4>
            <p>Use actual project photos rather than stock imagery. Real before/after transformations build more credibility than staged professional photography.</p>
        </div>
        
        <div class="value-box">
            <h4>Well-Lit & Clear</h4>
            <p>All photos should be well-lit with natural or supplemental lighting. Avoid dark, grainy, or unclear images that don't showcase quality work.</p>
        </div>
        
        <div class="value-box">
            <h4>Detail Shots</h4>
            <p>Include close-up photography that highlights craftsmanship details: clean corners, smooth finishes, precise cuts, quality materials.</p>
        </div>
        
        <div class="value-box">
            <h4>Context & Scale</h4>
            <p>Show full room or project views that provide context and help prospects visualize transformations in their own spaces.</p>
        </div>
        
        <h3>Before/After Presentations</h3>
        <p>Before/after galleries are the most powerful marketing tool for home improvement services. Present images side-by-side (not as sliders) for immediate visual comparison. Always label clearly as "BEFORE" and "AFTER" and include project details.</p>
    </div>

    <!-- SECTION: BRAND APPLICATIONS -->
    <div class="section-header">
        <h1>Brand Applications</h1>
        <p>Consistent application across all touchpoints creates a cohesive, professional, and memorable brand experience.</p>
    </div>

    <div class="content-page">
        <h2>Website</h2>
        
        <p>The Dependable Home Improvement website serves as the primary digital presence and lead generation platform.</p>
        
        <h3>Design Principles</h3>
        <ul>
            <li>Clean, professional layout with generous white space</li>
            <li>Brown and gold color scheme throughout</li>
            <li>High-quality project photography prominently featured</li>
            <li>Clear calls-to-action on every page</li>
            <li>Mobile-responsive design for all devices</li>
        </ul>
        
        <h3>Key Elements</h3>
        <ul>
            <li>Video background in hero section showing craftsmanship</li>
            <li>Left-aligned logo (115px) with company name on 2 lines max</li>
            <li>Sticky navigation with smooth scroll transitions</li>
            <li>Multi-language support (English, Russian, Spanish)</li>
            <li>Before/after project gallery with side-by-side layouts</li>
            <li>Interactive service area map</li>
            <li>Multi-step contact form for lead qualification</li>
            <li>Dynamic testimonials with verified badges</li>
            <li>Review platform integration (Angi, Google, BBB)</li>
        </ul>
    </div>

    <div class="content-page">
        <h2>Social Media</h2>
        
        <h3>Platform Presence</h3>
        <ul>
            <li><strong>Facebook:</strong> Community engagement, project showcases</li>
            <li><strong>Instagram:</strong> Visual portfolio, before/afters, behind-the-scenes</li>
            <li><strong>LinkedIn:</strong> Professional network, B2B opportunities</li>
            <li><strong>Yelp:</strong> Reviews and local discovery</li>
        </ul>
        
        <h3>Visual Guidelines</h3>
        <ul>
            <li>Profile images: Dependable Home Improvement logo on white background</li>
            <li>Cover photos: High-quality project photography with brown overlay and gold text</li>
            <li>Post imagery: Consistent brown/gold color treatment</li>
            <li>Branded graphics: Logo in corner, consistent typography</li>
        </ul>
        
        <h2>Print Materials</h2>
        
        <h3>Business Cards</h3>
        <ul>
            <li>Brown background with gold accents</li>
            <li>White text for contact information</li>
            <li>Logo prominently featured</li>
            <li>Premium cardstock with possible gold foil</li>
        </ul>
        
        <h3>Brochures</h3>
        <ul>
            <li>Tri-fold or bi-fold format</li>
            <li>Brown and cream color scheme</li>
            <li>High-quality project photography</li>
            <li>Service descriptions with icons</li>
            <li>Testimonials and credentials</li>
        </ul>
    </div>

    <!-- CONCLUSION -->
    <div class="content-page">
        <h2>Conclusion</h2>
        
        <p>The Dependable Home Improvement brand represents over 20 years of commitment to excellence, reliability, and customer satisfaction. These brand guidelines ensure that every interaction—whether digital, print, or in-person—reinforces the values and quality that have made Dependable Home Improvement a trusted name in Bergen County.</p>
        
        <p>By maintaining consistency in visual identity, messaging, and customer experience, we strengthen brand recognition, build trust, and differentiate Dependable Home Improvement in a competitive marketplace.</p>
        
        <div class="value-box">
            <h4>Remember</h4>
            <p>Every project is a brand ambassador. Every customer interaction is a brand experience. Every material we produce represents our commitment to excellence.</p>
        </div>
        
        <div style="margin-top: 80px; text-align: center;">
            <img src="cascadia-logo.jpg" alt="Cascadia Managing Brands" style="width: 300px; margin-bottom: 20px;" />
            <p style="font-size: 14pt; color: #654321;"><strong>Prepared by Cascadia Managing Brands</strong></p>
            <p style="font-size: 10pt; color: #999; margin-top: 40px;">This brand book is proprietary and confidential. It is provided for the exclusive use of Dependable Home Improvement and authorized partners.</p>
        </div>
    </div>

</body>
</html>
"""

# Write HTML to file
with open('brand_book_temp.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Generate PDF
print("Generating PDF brand book...")
HTML('brand_book_temp.html').write_pdf(
    'Dependable_Home_Improvement_Brand_Book.pdf',
    stylesheets=[CSS(string='@page { size: letter; margin: 0; }')]
)

print("Brand book PDF created successfully!")

# Clean up temp file
Path('brand_book_temp.html').unlink()
