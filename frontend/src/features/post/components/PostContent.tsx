import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import DefaultButton from '../../../components/ui/DefaultButton';
import { Link } from 'react-router-dom';

interface PostContentProps {
  title: string;
  profileImg: string;
  profileName: string;
  sub?: string;
  date?: string;
  featuredImg?: string;
  postText: string;
  upvotes?: number;
  downvotes?: number;
  commentCount?: number;
}

export default function PostContent({
  title,
  profileImg,
  profileName,
  sub,
  date,
  featuredImg,
  postText,
  upvotes,
  downvotes,
  commentCount,
}: PostContentProps) {
  const dateLabel = date ? new Date(date).toLocaleDateString('da-DK') : '';

  return (
    <article className="rounded-sm border dark:border-gray-800 bg-stone-50 dark:bg-gray-900 shadow-sm">
      {/* Header: Titel + breadcrumbs */}
      <div className="bg-gray-800 text-stone-50 p-4 rounded-t-sm flex justify-between items-center">
        <h1 className="text-lg font-semibold">{title}</h1>
        <nav className="text-sm text-gray-400">Forside / Feed / {title}</nav>
      </div>

      {/* Profil + Interaktioner */}
      <div className="p-4 flex flex-wrap justify-between items-center gap-4 border-b dark:border-gray-800">
        <div className="flex gap-4 items-center">
          <img
            src={profileImg}
            alt={profileName}
            className="rounded-full size-16 border-2 border-sky-500 object-cover"
          />
          <div>
            <p className="font-medium">{profileName}</p>
            {sub && <p className="text-sm text-gray-500">{sub}</p>}
            {date && (
              <p className="text-sm text-gray-500">
                <time dateTime={date}>{dateLabel}</time>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faArrowUp} /> {upvotes}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faArrowDown} /> {downvotes}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faComment} /> {commentCount}
          </span>
          <Link to="/">
            <DefaultButton text="Tilbage til feed" />
          </Link>
        </div>
      </div>

      {/* Billede + Tekst */}
      {featuredImg && (
        <img
          src={featuredImg}
          alt=""
          className="w-full max-h-[400px] object-cover border-b dark:border-gray-800"
        />
      )}

      <div className="p-4 text-base leading-relaxed">
        <p>{postText}</p>
      </div>
    </article>
  );
}
