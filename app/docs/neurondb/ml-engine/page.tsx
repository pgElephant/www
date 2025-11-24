import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'ML Engine | Machine Learning Suite with ONNX | NeurondB',
  description: 'Comprehensive machine learning suite with classification, regression, clustering, and AutoML capabilities powered by ONNX. Deploy models directly in PostgreSQL for real-time inference, training, and model management.',
  keywords: [
    'ML engine',
    'machine learning PostgreSQL',
    'ONNX inference',
    'classification',
    'regression',
    'clustering',
    'AutoML',
    'in-database ML',
    'model deployment',
    'model management',
    'feature engineering',
    'gradient boosting',
    'random forest',
    'SVM',
    'time series forecasting'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/ml-engine',
  },
  openGraph: {
    title: 'ML Engine | Machine Learning Suite with ONNX',
    description: 'Comprehensive ML capabilities with classification, regression, clustering, and AutoML powered by ONNX.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/ml-engine',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'capabilities', title: 'ML Capabilities' },
  { id: 'onnx-integration', title: 'ONNX Integration' },
  { id: 'model-management', title: 'Model Management' },
  { id: 'use-cases', title: 'Use Cases' },
  { id: 'performance', title: 'Performance' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/vector-engine',
  label: 'Vector Engine',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/embedding-engine',
  label: 'Embedding Engine',
}

