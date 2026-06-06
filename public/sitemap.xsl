<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ar" dir="rtl">
      <head>
        <title>خريطة الموقع - Decorsar Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          body {
            font-family: 'Cairo', 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #0b0f19;
            color: #e2e8f0;
            margin: 0;
            padding: 40px 20px;
            background-image: radial-gradient(circle at top right, rgba(56, 189, 248, 0.05), transparent 400px),
                              radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.03), transparent 400px);
            background-attachment: fixed;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 24px;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
          }
          .title-area h1 {
            font-size: 28px;
            margin: 0;
            font-weight: 800;
            background: linear-gradient(135deg, #38bdf8 0%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
          }
          .title-area p {
            color: #94a3b8;
            font-size: 14px;
            margin: 8px 0 0 0;
          }
          .badge {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.2);
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: right;
          }
          th {
            color: #94a3b8;
            font-weight: 600;
            font-size: 13px;
            padding: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td {
            padding: 16px;
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            word-break: break-all;
            vertical-align: middle;
          }
          tr {
            transition: all 0.2s ease;
          }
          tr:hover td {
            background-color: rgba(255, 255, 255, 0.02);
            color: #ffffff;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            transition: color 0.2s ease;
            font-weight: 500;
          }
          a:hover {
            color: #10b981;
          }
          .priority-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 700;
            font-family: 'Inter', sans-serif;
          }
          .priority-high {
            background-color: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          .priority-medium {
            background-color: rgba(56, 189, 248, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(56, 189, 248, 0.2);
          }
          .priority-low {
            background-color: rgba(148, 163, 184, 0.1);
            color: #94a3b8;
            border: 1px solid rgba(148, 163, 184, 0.15);
          }
          .freq-badge {
            display: inline-block;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            text-transform: capitalize;
            color: #cbd5e1;
            background: rgba(255, 255, 255, 0.06);
            padding: 4px 8px;
            border-radius: 6px;
          }
          .date-text {
            font-family: 'Inter', sans-serif;
            color: #94a3b8;
            font-size: 13px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title-area">
              <h1>خريطة الموقع (Sitemap)</h1>
              <p>ملف XML مُولّد تلقائياً لتسهيل أرشفة وفهرسة موقع Decorsar من قبل محركات البحث.</p>
            </div>
            <div class="badge">
              إجمالي الروابط: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 50%; text-align: right;">الرابط (URL)</th>
                <th style="width: 15%; text-align: center;">الأولوية (Priority)</th>
                <th style="width: 15%; text-align: center;">معدل التغيير (Change Freq)</th>
                <th style="width: 20%; text-align: center;">آخر تعديل (Last Modified)</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="text-align: right;">
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td style="text-align: center;">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.8">
                        <span class="priority-badge priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.6">
                        <span class="priority-badge priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority-badge priority-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td style="text-align: center;">
                    <span class="freq-badge">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <span class="date-text">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                      <span style="font-size: 11px; margin-right: 5px; opacity: 0.7;">
                        <xsl:value-of select="substring(sitemap:lastmod, 12, 8)"/>
                      </span>
                    </span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer">
            جميع الحقوق محفوظة © Decorsar
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
