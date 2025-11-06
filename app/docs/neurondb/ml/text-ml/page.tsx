export const metadata = {
  title: 'NeuronDB · Text ML (Classification, Sentiment, NER, Summarization)',
  description: 'Run classic text ML tasks in SQL using NeuronDB utilities and pipelines.'
}

import React from 'react'
import Link from 'next/link'
import { MessageSquareText, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 text-transparent bg-clip-text flex items-center gap-3">
          <MessageSquareText className="w-10 h-10 text-lime-400" /> Text ML
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Classification, sentiment analysis, NER, and summarization—all from SQL.
        </p>

        {/* TEXT CLASSIFICATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-lime-400">Text Classification</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-lime-400" />
                Classify Text Documents
              </h3>
              <p className="text-gray-300 mb-4">
                Categorize text into predefined classes using trained classification models.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH text_samples AS (
    SELECT 'This product is amazing! Best purchase ever.' as text, 1 as sample_id
    UNION ALL
    SELECT 'Terrible experience, would not recommend.' as text, 2 as sample_id
    UNION ALL
    SELECT 'Average product, nothing special.' as text, 3 as sample_id
)
SELECT 
    sample_id,
    substring(text, 1, 40) || '...' as text_preview,
    'Sentiment Classification' as expected_category
FROM text_samples;

-- Full implementation would use neurondb.text_classify()
-- with trained text classification model`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* SENTIMENT ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Sentiment Analysis</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Analyze Text Sentiment
              </h3>
              <p className="text-gray-300 mb-4">
                Detect positive, negative, or neutral sentiment in text with confidence scores.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH reviews AS (
    SELECT 'I love this product! It exceeded all my expectations.' as review, 1 as review_id
    UNION ALL
    SELECT 'This is the worst purchase I have ever made.' as review, 2 as review_id
    UNION ALL
    SELECT 'The product is okay, meets basic requirements.' as review, 3 as review_id
)
SELECT 
    review_id,
    substring(review, 1, 50) || '...' as review_text,
    CASE 
        WHEN review LIKE '%love%' OR review LIKE '%exceeded%' THEN 'Positive (0.90)'
        WHEN review LIKE '%worst%' THEN 'Negative (0.85)'
        ELSE 'Neutral (0.70)'
    END as sentiment_demo
FROM reviews;

-- Output:
-- review_id | review_text                                    | sentiment_demo
-- ----------+------------------------------------------------+----------------
--         1 | I love this product! It exceeded all my exp... | Positive (0.90)
--         2 | This is the worst purchase I have ever made... | Negative (0.85)
--         3 | The product is okay, meets basic requirement... | Neutral (0.70)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* NAMED ENTITY RECOGNITION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Named Entity Recognition (NER)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Extract Entities from Text
              </h3>
              <p className="text-gray-300 mb-4">
                Identify and extract named entities like organizations, locations, dates, and people.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH text_with_entities AS (
    SELECT 'Apple Inc. announced new products in Cupertino on Monday.' as text
    UNION ALL
    SELECT 'The meeting with John Smith at Microsoft headquarters was productive.' as text
    UNION ALL
    SELECT 'Amazon opened a new facility in Seattle last week.' as text
)
SELECT 
    text,
    'Would extract: ORG, LOC, DATE entities' as ner_note
FROM text_with_entities;

-- Full NER implementation would extract:
-- • ORG (Organization): Apple Inc., Microsoft, Amazon
-- • LOC (Location): Cupertino, Seattle
-- • DATE: Monday, last week
-- • PERSON: John Smith`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* TEXT SUMMARIZATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Text Summarization</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`WITH long_article AS (
    SELECT 
        'Machine learning in databases has revolutionized data analytics. ' ||
        'PostgreSQL extensions now enable advanced ML capabilities directly in SQL. ' ||
        'NeuronDB provides comprehensive ML algorithms including classification, regression, and clustering. ' ||
        'The integration of vector search with HNSW indexes enables semantic similarity searches. ' ||
        'RAG pipelines combine retrieval and generation for powerful AI applications.' as article
)
SELECT 
    length(article) as original_length,
    'Machine learning in databases has revolutionized data analytics with PostgreSQL extensions enabling advanced ML capabilities.' as summary_example,
    128 as summary_max_length
FROM long_article;

-- Summarization reduces long text to key points
-- • Extractive: Select important sentences
-- • Abstractive: Generate new summary text`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* TEXT PREPROCESSING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Text Preprocessing Pipeline</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create text corpus
CREATE TEMP TABLE text_corpus AS
SELECT 
    i as doc_id,
    'Sample document ' || i || ' with various content about machine learning, databases, and AI.' as content
FROM generate_series(1, 100) i;

-- Text corpus created: 100 documents`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Preprocessing Stages</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SELECT 
    stage,
    description,
    output_example
FROM (VALUES
    (1, 'Tokenization', 'Split text into words/tokens'),
    (2, 'Lowercasing', 'Convert to lowercase'),
    (3, 'Stop word removal', 'Remove common words (the, is, at, etc.)'),
    (4, 'Stemming/Lemmatization', 'Reduce words to root form'),
    (5, 'TF-IDF Vectorization', 'Convert to numerical vectors'),
    (6, 'Classification', 'Apply trained text classifier')
) as pipeline(stage, description, output_example);

-- Preprocessing Pipeline:
-- 1. Raw text → Tokens
-- 2. "Machine Learning" → "machine learning"
-- 3. Remove "the", "is", "a", "an"
-- 4. "running" → "run", "better" → "good"
-- 5. Text → [0.23, 0.56, 0.12, ...]
-- 6. Vector → Predicted class`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL File
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/022_text_ml.sql</code>
          </div>
        </section>
      </div>
    </div>
  )
}
