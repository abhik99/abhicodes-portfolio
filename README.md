# 📊 abhicodes.online | Portfolio of Abhishek Kumar (Abhi)
### Data Scientist & Analytics Engineer

A high-performance, responsive portfolio website custom-engineered for **Abhishek Kumar** (`@abhik99`), targeted at **Data Scientist**, **Senior Data Analyst**, and **Machine Learning Engineer** job roles.

Configured for **Vercel** with custom domain integration for:
👉 **[https://abhicodes.online/](https://abhicodes.online/)**

---

## 🌟 Key Features

1. **Interactive Data Science & Analytics Sandbox**:
   - **Threshold & Confusion Matrix Simulator**: Move the threshold slider to dynamically simulate True Positives, False Positives, Precision, Recall, F1-Score, and SVG ROC curve shift.
   - **SQL Performance Benchmarks**: Live CTE & Window function queries for Customer RFM Segmentation, SLA Breach analysis, and PySpark banking conversion queries.
   - **Retail Cohort Analytics**: Promotional lift and markdown elasticity trends derived from the retail analytics case study.

2. **Curated GitHub Project Showcase (Filterable)**:
   - **Coursera Multimodal Intelligence Platform** (Flagship - Live Certified on Vercel)
   - **IndustryGPT / TransportGPT** (Specialized 1.1B LLM with QLoRA & FAISS RAG)
   - **DeepCSAT** (E-Commerce Customer Satisfaction 6-Layer Deep ANN on 85k records)
   - **Distributed Machine Learning for Term Deposits** (PySpark, Hive, Hadoop & Streaming)
   - **Voyage Analytics** (Production MLOps, Docker, MLflow & Jenkins)
   - **Integrated Retail Analytics for Store Optimization**
   - **DeepFER** (Real-Time Facial Emotion Recognition CNN)
   - **Hotel Booking Demand EDA & Revenue Insights**
   - **Seoul Bike Sharing Demand Prediction**
   - **COVID-19 Social Tweet Sentiment NLP**
   - **Netflix Content Clustering & Network Analysis**

3. **Technical Skills Matrix**:
   - Languages: Python, SQL, C++, Bash
   - BI & Analytics: Power BI, Tableau, Advanced Excel, Hypothesis Testing
   - Machine Learning: Scikit-learn, TensorFlow, Keras, OpenCV, SMOTE
   - Big Data: Apache Spark (PySpark), Hadoop, Hive, Structured Streaming
   - GenAI & Vectors: pgvector, FAISS, PEFT/QLoRA, Gemini API
   - MLOps & Delivery: Vercel Edge, Docker, MLflow, Automated Pytest (97/97 passed)

4. **Design & Experience**:
   - Cyber Dark mode default with light mode switch (persisted in `localStorage`)
   - Micro-animations, glowing glassmorphic panels, and responsive mobile navigation
   - SEO optimized with OpenGraph, Twitter Cards, and schema.org JSON-LD

---

## 🚀 How to Run Locally

You can test the site locally using any static web server:

### Option A: Using Python (Built-in)
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option B: Using Node / npx serve
```bash
npx -y serve .
```

---

## 🌐 Deploying to Vercel

### Method 1: Deploy with Git / GitHub (Recommended)
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete data science portfolio for abhicodes.online"
   ```
2. Create a new GitHub repository (e.g., `abhicodes-portfolio`) and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/abhik99/abhicodes-portfolio.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
4. Import your `abhicodes-portfolio` repository.
5. Vercel automatically detects the static site — click **"Deploy"**.

### Method 2: Deploy directly via Vercel CLI
```bash
npx -y vercel
```
Follow the short terminal prompts and select defaults.

---

## 🔗 Connecting Your Custom Domain (`abhicodes.online`)

1. Open your project in the **Vercel Dashboard**.
2. Navigate to **Settings** > **Domains**.
3. Type: `abhicodes.online` and click **Add**.
4. Vercel will also suggest adding `www.abhicodes.online` (redirecting to `abhicodes.online`). Click **Add**.
5. In your domain registrar (GoDaddy, Namecheap, Hostinger, Porkbun, etc.):
   - Set an **A Record**:
     - **Host / Name**: `@`
     - **Type**: `A`
     - **Value / Points to**: `76.76.21.21`
   - Set a **CNAME Record**:
     - **Host / Name**: `www`
     - **Type**: `CNAME`
     - **Value / Points to**: `cname.vercel-dns.com.`
6. Vercel will automatically provision a free SSL certificate within a few minutes.

---

## 📁 File Structure

```
c:\abhicodes website\
├── index.html          # Main HTML structure with SEO meta tags & JSON-LD
├── index.css           # Vanilla CSS design system, glassmorphism & themes
├── app.js              # Interactive Data Science Sandbox, SQL engine, modals
├── vercel.json         # Vercel deployment configuration & cache headers
├── robots.txt          # Search engine crawler instructions
├── sitemap.xml         # SEO sitemap
├── README.md           # Documentation & Vercel setup guide
└── assets/
    └── images/
        ├── avatar.png             # Abhishek Kumar's GitHub avatar
        ├── hero-visual.jpg        # Neural architecture & telemetry graphic
        ├── analytics-preview.jpg  # Retail analytics & cohort retention graphic
        ├── rag-preview.jpg        # Neural knowledge graph & RAG interface
        └── spark-preview.jpg      # Apache Spark cluster & streaming topology
```
