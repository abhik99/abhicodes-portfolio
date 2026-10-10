/**
 * abhicodes.online | Application Controller & Interactive Data Science Engine
 * Abhishek Kumar | Data Scientist & Analytics Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initSandbox();
  initProjectModal();
  initContactInteractions();
  initSkillBars();
});

/* ==========================================================================
   1. Navbar & Scroll Spy
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Theme Toggle (Cyber Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('abhi_theme') || 'dark';

  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('abhi_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const iconWrapper = document.getElementById('themeIcon');
  if (!iconWrapper) return;
  if (theme === 'light') {
    iconWrapper.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
  } else {
    iconWrapper.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
  }
}

/* ==========================================================================
   3. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-open');
  });

  // Close on item click
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   4. Project Filters
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Data Science Sandbox
   ========================================================================== */
function initSandbox() {
  // 5.1 Tab Switching
  const tabBtns = document.querySelectorAll('.sandbox-tab-btn');
  const tabPanes = document.querySelectorAll('.sandbox-tab-pane');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.getAttribute('data-target'));
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 5.2 Confusion Matrix Simulator
  const thresholdSlider = document.getElementById('thresholdSlider');
  const thresholdValDisplay = document.getElementById('thresholdValDisplay');

  function updateConfusionMatrix(tau) {
    const totalPos = 1200;
    const totalNeg = 3800;

    // Simulated statistical probabilities given decision threshold
    const tp = Math.round(totalPos * Math.max(0.1, 1 - Math.pow(tau, 1.15)));
    const fn = totalPos - tp;
    const fp = Math.round(totalNeg * Math.pow(1 - tau, 1.75));
    const tn = totalNeg - fp;

    const precision = tp / (tp + fp);
    const recall = tp / (tp + fn);
    const f1 = (2 * (precision * recall)) / (precision + recall);

    // Update DOM
    if (thresholdValDisplay) thresholdValDisplay.textContent = parseFloat(tau).toFixed(2);
    document.getElementById('valTP').textContent = tp.toLocaleString();
    document.getElementById('valTN').textContent = tn.toLocaleString();
    document.getElementById('valFP').textContent = fp.toLocaleString();
    document.getElementById('valFN').textContent = fn.toLocaleString();

    document.getElementById('metricPrecision').textContent = (precision * 100).toFixed(1) + '%';
    document.getElementById('metricRecall').textContent = (recall * 100).toFixed(1) + '%';
    document.getElementById('metricF1').textContent = (f1 * 100).toFixed(1) + '%';

    // Update SVG Point on ROC
    const fpr = fp / totalNeg;
    const tpr = recall;
    const rocPoint = document.getElementById('rocMarkerPoint');
    if (rocPoint) {
      // Map 0..1 to SVG viewBox coordinates (x: 40..260, y: 220..40)
      const svgX = 40 + fpr * 220;
      const svgY = 220 - tpr * 180;
      rocPoint.setAttribute('cx', svgX);
      rocPoint.setAttribute('cy', svgY);
    }
  }

  thresholdSlider?.addEventListener('input', (e) => {
    updateConfusionMatrix(parseFloat(e.target.value));
  });

  // Initial call
  updateConfusionMatrix(0.5);

  // 5.3 SQL Console Simulator
  initSqlConsole();
}

