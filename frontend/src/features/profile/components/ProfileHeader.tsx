//import DefaultButton from '../../../components/ui/DefaultButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMedal, faCircle } from '@fortawesome/free-solid-svg-icons';
import Card from '../../../components/ui/Card';
import { useParams } from 'react-router-dom';
import { useProfileQuery } from '../api/index';

/**
 * Render the top section of a user's profile.
 *
 * Displays the profile name, an avatar placeholder, a short bio, and the user's rank.
 * While profile data is loading it renders a Card indicating progress; on fetch error it renders an error paragraph.
 *
 * @returns A JSX element containing the profile header, a loading Card, an error message paragraph, or `null` when no profile data is available.
 */

export default function ProfileHeader() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, status, error } = useProfileQuery(username!);

  if (status === 'pending') {
    return <Card title="Fetching username...">Fetching user data…</Card>;
  }
  if (status === 'error') {
    return <p>Could not load profile: {error.message}</p>;
  }
  if (!profile) return null;

  return (
    <Card title={profile.name} icon={<FontAwesomeIcon icon={faCircle} size="xs" />}>
      <section className="grid grid-cols-1 md:grid-cols-6 gap-6 relative overflow-hidden dark:bg-gray-900 bg-stone-50 p-2">
        <div
          className="md:col-span-1 space-y-6 h-32 w-32 flex items-center justify-center 
                          rounded-xl bg-gray-200 dark:bg-gray-800 
                          text-gray-500 dark:text-gray-400"
        >
          <FontAwesomeIcon icon={faUser} size="5x" />
        </div>
        <div className="md:col-span-4 space-y-6">
          <p className="mt-2">Bio section for {profile.name}</p>
        </div>
        <div className="md:col-span-1 space-y-3">
          <h2 className="">
            Rank {profile.rank}
            <FontAwesomeIcon icon={faMedal} className="inline-block ml-1 text-yellow-500" />
          </h2>
          {/* <DefaultButton text="Edit Profile" icon={<FontAwesomeIcon icon={faGear} size="xs" />} />
          <DefaultButton text="Message" icon={<FontAwesomeIcon icon={faComments} size="xs" />} /> */}
        </div>
      </section>
    </Card>
  );
}
