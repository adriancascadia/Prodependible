#!/usr/bin/env python3
"""
Generate professional landscape PDF brand book for Dependable Home Improvement
"""

from weasyprint import HTML, CSS
from pathlib import Path

# HTML template with professional styling in landscape
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dependable Home Improvement - Brand Book</title>
    <style>
        @page {
            size: 11in 8.5in landscape;
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
            width: 180px;
            height: 180px;
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
            font-size: 52pt;
            font-weight: bold;
            margin-bottom: 20px;
            letter-spacing: 3px;
        }
        
        .cover h2 {
            font-size: 36pt;
            font-weight: 300;
            margin-bottom: 50px;
            color: #B8860B;
        }
        
        .cover .tagline {
            font-size: 26pt;
            font-style: italic;
            margin-bottom: 60px;
            color: #F5F5DC;
        }
        
        .cover .cascadia-logo {
            margin-top: auto;
            width: 280px;
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
            padding: 60px 100px;
            page-break-after: always;
        }
        
        .section-header h1 {
            font-size: 72pt;
            font-weight: bold;
            margin-bottom: 30px;
            line-height: 1.1;
        }
        
        .section-header p {
            font-size: 20pt;
            color: #F5F5DC;
            max-width: 700px;
            line-height: 1.8;
        }
        
        /* Content Pages */
        .content-page {
            padding: 50px 80px;
            min-height: 100vh;
            page-break-after: always;
            display: flex;
            flex-direction: column;
        }
        
        .content-page h2 {
            font-size: 38pt;
            color: #654321;
            margin-bottom: 25px;
            padding-bottom: 12px;
            border-bottom: 5px solid #B8860B;
        }
        
        .content-page h3 {
            font-size: 22pt;
            color: #B8860B;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        
        .content-page h4 {
            font-size: 16pt;
            color: #654321;
            margin-top: 25px;
            margin-bottom: 12px;
            font-weight: bold;
        }
        
        .content-page p {
            font-size: 11pt;
            margin-bottom: 12px;
            text-align: justify;
        }
        
        .content-page ul, .content-page ol {
            margin-left: 25px;
            margin-bottom: 15px;
        }
        
        .content-page li {
            font-size: 11pt;
            margin-bottom: 8px;
        }
        
        /* Two Column Layout */
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin: 25px 0;
        }
        
        /* Color Swatches */
        .color-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin: 25px 0;
        }
        
        .color-swatch {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .color-sample {
            height: 120px;
            width: 100%;
        }
        
        .color-info {
            padding: 15px;
            background: white;
        }
        
        .color-info h4 {
            margin: 0 0 8px 0;
            font-size: 14pt;
        }
        
        .color-info p {
            margin: 4px 0;
            font-size: 9pt;
            text-align: left;
        }
        
        /* Typography Examples */
        .type-example {
            margin: 25px 0;
            padding: 25px;
            background: #F5F5DC;
            border-left: 6px solid #B8860B;
        }
        
        .type-example h3 {
            margin-top: 0;
        }
        
        /* Font Specification Table */
        .font-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10pt;
        }
        
        .font-table th {
            background: #654321;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        
        .font-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #ddd;
        }
        
        .font-table tr:nth-child(even) {
            background: #F5F5DC;
        }
        
        /* Brand Values */
        .value-box {
            background: #F5F5DC;
            padding: 20px;
            margin: 15px 0;
            border-left: 6px solid #654321;
        }
        
        .value-box h4 {
            color: #654321;
            margin-top: 0;
        }
        
        .value-box p {
            margin-bottom: 0;
        }
        
        /* Table of Contents */
        .toc {
            padding: 50px 80px;
            min-height: 100vh;
            page-break-after: always;
        }
        
        .toc h2 {
            font-size: 52pt;
            color: #654321;
            margin-bottom: 40px;
        }
        
        .toc-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .toc-item {
            font-size: 13pt;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            padding-bottom: 8px;
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
            margin: 25px 0;
        }
        
        .do-box, .dont-box {
            padding: 20px;
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
        
        .note-box {
            background: #FFF9E6;
            border-left: 6px solid #B8860B;
            padding: 20px;
            margin: 20px 0;
        }
        
        .note-box h4 {
            color: #B8860B;
            margin-top: 0;
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
        <div class="toc-grid">
            <div>
                <div class="toc-item">
                    <span class="title">Introduction</span>
                    <span class="page">3</span>
                </div>
                <div class="toc-item">
                    <span class="title">Brand Identity & Logo</span>
                    <span class="page">5</span>
                </div>
                <div class="toc-item">
                    <span class="title">Color Palette</span>
                    <span class="page">7</span>
                </div>
                <div class="toc-item">
                    <span class="title">Typography System</span>
                    <span class="page">9</span>
                </div>
            </div>
            <div>
                <div class="toc-item">
                    <span class="title">Brand Voice & Messaging</span>
                    <span class="page">12</span>
                </div>
                <div class="toc-item">
                    <span class="title">Visual Identity</span>
                    <span class="page">14</span>
                </div>
                <div class="toc-item">
                    <span class="title">Brand Applications</span>
                    <span class="page">16</span>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION: INTRODUCTION -->
    <div class="section-header">
        <h1>Introduction</h1>
        <p>Welcome to the Dependable Home Improvement brand book. This comprehensive guide ensures consistent, professional representation of our brand across all touchpoints.</p>
    </div>

    <div class="content-page">
        <h2>About Dependable Home Improvement</h2>
        
        <div class="two-column">
            <div>
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
            </div>
            
            <div>
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
        </div>
    </div>

    <div class="content-page">
        <h2>Brand Values</h2>
        
        <div class="two-column">
            <div>
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
            </div>
            
            <div>
                <div class="value-box">
                    <h4>Community Connection</h4>
                    <p>As a local Bergen County business, we're invested in our community. We serve our neighbors with the respect and care they deserve.</p>
                </div>
                
                <div class="value-box">
                    <h4>Continuous Improvement</h4>
                    <p>We stay current with industry best practices, materials, and techniques to provide our clients with the best possible solutions for their homes.</p>
                </div>
                
                <div class="note-box">
                    <h4>20+ Years of Excellence</h4>
                    <p>Since 2004, Dependable Home Improvement has completed over 1,500 projects, serving 500+ satisfied clients throughout Bergen County with unwavering commitment to quality and customer satisfaction.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION: BRAND IDENTITY -->
    <div class="section-header">
        <h1>Brand Identity<br/>& Logo</h1>
        <p>The visual elements that define Dependable Home Improvement and create instant recognition in the marketplace.</p>
    </div>

    <div class="content-page">
        <h2>Logo</h2>
        
        <div class="two-column">
            <div>
                <p>The Dependable Home Improvement logo is the company's existing brand mark, representing over 20 years of trusted service in Bergen County. The logo combines traditional craftsmanship imagery with professional aesthetics, representing stability, expertise, and quality construction.</p>
                
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
                    <li><strong>Business Cards:</strong> Minimum 0.75 inches width</li>
                    <li><strong>Social Media Profile:</strong> 400x400 pixels minimum</li>
                </ul>
            </div>
            
            <div>
                <h3>Placement Guidelines</h3>
                <ul>
                    <li>Logo should always be <strong>left-aligned</strong> in navigation headers</li>
                    <li>Maintain prominence without overwhelming other design elements</li>
                    <li>Company name should display on maximum 2 lines</li>
                    <li>On business cards, position logo in top left or center</li>
                    <li>On letterhead, place in top left corner with 0.5" margin</li>
                    <li>On vehicle wraps, ensure visibility from 50+ feet</li>
                </ul>
                
                <h3>Clear Space Requirements</h3>
                <p>Maintain clear space around the logo equal to the height of the letter "D" in "Dependable" on all sides. This ensures the logo has breathing room and maximum impact. No text, graphics, or other elements should intrude into this protected space.</p>
                
                <div class="note-box">
                    <h4>Logo Heritage</h4>
                    <p>This is the authentic Dependable Home Improvement logo used since the company's founding. It represents 20+ years of trust, quality, and community service in Bergen County.</p>
                </div>
            </div>
        </div>
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
                    <li>Use high-resolution files for print</li>
                    <li>Left-align logo in website navigation</li>
                    <li>Maintain aspect ratio when resizing</li>
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
                    <li>Recreate or redraw the logo</li>
                    <li>Use low-resolution or pixelated versions</li>
                </ul>
            </div>
        </div>
        
        <h3>Logo Variations</h3>
        <div class="two-column">
            <div>
                <h4>Full Color Logo</h4>
                <p>Primary application for most uses. Features brown and gold color scheme. Use on white or light cream backgrounds for maximum impact.</p>
                
                <h4>Monochrome - All Brown</h4>
                <p>For single-color applications such as embroidery, engraving, or when printing limitations require one color.</p>
                
                <h4>Monochrome - All White</h4>
                <p>For use on dark backgrounds including brown, charcoal, or photography. Ensure sufficient contrast for visibility.</p>
            </div>
            
            <div>
                <h4>Monochrome - All Black</h4>
                <p>For black and white printing, faxes, or photocopies. Use when color reproduction is not available.</p>
                
                <h4>Background Applications</h4>
                <ul>
                    <li><strong>Light Backgrounds:</strong> Use full color or brown logo</li>
                    <li><strong>Dark Backgrounds:</strong> Use white or gold logo</li>
                    <li><strong>Photography:</strong> Ensure sufficient contrast; use white logo with subtle shadow if needed</li>
                    <li><strong>Cream/Beige:</strong> Full color logo works best</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SECTION: COLOR PALETTE -->
    <div class="section-header">
        <h1>Color Palette</h1>
        <p>The brown and gold color scheme conveys reliability, craftsmanship, and premium quality—creating a warm, professional, and trustworthy brand identity.</p>
    </div>

    <div class="content-page">
        <h2>Primary Brand Colors</h2>
        
        <p>The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, and premium quality. The brown and gold combination creates a warm, professional, and trustworthy brand identity that differentiates from competitors.</p>
        
        <div class="color-grid">
            <div class="color-swatch">
                <div class="color-sample" style="background: #654321;"></div>
                <div class="color-info">
                    <h4>Dependable Brown</h4>
                    <p><strong>Hex:</strong> #654321</p>
                    <p><strong>RGB:</strong> 101, 67, 33</p>
                    <p><strong>CMYK:</strong> 0, 34, 67, 60</p>
                    <p><strong>Pantone:</strong> 4625 C (closest match)</p>
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
                    <p><strong>Pantone:</strong> 7551 C (closest match)</p>
                    <p><strong>Usage:</strong> Accents, CTAs, highlights, headings</p>
                </div>
            </div>
            
            <div class="color-swatch">
                <div class="color-sample" style="background: #F5F5DC;"></div>
                <div class="color-info">
                    <h4>Warm Cream</h4>
                    <p><strong>Hex:</strong> #F5F5DC</p>
                    <p><strong>RGB:</strong> 245, 245, 220</p>
                    <p><strong>CMYK:</strong> 0, 0, 10, 4</p>
                    <p><strong>Usage:</strong> Backgrounds, sections, cards</p>
                </div>
            </div>
        </div>
        
        <div class="two-column">
            <div>
                <h3>Color Psychology</h3>
                <p><strong>Brown</strong> represents earthiness, stability, natural materials, and traditional craftsmanship. It creates an immediate connection to wood, construction, and the foundation of quality work. Brown conveys reliability and permanence—essential qualities for home improvement services.</p>
                
                <p><strong>Gold</strong> conveys premium service, excellence, value, and achievement. It elevates the brand positioning from commodity contractor to premium service provider. Gold suggests quality without ostentation, appropriate for a trusted local business.</p>
            </div>
            
            <div>
                <h3>Additional Secondary Colors</h3>
                <p><strong>Charcoal (#36454F):</strong> Used for body text and secondary headings. Provides excellent readability while maintaining sophistication.</p>
                
                <p><strong>White (#FFFFFF):</strong> Essential for backgrounds, text on dark backgrounds, and creating clean, professional sections.</p>
                
                <h3>Accessibility Guidelines</h3>
                <p>All color combinations must meet WCAG AA accessibility standards for contrast. Approved text combinations:</p>
                <ul>
                    <li>Charcoal text on white background ✓</li>
                    <li>White text on brown background ✓</li>
                    <li>Brown text on cream background ✓</li>
                    <li>Gold text on brown background ✓</li>
                </ul>
                <p><strong>Avoid:</strong> Gold on cream (insufficient contrast), brown on gold (poor readability)</p>
            </div>
        </div>
    </div>

    <!-- SECTION: TYPOGRAPHY -->
    <div class="section-header">
        <h1>Typography<br/>System</h1>
        <p>Comprehensive font specifications for all applications—web, print, signage, and digital media.</p>
    </div>

    <div class="content-page">
        <h2>Typography Overview</h2>
        
        <div class="two-column">
            <div>
                <div class="type-example">
                    <h3 style="font-family: 'Georgia', serif; font-size: 28pt; margin-bottom: 10px;">Playfair Display</h3>
                    <p><strong>Classification:</strong> Serif</p>
                    <p><strong>Designer:</strong> Claus Eggers Sørensen</p>
                    <p><strong>Primary Usage:</strong> Headlines, hero text, section headings</p>
                    <p><strong>Weights Available:</strong> Regular (400), Bold (700)</p>
                    <p><strong>Character:</strong> Elegant, sophisticated, classic with modern refinement</p>
                </div>
                
                <h3>Why Playfair Display</h3>
                <ul>
                    <li>Sophisticated aesthetic appropriate for premium positioning</li>
                    <li>Excellent readability at large sizes for headlines</li>
                    <li>Distinctive character that differentiates from competitors</li>
                    <li>Pairs well with modern sans-serif body text</li>
                    <li>Conveys both heritage and contemporary style</li>
                    <li>Free and widely available via Google Fonts</li>
                </ul>
            </div>
            
            <div>
                <div class="type-example">
                    <h3 style="font-family: 'Helvetica', sans-serif; font-size: 24pt; margin-bottom: 10px;">Helvetica / Arial</h3>
                    <p><strong>Classification:</strong> Sans-serif</p>
                    <p><strong>Primary Usage:</strong> Body text, descriptions, captions</p>
                    <p><strong>Weights Available:</strong> Regular (400), Bold (700)</p>
                    <p><strong>Character:</strong> Clean, modern, highly readable</p>
                </div>
                
                <h3>Body Text Font Selection</h3>
                <p>For body text and general content, use system sans-serif fonts for optimal readability and performance:</p>
                <ul>
                    <li><strong>Primary:</strong> Helvetica (Mac/iOS)</li>
                    <li><strong>Secondary:</strong> Arial (Windows)</li>
                    <li><strong>Web Fallback:</strong> System UI fonts for best performance</li>
                </ul>
                
                <p>These fonts are universally available, ensuring consistent appearance across all devices and platforms without requiring font downloads.</p>
            </div>
        </div>
    </div>

    <div class="content-page">
        <h2>Font Specifications by Application</h2>
        
        <h3>Website & Digital Applications</h3>
        <table class="font-table">
            <tr>
                <th>Element</th>
                <th>Font</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Color</th>
                <th>Usage</th>
            </tr>
            <tr>
                <td>H1 - Main Headlines</td>
                <td>Playfair Display</td>
                <td>48-64px</td>
                <td>Bold (700)</td>
                <td>Brown or White</td>
                <td>Page titles, hero headlines</td>
            </tr>
            <tr>
                <td>H2 - Section Headings</td>
                <td>Playfair Display</td>
                <td>36-48px</td>
                <td>Bold (700)</td>
                <td>Brown or Gold</td>
                <td>Major section divisions</td>
            </tr>
            <tr>
                <td>H3 - Subsection Headings</td>
                <td>Playfair Display</td>
                <td>24-32px</td>
                <td>Regular (400)</td>
                <td>Brown or Charcoal</td>
                <td>Content subsections</td>
            </tr>
            <tr>
                <td>Body Text</td>
                <td>Helvetica / Arial</td>
                <td>16-18px</td>
                <td>Regular (400)</td>
                <td>Charcoal</td>
                <td>Paragraphs, descriptions</td>
            </tr>
            <tr>
                <td>Navigation Links</td>
                <td>Helvetica / Arial</td>
                <td>16px</td>
                <td>Regular (400)</td>
                <td>Brown or White</td>
                <td>Menu items, links</td>
            </tr>
            <tr>
                <td>Buttons</td>
                <td>Helvetica / Arial</td>
                <td>16-18px</td>
                <td>Bold (700)</td>
                <td>White on Gold</td>
                <td>Call-to-action buttons</td>
            </tr>
            <tr>
                <td>Captions</td>
                <td>Helvetica / Arial</td>
                <td>14px</td>
                <td>Regular (400)</td>
                <td>Charcoal</td>
                <td>Image captions, footnotes</td>
            </tr>
            <tr>
                <td>Tagline/Accent Text</td>
                <td>Playfair Display</td>
                <td>18-24px</td>
                <td>Regular (400) Italic</td>
                <td>Gold</td>
                <td>Taglines, pull quotes</td>
            </tr>
        </table>
        
        <div class="note-box">
            <h4>Responsive Scaling</h4>
            <p>Typography scales appropriately across devices: Desktop uses full sizes, Tablet uses 90% of desktop, Mobile uses 80% of desktop with adjusted line heights. Minimum text size on mobile is 14px for readability.</p>
        </div>
    </div>

    <div class="content-page">
        <h2>Print Materials Typography</h2>
        
        <h3>Business Cards, Brochures, Flyers</h3>
        <table class="font-table">
            <tr>
                <th>Element</th>
                <th>Font</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Usage</th>
            </tr>
            <tr>
                <td>Company Name</td>
                <td>Playfair Display</td>
                <td>18-24pt</td>
                <td>Bold</td>
                <td>Business cards, letterhead</td>
            </tr>
            <tr>
                <td>Tagline</td>
                <td>Playfair Display</td>
                <td>10-12pt</td>
                <td>Regular Italic</td>
                <td>Under company name</td>
            </tr>
            <tr>
                <td>Contact Information</td>
                <td>Helvetica / Arial</td>
                <td>9-11pt</td>
                <td>Regular</td>
                <td>Phone, email, address</td>
            </tr>
            <tr>
                <td>Brochure Headlines</td>
                <td>Playfair Display</td>
                <td>24-36pt</td>
                <td>Bold</td>
                <td>Section titles</td>
            </tr>
            <tr>
                <td>Brochure Body Text</td>
                <td>Helvetica / Arial</td>
                <td>10-12pt</td>
                <td>Regular</td>
                <td>Descriptions, content</td>
            </tr>
            <tr>
                <td>Flyer Headlines</td>
                <td>Playfair Display</td>
                <td>36-48pt</td>
                <td>Bold</td>
                <td>Main promotional message</td>
            </tr>
        </table>
        
        <h3>Estimates, Invoices, Business Documents</h3>
        <table class="font-table">
            <tr>
                <th>Element</th>
                <th>Font</th>
                <th>Size</th>
                <th>Weight</th>
                <th>Usage</th>
            </tr>
            <tr>
                <td>Document Title</td>
                <td>Playfair Display</td>
                <td>18-20pt</td>
                <td>Bold</td>
                <td>"ESTIMATE" or "INVOICE"</td>
            </tr>
            <tr>
                <td>Section Headers</td>
                <td>Helvetica / Arial</td>
                <td>12pt</td>
                <td>Bold</td>
                <td>Customer Info, Line Items</td>
            </tr>
            <tr>
                <td>Body Text</td>
                <td>Helvetica / Arial</td>
                <td>10-11pt</td>
                <td>Regular</td>
                <td>Descriptions, details</td>
            </tr>
            <tr>
                <td>Pricing</td>
                <td>Helvetica / Arial</td>
                <td>11pt</td>
                <td>Bold</td>
                <td>Amounts, totals</td>
            </tr>
            <tr>
                <td>Terms & Conditions</td>
                <td>Helvetica / Arial</td>
                <td>8-9pt</td>
                <td>Regular</td>
                <td>Fine print, legal text</td>
            </tr>
        </table>
    </div>

    <div class="content-page">
        <h2>Signage & Vehicle Typography</h2>
        
        <div class="two-column">
            <div>
                <h3>Vehicle Wraps & Yard Signs</h3>
                <table class="font-table">
                    <tr>
                        <th>Element</th>
                        <th>Font</th>
                        <th>Guidelines</th>
                    </tr>
                    <tr>
                        <td>Company Name</td>
                        <td>Playfair Display Bold</td>
                        <td>Large, high contrast. Minimum 6" height for vehicles</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>Helvetica Bold</td>
                        <td>Minimum 3" height. Must be readable from 50+ feet</td>
                    </tr>
                    <tr>
                        <td>Website URL</td>
                        <td>Helvetica Bold</td>
                        <td>Minimum 2" height. High contrast background</td>
                    </tr>
                    <tr>
                        <td>Service List</td>
                        <td>Helvetica Regular</td>
                        <td>1.5-2" height. Keep concise (3-4 services max)</td>
                    </tr>
                    <tr>
                        <td>Tagline</td>
                        <td>Playfair Display Italic</td>
                        <td>1.5" height. Gold color on brown or white</td>
                    </tr>
                </table>
                
                <div class="note-box">
                    <h4>Readability at Distance</h4>
                    <p>For every inch of letter height, text is readable at approximately 10 feet. A 3-inch phone number is readable from 30 feet. Always test visibility from typical viewing distances.</p>
                </div>
            </div>
            
            <div>
                <h3>Social Media Typography</h3>
                <table class="font-table">
                    <tr>
                        <th>Platform</th>
                        <th>Font Usage</th>
                    </tr>
                    <tr>
                        <td>Facebook Posts</td>
                        <td>System default for text. Use Playfair Display in graphics</td>
                    </tr>
                    <tr>
                        <td>Instagram Posts</td>
                        <td>System default for captions. Playfair Display for image text overlays</td>
                    </tr>
                    <tr>
                        <td>LinkedIn</td>
                        <td>System default. Professional tone with Helvetica in graphics</td>
                    </tr>
                    <tr>
                        <td>Graphics/Images</td>
                        <td>Playfair Display for headlines, Helvetica for body text</td>
                    </tr>
                </table>
                
                <h3>Email Marketing</h3>
                <ul>
                    <li><strong>Subject Lines:</strong> Plain text (no custom fonts)</li>
                    <li><strong>Email Headlines:</strong> Playfair Display or web-safe Georgia</li>
                    <li><strong>Body Text:</strong> Arial or Helvetica for maximum compatibility</li>
                    <li><strong>Buttons:</strong> Arial Bold, 16-18px, white on gold</li>
                    <li><strong>Footer:</strong> Arial, 12px, charcoal color</li>
                </ul>
                
                <div class="note-box">
                    <h4>Email Font Fallbacks</h4>
                    <p>Many email clients don't support custom fonts. Always specify web-safe fallbacks: Georgia for serifs, Arial/Helvetica for sans-serif.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="content-page">
        <h2>Typography Best Practices</h2>
        
        <div class="two-column">
            <div>
                <h3>Hierarchy & Readability</h3>
                <ul>
                    <li><strong>Establish Clear Hierarchy:</strong> Use size, weight, and color to create visual hierarchy. Headlines should be significantly larger than body text.</li>
                    <li><strong>Line Height:</strong> Body text should have 1.6-1.8 line height for comfortable reading. Headlines can use tighter 1.2-1.4 line height.</li>
                    <li><strong>Line Length:</strong> Optimal line length is 50-75 characters. Longer lines reduce readability.</li>
                    <li><strong>Paragraph Spacing:</strong> Use 1em spacing between paragraphs for clear separation.</li>
                    <li><strong>Alignment:</strong> Left-align body text for easiest reading. Center-align headlines when appropriate.</li>
                </ul>
                
                <h3>Contrast & Accessibility</h3>
                <ul>
                    <li>Ensure minimum 4.5:1 contrast ratio for body text</li>
                    <li>Use 3:1 contrast ratio minimum for large text (18pt+)</li>
                    <li>Avoid light text on light backgrounds</li>
                    <li>Test readability on actual devices and print samples</li>
                    <li>Consider colorblind users when choosing text colors</li>
                </ul>
            </div>
            
            <div>
                <h3>Font Pairing Guidelines</h3>
                <ul>
                    <li><strong>Serif + Sans-Serif:</strong> Playfair Display (serif) pairs perfectly with Helvetica/Arial (sans-serif)</li>
                    <li><strong>Contrast is Key:</strong> The elegant, decorative Playfair contrasts beautifully with clean, simple Helvetica</li>
                    <li><strong>Limit Font Families:</strong> Never use more than 2 font families in a single design</li>
                    <li><strong>Consistent Application:</strong> Always use Playfair for headlines, Helvetica for body</li>
                </ul>
                
                <h3>Common Typography Mistakes to Avoid</h3>
                <ul>
                    <li>❌ Using too many different fonts (stick to 2 families)</li>
                    <li>❌ All caps for long passages (reduces readability)</li>
                    <li>❌ Insufficient contrast between text and background</li>
                    <li>❌ Text too small (minimum 14px on mobile, 16px on desktop)</li>
                    <li>❌ Overly decorative fonts for body text</li>
                    <li>❌ Inconsistent sizing and spacing</li>
                    <li>❌ Stretching or distorting fonts</li>
                </ul>
                
                <div class="note-box">
                    <h4>When in Doubt</h4>
                    <p>If unsure about typography choices, default to simplicity: Playfair Display Bold for headlines, Helvetica Regular for body text, generous spacing, high contrast. This combination works in 95% of applications.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION: BRAND VOICE -->
    <div class="section-header">
        <h1>Brand Voice<br/>& Messaging</h1>
        <p>Professional yet approachable, confident yet humble, expert yet educational—our voice builds trust and connection.</p>
    </div>

    <div class="content-page">
        <h2>Tone of Voice</h2>
        
        <p style="font-size: 13pt; margin-bottom: 25px;">Dependable Home Improvement's brand voice is <strong>professional yet approachable, confident yet humble, expert yet educational</strong>.</p>
        
        <div class="two-column">
            <div>
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
            </div>
            
            <div>
                <div class="value-box">
                    <h4>Trustworthy</h4>
                    <p>We communicate with honesty and transparency. We set realistic expectations, provide clear timelines, and never make promises we can't keep.</p>
                </div>
                
                <div class="value-box">
                    <h4>Educational</h4>
                    <p>We position ourselves as helpful advisors, not just service providers. We share knowledge through blog content, how-to guides, and project consultations.</p>
                </div>
                
                <div class="type-example">
                    <h3 style="font-family: 'Georgia', serif; font-size: 22pt; font-style: italic; color: #B8860B; margin-bottom: 15px;">Crafting Excellence. Building Trust.</h3>
                    <p>This tagline encapsulates both the technical expertise (crafting excellence) and the relationship foundation (building trust) that define Dependable Home Improvement.</p>
                </div>
            </div>
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
    </div>

    <!-- SECTION: VISUAL IDENTITY -->
    <div class="section-header">
        <h1>Visual Identity</h1>
        <p>Authentic photography and consistent imagery create credibility and showcase real craftsmanship.</p>
    </div>

    <div class="content-page">
        <h2>Photography Style & Imagery Guidelines</h2>
        
        <div class="two-column">
            <div>
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
            </div>
            
            <div>
                <h3>Before/After Presentations</h3>
                <p>Before/after galleries are the most powerful marketing tool for home improvement services. Proper presentation is critical:</p>
                
                <ul>
                    <li><strong>Side-by-Side Layout:</strong> Present images next to each other, not as sliders. Allows immediate visual comparison.</li>
                    <li><strong>Consistent Framing:</strong> Take photos from exact same position and angle to emphasize transformation.</li>
                    <li><strong>Clear Labeling:</strong> Always label "BEFORE" and "AFTER" to avoid confusion.</li>
                    <li><strong>Project Details:</strong> Include brief description of work performed, timeline, and key improvements.</li>
                    <li><strong>Variety:</strong> Showcase diverse project types to demonstrate full range of capabilities.</li>
                </ul>
                
                <h3>Team & Facility Photography</h3>
                <ul>
                    <li>Professional but approachable team portraits</li>
                    <li>Team members in branded apparel</li>
                    <li>Clean, organized workshop spaces</li>
                    <li>Action shots of team working on projects</li>
                    <li>Authentic expressions and natural poses</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SECTION: BRAND APPLICATIONS -->
    <div class="section-header">
        <h1>Brand<br/>Applications</h1>
        <p>Consistent application across all touchpoints creates a cohesive, professional, and memorable brand experience.</p>
    </div>

    <div class="content-page">
        <h2>Website & Digital Applications</h2>
        
        <div class="two-column">
            <div>
                <h3>Design Principles</h3>
                <ul>
                    <li>Clean, professional layout with generous white space</li>
                    <li>Brown and gold color scheme throughout</li>
                    <li>High-quality project photography prominently featured</li>
                    <li>Clear calls-to-action on every page</li>
                    <li>Mobile-responsive design for all devices</li>
                    <li>Fast loading times (under 3 seconds)</li>
                </ul>
                
                <h3>Key Website Elements</h3>
                <ul>
                    <li>Video background in hero section</li>
                    <li>Left-aligned logo (115px height)</li>
                    <li>Sticky navigation with smooth transitions</li>
                    <li>Multi-language support (EN/RU/ES)</li>
                    <li>Before/after project gallery</li>
                    <li>Interactive service area map</li>
                    <li>Multi-step contact form</li>
                    <li>Dynamic testimonials with verified badges</li>
                    <li>Review platform integration</li>
                </ul>
            </div>
            
            <div>
                <h3>Social Media Guidelines</h3>
                <p><strong>Profile Images:</strong> Dependable logo on white background</p>
                <p><strong>Cover Photos:</strong> Project photography with brown overlay and gold text</p>
                <p><strong>Post Imagery:</strong> Consistent brown/gold color treatment</p>
                <p><strong>Branded Graphics:</strong> Logo in corner, consistent typography</p>
                
                <h3>Print Materials</h3>
                <p><strong>Business Cards:</strong> Brown background, gold accents, white text, premium cardstock with possible gold foil</p>
                <p><strong>Brochures:</strong> Tri-fold format, brown and cream colors, high-quality project photos, service descriptions with icons</p>
                <p><strong>Flyers:</strong> Eye-catching Playfair Display headlines, before/after imagery, clear offers</p>
                <p><strong>Estimates & Invoices:</strong> Professional letterhead, clear itemized pricing, satisfaction guarantee statement</p>
            </div>
        </div>
    </div>

    <!-- CONCLUSION -->
    <div class="content-page">
        <h2>Maintaining Brand Consistency</h2>
        
        <div class="two-column">
            <div>
                <p>The Dependable Home Improvement brand represents over 20 years of commitment to excellence, reliability, and customer satisfaction. These brand guidelines ensure that every interaction—whether digital, print, or in-person—reinforces the values and quality that have made Dependable Home Improvement a trusted name in Bergen County.</p>
                
                <p>By maintaining consistency in visual identity, messaging, and customer experience, we strengthen brand recognition, build trust, and differentiate Dependable Home Improvement in a competitive marketplace.</p>
                
                <div class="value-box">
                    <h4>Remember</h4>
                    <p>Every project is a brand ambassador. Every customer interaction is a brand experience. Every material we produce represents our commitment to excellence.</p>
                </div>
                
                <h3>Brand Guardianship</h3>
                <p>All marketing materials, communications, and brand applications should be reviewed for compliance with these guidelines before publication or distribution. Work with designers, printers, and vendors who understand and respect brand standards.</p>
            </div>
            
            <div>
                <h3>Quality Control Checklist</h3>
                <ul>
                    <li>✓ Correct logo usage and sizing</li>
                    <li>✓ Proper color application (brown #654321, gold #B8860B)</li>
                    <li>✓ Appropriate typography (Playfair Display + Helvetica)</li>
                    <li>✓ Brand-appropriate imagery</li>
                    <li>✓ Consistent tone of voice</li>
                    <li>✓ Accurate company information</li>
                    <li>✓ Accessibility compliance</li>
                </ul>
                
                <h3>Updates & Revisions</h3>
                <p>This brand book should be reviewed annually and updated as needed to reflect new services, expanded service areas, updated contact information, and evolved design trends while maintaining core identity.</p>
                
                <div style="margin-top: 60px; text-align: center;">
                    <img src="cascadia-logo.jpg" alt="Cascadia Managing Brands" style="width: 280px; margin-bottom: 15px;" />
                    <p style="font-size: 13pt; color: #654321;"><strong>Prepared by Cascadia Managing Brands</strong></p>
                    <p style="font-size: 9pt; color: #999; margin-top: 30px;">This brand book is proprietary and confidential. Provided for exclusive use of Dependable Home Improvement and authorized partners.</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
"""

# Write HTML to file
with open('brand_book_temp.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Generate PDF
print("Generating landscape PDF brand book with expanded typography...")
HTML('brand_book_temp.html').write_pdf(
    'Dependable_Home_Improvement_Brand_Book.pdf',
    stylesheets=[CSS(string='@page { size: 11in 8.5in landscape; margin: 0; }')]
)

print("Brand book PDF created successfully!")

# Clean up temp file
Path('brand_book_temp.html').unlink()