const SQL_PRESETS = {
  rfm: {
    title: 'Customer RFM Segmentation & Lifetime Value',
    sql: `-- 1. Calculate Recency, Frequency & Monetary Quintiles
WITH rfm_base AS (
    SELECT 
        customer_id,
        MAX(transaction_date) AS last_purchase,
        COUNT(order_id) AS total_orders,
        SUM(order_amount) AS total_spend,
        DATEDIFF('2026-10-01', MAX(transaction_date)) AS recency_days
    FROM retail_transactions
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT 
        customer_id,
        recency_days,
        total_orders,
        total_spend,
        NTILE(5) OVER(ORDER BY recency_days ASC) AS r_score,
        NTILE(5) OVER(ORDER BY total_orders DESC) AS f_score,
        NTILE(5) OVER(ORDER BY total_spend DESC) AS m_score
    FROM rfm_base
)
SELECT 
    customer_id,
    recency_days,
    total_orders,
    ROUND(total_spend, 2) AS total_spend,
    CONCAT(r_score, f_score, m_score) AS rfm_tier,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 THEN 'Champions'
        WHEN r_score <= 2 AND f_score >= 3 THEN 'At Risk (High Spender)'
        ELSE 'Active Shopper'
    END AS customer_segment
FROM rfm_scores
ORDER BY total_spend DESC
LIMIT 5;`,
    headers: ['Customer ID', 'Recency (Days)', 'Orders', 'Spend ($)', 'RFM Tier', 'Segment'],
    rows: [
      ['CUST-98214', '3', '48', '$8,420.50', '555', 'Champions'],
      ['CUST-10492', '6', '39', '$6,180.20', '545', 'Champions'],
      ['CUST-44021', '64', '31', '$4,920.00', '244', 'At Risk (High Spender)'],
      ['CUST-38910', '12', '24', '$3,640.80', '434', 'Active Shopper'],
      ['CUST-77291', '19', '18', '$2,910.15', '433', 'Active Shopper']
    ],
    execTime: '11.4 ms'
  },
  csat: {
    title: 'CSAT Score & Ticket Resolution SLA Analysis',
    sql: `-- 2. Ticket Resolution Window Analysis for DeepCSAT
SELECT 
    department,
    COUNT(ticket_id) AS total_tickets,
    ROUND(AVG(csat_score), 2) AS avg_csat,
    ROUND(AVG(connected_handling_sec) / 60, 1) AS avg_handling_mins,
    ROUND(SUM(CASE WHEN csat_score >= 4 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS satisfied_pct,
    ROUND(SUM(CASE WHEN connected_handling_sec > 900 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS breach_sla_pct
FROM customer_support_logs
GROUP BY department
ORDER BY avg_csat DESC;`,
    headers: ['Department', 'Tickets', 'Avg CSAT (1-5)', 'Handling (Mins)', 'Satisfied %', 'SLA Breach %'],
    rows: [
      ['Order Tracking & Logistics', '34,180', '4.42', '4.2', '89.4%', '2.1%'],
      ['Payments & Billing', '22,400', '4.18', '7.8', '83.2%', '5.8%'],
      ['Returns & Replacements', '18,920', '3.89', '9.4', '74.6%', '9.2%'],
      ['Technical & App Support', '10,407', '3.65', '14.1', '68.1%', '14.6%']
    ],
    execTime: '8.7 ms'
  },
  spark: {
    title: 'Distributed Bank Term Deposit Conversion Rate',
    sql: `-- 3. Distributed Spark SQL Query on 4.5k Client Cohorts
SELECT 
    job_category,
    education_level,
    COUNT(*) AS total_clients,
    ROUND(AVG(balance), 2) AS avg_balance_usd,
    ROUND(SUM(CASE WHEN subscribed_term_deposit = 'yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS conversion_rate_pct
FROM bank_marketing_distributed
WHERE previous_campaign_outcome IN ('success', 'nonexistent')
GROUP BY job_category, education_level
HAVING COUNT(*) >= 50
ORDER BY conversion_rate_pct DESC
LIMIT 4;`,
    headers: ['Job Category', 'Education', 'Total Clients', 'Avg Balance ($)', 'Conversion Rate %'],
    rows: [
      ['Management', 'Tertiary', '940', '$2,480.30', '18.42%'],
      ['Technician', 'Secondary', '1,280', '$1,820.50', '13.15%'],
      ['Admin / Services', 'Secondary', '890', '$1,440.10', '11.80%'],
      ['Blue-Collar', 'Secondary', '1,120', '$1,190.20', '8.94%']
    ],
    execTime: '16.9 ms'
  }
};

