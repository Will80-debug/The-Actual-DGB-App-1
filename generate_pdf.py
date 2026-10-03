#!/usr/bin/env python3
"""
Convert Markdown turnover packet to professional PDF
"""
import markdown2
from weasyprint import HTML, CSS
from pathlib import Path

# Read the markdown file
markdown_file = Path('/home/user/webapp/TURNOVER_PACKET.md')
markdown_content = markdown_file.read_text()

# Convert markdown to HTML
html_content = markdown2.markdown(
    markdown_content,
    extras=['tables', 'fenced-code-blocks', 'header-ids']
)

# Create professional HTML template with styling
html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Green Book - Turnover Packet</title>
    <style>
        @page {{
            size: letter;
            margin: 1in;
            @top-center {{
                content: "Digital Green Book - Turnover Packet";
                font-size: 9pt;
                color: #666;
            }}
            @bottom-center {{
                content: "Page " counter(page) " of " counter(pages);
                font-size: 9pt;
                color: #666;
            }}
        }}
        
        body {{
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
        }}
        
        h1 {{
            color: #2c5530;
            font-size: 24pt;
            margin-top: 0;
            margin-bottom: 0.5em;
            page-break-after: avoid;
            border-bottom: 3px solid #2c5530;
            padding-bottom: 0.3em;
        }}
        
        h2 {{
            color: #2c5530;
            font-size: 18pt;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.2em;
        }}
        
        h3 {{
            color: #3d6f42;
            font-size: 14pt;
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
        }}
        
        h4 {{
            color: #4a7f50;
            font-size: 12pt;
            margin-top: 1em;
            margin-bottom: 0.4em;
            page-break-after: avoid;
        }}
        
        p {{
            margin: 0.5em 0;
            text-align: justify;
        }}
        
        ul, ol {{
            margin: 0.5em 0;
            padding-left: 2em;
        }}
        
        li {{
            margin: 0.3em 0;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            font-size: 10pt;
        }}
        
        th {{
            background-color: #2c5530;
            color: white;
            padding: 8px;
            text-align: left;
            font-weight: bold;
        }}
        
        td {{
            border: 1px solid #ddd;
            padding: 8px;
        }}
        
        tr:nth-child(even) {{
            background-color: #f9f9f9;
        }}
        
        code {{
            background-color: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
        }}
        
        pre {{
            background-color: #f5f5f5;
            padding: 12px;
            border-radius: 5px;
            border-left: 4px solid #2c5530;
            overflow-x: auto;
            font-size: 9pt;
        }}
        
        pre code {{
            background-color: transparent;
            padding: 0;
        }}
        
        hr {{
            border: none;
            border-top: 2px solid #2c5530;
            margin: 2em 0;
        }}
        
        blockquote {{
            border-left: 4px solid #2c5530;
            padding-left: 1em;
            margin-left: 0;
            color: #666;
            font-style: italic;
        }}
        
        .header-info {{
            color: #666;
            font-size: 10pt;
            margin-bottom: 2em;
        }}
        
        .section-note {{
            background-color: #fffdf0;
            border-left: 4px solid #f0ad4e;
            padding: 12px;
            margin: 1em 0;
            font-style: italic;
            color: #856404;
        }}
        
        strong {{
            color: #2c5530;
        }}
        
        /* Prevent page breaks inside important elements */
        h1, h2, h3, h4 {{
            page-break-inside: avoid;
        }}
        
        table {{
            page-break-inside: avoid;
        }}
        
        ul, ol {{
            page-break-inside: avoid;
        }}
    </style>
</head>
<body>
    {html_content}
</body>
</html>
"""

# Generate PDF
output_pdf = Path('/home/user/webapp/Digital_Green_Book_Turnover_Packet_2026-01-31.pdf')
HTML(string=html_template).write_pdf(output_pdf)

print(f"✅ PDF generated successfully: {output_pdf}")
print(f"📄 File size: {output_pdf.stat().st_size / 1024:.2f} KB")
