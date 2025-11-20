import React from 'react';

export default function PostRelatedPosts() {
  const related = [
    { id: 1, title: 'Min bæver vil ikke spise cocopops' },
    { id: 2, title: 'Peters kaffe smager af yoghurt' },
    { id: 3, title: 'Burak er en god fyr' },
  ];

  return (
    <section className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
      <h3 className="text-lg font-semibold mb-3">Relaterede indlæg</h3>
      <ul className="space-y-2">
        {related.map((r) => (
          <li key={r.id} className="text-sky-600 hover:underline cursor-pointer">
            {r.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
