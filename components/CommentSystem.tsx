'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, User, Calendar, ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  timestamp: string;
  likes: number;
  postSlug: string;
}

interface CommentSystemProps {
  postSlug: string;
}

export default function CommentSystem({ postSlug }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [notify, setNotify] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load comments from localStorage on mount
  useEffect(() => {
    const storedComments = localStorage.getItem('blog-comments');
    if (storedComments) {
      try {
        const allComments = JSON.parse(storedComments);
        const postComments = allComments.filter((c: Comment) => c.postSlug === postSlug);
        setComments(postComments);
      } catch (e) {
        console.error('Error loading comments:', e);
      }
    }
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        comment: comment.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        postSlug,
      };

      // Get all comments
      const storedComments = localStorage.getItem('blog-comments');
      const allComments: Comment[] = storedComments ? JSON.parse(storedComments) : [];
      
      // Add new comment
      allComments.push(newComment);
      
      // Save back to localStorage
      localStorage.setItem('blog-comments', JSON.stringify(allComments));
      
      // Update displayed comments
      setComments([newComment, ...comments]);
      
      // Clear form
      setName('');
      setEmail('');
      setComment('');
      setNotify(false);
      
      // Show success message
      setSuccessMessage('Comment posted successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId: string) => {
    const storedComments = localStorage.getItem('blog-comments');
    if (!storedComments) return;

    try {
      const allComments: Comment[] = JSON.parse(storedComments);
      const updatedComments = allComments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      );
      
      localStorage.setItem('blog-comments', JSON.stringify(updatedComments));
      
      const postComments = updatedComments.filter(c => c.postSlug === postSlug);
      setComments(postComments);
    } catch (e) {
      console.error('Error liking comment:', e);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Leave a Comment</h3>
        
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-4 mb-6">
            <p className="text-green-200 text-sm font-medium">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-white/90 mb-2">
              Comment *
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
              placeholder="Share your thoughts, ask questions, or provide feedback..."
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notify"
              name="notify"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-white/10 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="notify" className="ml-2 text-sm text-white/80">
              Notify me of replies to this comment
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      {/* Comments Display */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </h3>
          
          {comments.map((c) => (
            <div 
              key={c.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/10 transition-colors duration-200"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/30 rounded-full flex items-center justify-center border border-primary-500/40">
                    <User className="w-5 h-5 text-primary-300" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(c.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Body */}
              <div className="text-white/90 leading-relaxed mb-4 whitespace-pre-wrap">
                {c.comment}
              </div>

              {/* Comment Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(c.id)}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{c.likes > 0 ? c.likes : 'Like'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-lg border border-white/20">
          <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 text-lg">
            Be the first to comment on this post!
          </p>
        </div>
      )}
    </div>
  );
}