export default function MLEnginePage() {
  return (
    <PostgresDocsLayout
      title="ML Engine"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>
          The <strong>ML Engine</strong> provides a comprehensive machine learning suite directly in PostgreSQL, 
          enabling you to train, deploy, and serve ML models without data movement. Powered by ONNX Runtime, 
          the ML Engine supports classification, regression, clustering, and AutoML capabilities with automatic 
          GPU acceleration when available.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>In-Database Training:</strong> Train models directly on PostgreSQL data</li>
          <li><strong>ONNX Model Deployment:</strong> Deploy pre-trained models from PyTorch, TensorFlow, scikit-learn</li>
          <li><strong>Real-Time Inference:</strong> Sub-millisecond predictions with batch processing support</li>
          <li><strong>AutoML:</strong> Automated hyperparameter tuning and model selection</li>
          <li><strong>Model Versioning:</strong> A/B testing, rollback, and model lifecycle management</li>
          <li><strong>GPU Acceleration:</strong> Automatic GPU offload for ONNX models with CUDA/ROCm support</li>
        </ul>

        <h3>Supported Algorithms</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Algorithms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Classification</td>
              <td>Random Forest, Gradient Boosting, SVM, Logistic Regression, Neural Networks</td>
            </tr>
            <tr>
              <td>Regression</td>
              <td>Linear Regression, Ridge, Lasso, Gradient Boosting, Random Forest</td>
            </tr>
            <tr>
              <td>Clustering</td>
              <td>K-Means, DBSCAN, Hierarchical Clustering</td>
            </tr>
            <tr>
              <td>Time Series</td>
              <td>ARIMA, Prophet, LSTM, GRU</td>
            </tr>
            <tr>
              <td>Dimensionality Reduction</td>
              <td>PCA, t-SNE, UMAP</td>
            </tr>
            <tr>
              <td>Anomaly Detection</td>
              <td>Isolation Forest, One-Class SVM, Autoencoders</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="capabilities">
        <h2>ML Capabilities</h2>

        <h3>Classification</h3>
        <p>
          Build classification models for binary and multi-class problems. Supports various algorithms including 
          Random Forest, Gradient Boosting, SVM, and neural networks.
        </p>
        <SqlCodeBlock
          title="Train and use classification model"
          code={`-- Train a Random Forest classifier
SELECT train_random_forest_classifier(
  table_name => 'customer_data',
  features_col => 'features',
  label_col => 'churn_label',
  n_trees => 100,
  max_depth => 10
);

-- Make predictions
SELECT 
  customer_id,
  predict_classification('customer_churn_model', features) AS predicted_churn,
  predict_classification_proba('customer_churn_model', features) AS probabilities
FROM customer_data
WHERE created_at > NOW() - INTERVAL '30 days';`}
        />

        <h3>Regression</h3>
        <p>
          Predict continuous values using regression models. Ideal for forecasting, price prediction, and 
          numerical value estimation.
        </p>
        <SqlCodeBlock
          title="Train and use regression model"
          code={`-- Train a gradient boosting regressor
SELECT train_gradient_boosting_regressor(
  table_name => 'sales_data',
  features_col => 'features',
  target_col => 'revenue',
  n_estimators => 200,
  learning_rate => 0.1
);

-- Predict revenue
SELECT 
  product_id,
  predict_regression('revenue_model', features) AS predicted_revenue
FROM products
WHERE category = 'electronics';`}
        />

        <h3>Clustering</h3>
        <p>
          Group similar data points together using clustering algorithms. Useful for customer segmentation, 
          anomaly detection, and data exploration.
        </p>
        <SqlCodeBlock
          title="K-means clustering"
          code={`-- Perform K-means clustering
SELECT cluster_kmeans(
  table_name => 'customer_features',
  vector_column => 'embedding',
  k => 5,
  max_iter => 100
);

-- Assign cluster labels
SELECT 
  customer_id,
  assign_cluster('customer_segments', embedding) AS cluster_id
FROM customers;`}
        />

        <h3>AutoML</h3>
        <p>
          Automatically select the best model and hyperparameters for your dataset. Saves time and improves 
          model performance through systematic search.
        </p>
        <SqlCodeBlock
          title="AutoML training"
          code={`-- Run AutoML for classification
SELECT automl_classify(
  table_name => 'training_data',
  features_col => 'features',
  label_col => 'target',
  max_trials => 50,
  time_budget_seconds => 3600
);

-- Best model is automatically selected and deployed
SELECT predict_classification('automl_best_model', features)
FROM test_data;`}
        />

        <h3>Feature Engineering</h3>
        <p>
          Built-in feature engineering capabilities including scaling, normalization, encoding, and feature selection.
        </p>
        <SqlCodeBlock
          title="Feature engineering"
          code={`-- Create feature store
CREATE TABLE feature_store AS
SELECT 
  customer_id,
  neurondb_normalize_features(
    ARRAY[
      age,
      purchase_frequency,
      avg_order_value,
      days_since_last_purchase
    ]
  ) AS features
FROM customers;

-- Use features for training
SELECT train_random_forest_classifier(
  'feature_store',
  'features',
  'churn_label'
);`}
        />
      </section>

      <section id="onnx-integration">
        <h2>ONNX Integration</h2>
        <p>
          Deploy models trained in PyTorch, TensorFlow, scikit-learn, or any ONNX-compatible framework directly 
          in PostgreSQL. ONNX Runtime provides optimized inference with automatic GPU acceleration.
        </p>

        <h3>Deploying ONNX Models</h3>
        <SqlCodeBlock
          title="Deploy ONNX model"
          code={`-- Deploy a pre-trained ONNX model
SELECT deploy_onnx_model(
  model_name => 'sentiment_classifier',
  model_path => '/path/to/model.onnx',
  input_shape => ARRAY[1, 768],
  output_shape => ARRAY[1, 2],
  gpu_enabled => true
);

-- Use the model for inference
SELECT 
  text_id,
  predict_onnx('sentiment_classifier', embedding) AS sentiment_score
FROM text_data;`}
        />

        <h3>Model Conversion</h3>
        <p>
          Convert models from popular frameworks to ONNX format:
        </p>
        <ul>
          <li><strong>PyTorch:</strong> <code>torch.onnx.export()</code></li>
          <li><strong>TensorFlow:</strong> <code>tf2onnx.convert</code></li>
          <li><strong>scikit-learn:</strong> <code>skl2onnx.convert_sklearn()</code></li>
          <li><strong>Keras:</strong> <code>keras2onnx.convert_keras()</code></li>
        </ul>

        <h3>GPU Acceleration</h3>
        <p>
          ONNX Runtime automatically uses GPU execution providers (CUDA, ROCm, TensorRT) when available, 
          providing 10-50x speedup for deep learning models.
        </p>
        <SqlCodeBlock
          title="GPU-accelerated inference"
          code={`-- Enable GPU for ONNX models
SET neurondb.gpu_enabled = on;
SET neurondb.gpu_device = 0;

-- Deploy with GPU support
SELECT deploy_onnx_model(
  'image_classifier',
  '/path/to/resnet50.onnx',
  gpu_enabled => true,
  execution_provider => 'CUDAExecutionProvider'
);

-- Batch inference with GPU
SELECT predict_onnx_batch('image_classifier', image_embeddings)
FROM images
WHERE batch_id = 123;`}
        />
      </section>

      <section id="model-management">
        <h2>Model Management</h2>

        <h3>Model Versioning</h3>
        <p>
          Track model versions, compare performance, and rollback to previous versions when needed.
        </p>
        <SqlCodeBlock
          title="Model versioning"
          code={`-- Deploy new model version
SELECT deploy_model_version(
  model_name => 'churn_predictor',
  version => 'v2.1',
  model_path => '/path/to/v2.1.onnx',
  metadata => '{"accuracy": 0.94, "f1_score": 0.91}'::jsonb
);

-- List all versions
SELECT * FROM neurondb_model_versions
WHERE model_name = 'churn_predictor'
ORDER BY created_at DESC;

-- Rollback to previous version
SELECT set_model_version('churn_predictor', 'v2.0');`}
        />

        <h3>A/B Testing</h3>
        <p>
          Test multiple model versions simultaneously and route traffic based on performance metrics.
        </p>
        <SqlCodeBlock
          title="A/B testing"
          code={`-- Set up A/B test
SELECT setup_ab_test(
  model_name => 'recommendation_engine',
  variant_a => 'v1.0',
  variant_b => 'v2.0',
  traffic_split => 0.5  -- 50/50 split
);

-- Models automatically route based on configuration
SELECT predict_classification('recommendation_engine', features)
FROM user_interactions;`}
        />

        <h3>Model Monitoring</h3>
        <p>
          Monitor model performance, track predictions, and detect data drift.
        </p>
        <SqlCodeBlock
          title="Model monitoring"
          code={`-- Track predictions
SELECT log_prediction(
  model_name => 'fraud_detector',
  input_features => features,
  prediction => predicted_label,
  actual_label => actual_label
);

-- Check model performance
SELECT 
  model_name,
  accuracy,
  precision,
  recall,
  f1_score,
  prediction_count
FROM neurondb_model_metrics
WHERE model_name = 'fraud_detector'
  AND date >= CURRENT_DATE - INTERVAL '7 days';

-- Detect data drift
SELECT detect_data_drift(
  model_name => 'fraud_detector',
  reference_data => 'training_data',
  current_data => 'recent_predictions'
);`}
        />
      </section>

      <section id="use-cases">
        <h2>Use Cases</h2>

        <h3>Fraud Detection</h3>
        <p>
          Real-time fraud detection with classification models, analyzing transaction features in milliseconds.
        </p>

        <h3>Customer Churn Prediction</h3>
        <p>
          Predict which customers are likely to churn using behavioral features and engagement metrics.
        </p>

        <h3>Recommendation Systems</h3>
        <p>
          Build collaborative filtering and content-based recommendation systems using clustering and similarity search.
        </p>

        <h3>Time Series Forecasting</h3>
        <p>
          Predict future values for sales, demand, or metrics using time series models.
        </p>

        <h3>Anomaly Detection</h3>
        <p>
          Identify outliers and anomalies in system metrics, transactions, or user behavior.
        </p>

        <h3>Natural Language Processing</h3>
        <p>
          Deploy transformer models for sentiment analysis, text classification, and named entity recognition.
        </p>
      </section>

      <section id="performance">
        <h2>Performance</h2>

        <h3>Inference Latency</h3>
        <ul>
          <li><strong>Simple Models (RF, GB):</strong> 0.1-0.5ms per prediction</li>
          <li><strong>Neural Networks (CPU):</strong> 1-5ms per prediction</li>
          <li><strong>Neural Networks (GPU):</strong> 0.1-1ms per prediction</li>
          <li><strong>Batch Inference:</strong> 10-100x throughput improvement</li>
        </ul>

        <h3>Training Performance</h3>
        <ul>
          <li><strong>Random Forest (1M rows):</strong> 30-60 seconds</li>
          <li><strong>Gradient Boosting (1M rows):</strong> 2-5 minutes</li>
          <li><strong>K-Means (1M vectors):</strong> 10-30 seconds (GPU: 3-10 seconds)</li>
          <li><strong>AutoML (50 trials):</strong> 30-60 minutes</li>
        </ul>

        <h3>Optimization Tips</h3>
        <ul>
          <li>Use batch inference for high-throughput scenarios</li>
          <li>Enable GPU acceleration for deep learning models</li>
          <li>Cache frequently used models in memory</li>
          <li>Use feature stores to avoid redundant computation</li>
          <li>Monitor model performance and retrain when accuracy degrades</li>
        </ul>
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><a href="/docs/neurondb/ml">ML Overview</a> - Complete ML capabilities guide</li>
          <li><a href="/docs/neurondb/ml/classification">Classification</a> - Classification algorithms and examples</li>
          <li><a href="/docs/neurondb/ml/regression">Regression</a> - Regression models and forecasting</li>
          <li><a href="/docs/neurondb/ml/clustering">Clustering</a> - Clustering algorithms and use cases</li>
          <li><a href="/docs/neurondb/ml/inference">Inference</a> - ONNX model deployment and inference</li>
          <li><a href="/docs/neurondb/ml/model-management">Model Management</a> - Versioning, A/B testing, monitoring</li>
          <li><a href="/docs/neurondb/ml/hyperparameter-tuning">Hyperparameter Tuning</a> - AutoML and optimization</li>
          <li><a href="/docs/neurondb/gpu">GPU Acceleration</a> - Accelerate ML with GPU</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}


