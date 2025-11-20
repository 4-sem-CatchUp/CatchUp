import React, { useState } from 'react';

export default function PostCommentSection() {
  type Comment = {
    id: number;
    author: string;
    text: string;
    date: Date;
  };

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Kenneth', text: 'Hej!', date: new Date('2025-11-05T14:30:00') },
    { id: 2, author: 'Burak', text: 'Lækkert UI! (jeg har lavet det)', date: new Date('2025-11-05T15:00:00') },
  ]);
  const [newComment, setNewComment] = useState('');

  function handleSubmit(e: any) {
    if (newComment.trim().length <= 0) return;
    e.preventDefault();
    const newCommentObject: Comment = { id: comments.length + 1, author: 'Dig', text: newComment, date: new Date() };
    setComments([...comments, newCommentObject]);
    setNewComment('');
  }

  function onChange(e: any) {
    setNewComment(e.target.value);
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Kommentarer</h2>
      {comments.map((c) => (
        <div
          key={c.id}
          className="flex gap-4 p-3 border dark:border-gray-800 rounded-sm bg-white dark:bg-gray-900 shadow-sm"
        >
          {/* Avatar */}
          <div className="flex-none rounded-full size-12 bg-sky-600 text-white flex items-center justify-center font-bold">
            {c.author.charAt(0)}
          </div>

          {/* Tekstindhold */}
          <div className="flex-1 min-w-0">
            {/* Header: navn + dato/tid */}
            <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-400">
              <span className="font-medium text-gray-200 dark:text-gray-100">{c.author}</span>
              <span>
                {c.date.toLocaleDateString('da-DK')} ·{' '}
                {c.date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Kommentar-tekst */}
            <p className="mt-1 break-words text-gray-100">{c.text}</p>
          </div>
        </div>
      ))}
      <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
        <input
          value={newComment}
          onChange={onChange}
          placeholder="Skriv en kommentar..."
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
        />
        <button>Tilføj kommentar</button>
      </form>
    </section>
  );
}