function initSqlConsole() {
  const querySelector = document.getElementById('sqlQuerySelect');
  const sqlEditor = document.getElementById('sqlCodeView');
  const sqlTableHead = document.getElementById('sqlTableHead');
  const sqlTableBody = document.getElementById('sqlTableBody');
  const sqlExecTime = document.getElementById('sqlExecTime');

  function renderQuery(key) {
    const data = SQL_PRESETS[key] || SQL_PRESETS.rfm;
    if (sqlEditor) sqlEditor.textContent = data.sql;
    if (sqlExecTime) sqlExecTime.textContent = `Executed in ${data.execTime}`;

    // Render Headers
    if (sqlTableHead) {
      sqlTableHead.innerHTML = `<tr>${data.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    }

    // Render Rows
    if (sqlTableBody) {
      sqlTableBody.innerHTML = data.rows
        .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
        .join('');
    }
  }

  querySelector?.addEventListener('change', (e) => {
    renderQuery(e.target.value);
  });

  renderQuery('rfm');
}

/* ==========================================================================
   6. Detailed Project Case Study Modals
   ========================================================================== */
const PROJECT_DETAILS = {
  coursera: {
    title: 'Coursera Multimodal Intelligence Platform',
    category: 'GenAI, LLMs & Vector Retrieval',
    tagline: 'Grounded RAG architecture & instructional telemetry engine deployed live on Vercel Edge.',
    liveUrl: 'https://coursera-multimodal-intelligence-pl.vercel.app/',
    demoVideo: 'https://drive.google.com/file/d/1-4rQmYV4VyDYsAzOmbjrTUlKm-JoA3Mg/view?usp=drive_link',
    githubUrl: 'https://github.com/abhik99/Coursera-Multimodal-Intelligence-Platform',
    meta: {
      role: 'Testing & Integration Lead | Vercel Edge Deployer',
      stack: 'Python, FastAPI, PostgreSQL, pgvector, Gemini 2.5 Flash, React 19, Pytest',
      tests: '97/97 Automated Pytest Suite Passed',
      latency: '< 289ms Edge TTFB Response'
    },
    overview: `An enterprise-grade multimodal learning intelligence platform designed to ingest raw course archives (.zip) containing video transcripts (SRT), HTML readings, and assignment trees into indexed 384-dimensional dense vector embeddings in PostgreSQL pgvector.`,
    deliverables: [
      'Engineered automated Pytest test suite achieving 100% test pass rate across 97 unit and integration specs.',
      'Constructed EvidenceValidator anti-hallucination guardrail ensuring LLM answers strictly reference certified course content IDs.',
      'Optimized Vite build pipeline and migrated database schema to cloud Supabase with live Vercel Global Edge deployment.'
    ]
  },
  transportgpt: {
    title: 'IndustryGPT / TransportGPT (Supply Chain LLM)',
    category: 'Fine-Tuned LLMs & Domain RAG',
    tagline: 'Specialized 1.1B LLM fine-tuned with QLoRA and FAISS vector retrieval for logistics queries.',
    liveUrl: null,
    demoVideo: null,
    githubUrl: 'https://github.com/abhik99/TransportGPT',
    meta: {
      role: 'NLP & Fine-Tuning Engineer',
      stack: 'TinyLlama-1.1B, Hugging Face TRL, QLoRA, FAISS, BitsAndBytes 4-bit, Gradio',
      dataset: '3,150 Custom Multi-Layer Logistic Dialogues',
      vram: 'Zero-cost Colab T4 (16GB VRAM) optimized'
    },
    overview: `A high-efficiency Large Language Model specifically trained for transportation and freight customer operations. Integrates hybrid Bitext support dialogues with Kaggle operational status data and FAISS vector retrieval for zero-hallucination SOP execution.`,
    deliverables: [
      'Implemented QLoRA (Rank 16, Alpha 32) parameter-efficient fine-tuning on TinyLlama 1.1B using BitsAndBytes NF4 quantization.',
      'Integrated dense semantic search with FAISS and all-MiniLM-L6-v2 vector embeddings to inject ground-truth warehouse policies.',
      'Developed real-time Gradio interactive web UI for testing logistics reasoning and shipping exception flows.'
    ]
  },
  deepcsat: {
    title: 'DeepCSAT: E-Commerce Customer Satisfaction Prediction',
    category: 'Predictive ML & Deep Learning',
    tagline: 'Deep Artificial Neural Network predicting satisfaction scores (1–5) on 85,907 customer interactions.',
    liveUrl: null,
    demoVideo: null,
    githubUrl: 'https://github.com/abhik99/DeepCSAT-E-Commerce-Customer-Satisfaction-Score-Prediction',
    meta: {
      role: 'End-to-End Data Scientist & Deep Learning Engineer',
      stack: 'TensorFlow, Keras, Scikit-learn, Pandas, SMOTE, Streamlit',
      scale: '85,907 Real-world Interaction Records',
      architecture: '6-Layer Deep ANN with Batch Normalization & L2'
    },
    overview: `Customer satisfaction forecasting system utilizing multi-modal support data including connection wait times, agent handling duration, and customer text sentiment remarks.`,
    deliverables: [
      'Designed preprocessing pipeline addressing high-sparsity operational metrics and engineered TF-IDF text features.',
      'Countered extreme class imbalance across dissatisfied ratings using synthetic oversampling (SMOTE) and class weight tuning.',
      'Built and deployed an interactive Streamlit application enabling customer experience teams to forecast ticket ratings.'
    ]
  },
  distributedml: {
    title: 'Distributed Machine Learning for Banking Term Deposits',
    category: 'Big Data & Distributed Computing',
    tagline: 'Scalable PySpark ML and Spark Structured Streaming pipeline for financial conversion modeling.',
    liveUrl: null,
    demoVideo: null,
    githubUrl: 'https://github.com/abhik99/Distributed-Machine-Learning-for-Term-Deposit-Subscription-Prediction',
    meta: {
      role: 'Big Data Engineer & ML Architect',
      stack: 'Apache Spark, PySpark ML, Hadoop HDFS, HiveQL, Structured Streaming',
      dataset: '4.5k Client Records with 17 Behavioral Features',
      analytics: '15+ Univariate/Bivariate Statistical Visualizations'
    },
    overview: `Demonstrates the full enterprise distributed computing stack from raw HDFS data ingestion to HiveQL data warehousing, Spark ML classification model evaluation, and simulated real-time transaction streaming.`,
    deliverables: [
      'Engineered distributed feature pipelines with Spark StringIndexer, OneHotEncoderEstimator, and VectorAssembler.',
      'Evaluated Spark ML Random Forest and Logistic Regression classifiers using BinaryClassificationEvaluator (ROC-AUC).',
      'Configured Spark Structured Streaming to simulate real-time transaction monitoring and customer propensity scoring.'
    ]
  },
  voyage: {
    title: 'Voyage Analytics: Production MLOps in Travel',
    category: 'MLOps & Containerized Infrastructure',
    tagline: 'End-to-end MLOps architecture featuring MLflow tracking, Docker containers, and flight price regression.',
    liveUrl: null,
    demoVideo: null,
    githubUrl: 'https://github.com/abhik99/Voyage-Analytics-Integrating-MLOps-in-Travel',
    meta: {
      role: 'MLOps & Pipeline Engineer',
      stack: 'Docker, Docker Compose, MLflow, Jenkins, Streamlit, Scikit-learn',
      components: 'Model Registry, Artifact Store, Automated CI/CD',
      models: 'Flight Price Regressor + Customer Demographic Classifier'
    },
    overview: `A complete productionized Machine Learning system designed to bridge data modeling with enterprise deployment. Employs containerization and MLflow experiment tracking for continuous model lifecycle management.`,
    deliverables: [
      'Packaged dual predictive models with Joblib and orchestrated microservices with Docker Compose.',
      'Configured MLflow tracking server and metric logging to track hyperparameter tuning and model version artifacts.',
      'Created interactive Streamlit dashboard allowing travel analysts to test dynamic pricing simulations.'
    ]
  },
  retail: {
    title: 'Integrated Retail Analytics for Store Optimization',
    category: 'Business Analytics & Forecasting',
    tagline: 'Comprehensive store sales forecasting, markdown elasticity, and macroeconomic KPI analytics.',
    liveUrl: null,
    demoVideo: null,
    githubUrl: 'https://github.com/abhik99/Integrated-Retail-Analytics-for-Store-Optimization',
    meta: {
      role: 'Data Analyst & Forecasting Specialist',
      stack: 'Python, Pandas, Scikit-learn, Seaborn, Matplotlib, Statistical Modeling',
      dataScope: 'Multi-Store Department Sales, Markdowns, Unemployment, CPI',
      impact: 'Predictive Departmental Inventory Optimization'
    },
    overview: `Analyzes retail performance across 45 department stores, modeling seasonal promotional markdowns, regional Consumer Price Index (CPI), and fuel price fluctuations to optimize inventory.`,
    deliverables: [
      'Performed multi-variable exploratory data analysis evaluating holiday revenue surges versus non-promotional baseline weeks.',
      'Engineered lagged sales indicators and promotional markdown features to build predictive regression models.',
      'Created actionable KPI recommendations for store managers regarding promotional calendar scheduling.'
    ]
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.open-modal-btn');

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projId];
      if (!data) return;

      populateModal(data);
      modalBackdrop?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function populateModal(data) {
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalCategory').textContent = data.category;
  document.getElementById('modalTagline').textContent = data.tagline;
  document.getElementById('modalOverview').textContent = data.overview;

  // Metadata Grid
  const metaGrid = document.getElementById('modalMetaGrid');
  if (metaGrid) {
    metaGrid.innerHTML = Object.entries(data.meta)
      .map(([key, val]) => `
        <div class="modal-meta-item">
          <span class="modal-meta-label">${key}</span>
          <span class="modal-meta-val">${val}</span>
        </div>
      `).join('');
  }

  // Deliverables List
  const delivList = document.getElementById('modalDeliverables');
  if (delivList) {
    delivList.innerHTML = data.deliverables.map(d => `<li>${d}</li>`).join('');
  }

  // Action Buttons
  const modalActions = document.getElementById('modalActions');
  if (modalActions) {
    let html = '';
    if (data.liveUrl) {
      html += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        Visit Live Deployment
      </a>`;
    }
    if (data.demoVideo) {
      html += `<a href="${data.demoVideo}" target="_blank" rel="noopener noreferrer" class="btn btn-emerald btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        Watch Demo Video
      </a>`;
    }
    html += `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      View GitHub Repository
    </a>`;
    modalActions.innerHTML = html;
  }
}

/* ==========================================================================
   7. Contact Interactions & Toast Notifications
   ========================================================================== */
function initContactInteractions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const contactForm = document.getElementById('contactForm');

  copyBtn?.addEventListener('click', () => {
    const email = 'akdevil27boy@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard: ' + email);
    }).catch(() => {
      showToast('Contact: ' + email);
    });
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Direct mailto link fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Abhishek,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:akdevil27boy@gmail.com?subject=${subject}&body=${body}`;

    showToast('Opening your email client to send message...');
    contactForm.reset();
  });
}

function showToast(msg) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

/* ==========================================================================
   8. Skill Progress Bars Animation
   ========================================================================== */
function initSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width') || '85%';
        fill.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => observer.observe(bar));
}
