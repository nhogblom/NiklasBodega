import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar.tsx';
import LoadingMessage from '../components/LoadingMessage.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import { useAuth } from '../hooks/useAuth.tsx';
import {
  getUserInformation,
  updateUserInformation,
} from '../api/UserApiService.ts';
import type { UserInformation } from '../types/User.ts';
import {
  type UserSettingsFormData,
  userSettingsSchema,
} from '../utils/ValidationUtils.ts';

const UserSettingsPage = () => {
  const { login } = useAuth();
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
    },
  });

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const currentUserInformation = await getUserInformation();
        setUserInformation(currentUserInformation);
      } catch {
        setError('Failed loading user settings.');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserInformation();
  }, []);

  const onSubmit = async (data: UserSettingsFormData) => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    const updatedUser = {
      email: data.email || undefined,
      name: data.name || undefined,
      password: data.password || undefined,
    };

    try {
      await updateUserInformation(updatedUser);

      const updatedUserInformation = await getUserInformation();
      setUserInformation(updatedUserInformation);
      login(updatedUserInformation.email);
      reset();
      setSuccess('Your settings were updated.');
    } catch {
      setError('Failed to update user settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loadingUser) return <LoadingMessage message={'Loading user settings...'} />;

  if (!userInformation) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <ErrorMessage message={error ?? 'Failed loading user settings.'} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-orange-900 font-bold mb-2">
            Account
          </p>
          <h1 className="text-3xl font-serif text-stone-900">
            User settings
          </h1>
          <p className="text-sm text-stone-500 mt-2">
            Update only the details you want to change.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-stone-200 rounded-lg shadow-sm p-8"
          >
            {errors.root && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 py-2 px-3 rounded">
                {errors.root.message}
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 py-2 px-3 rounded">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-700 text-sm mb-4 bg-green-50 py-2 px-3 rounded">
                {success}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="text"
                  placeholder={userInformation.email}
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  Full name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={userInformation.name}
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  New password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
                  Confirm password
                </label>
                <input
                  {...register('passwordConfirm')}
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto bg-orange-900 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>

          <aside className="bg-white border border-stone-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-serif text-stone-900 mb-4">
              Current information
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Email
                </dt>
                <dd className="text-stone-800 mt-1 break-words">
                  {userInformation.email}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Full name
                </dt>
                <dd className="text-stone-800 mt-1 break-words">
                  {userInformation.name}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Customer since
                </dt>
                <dd className="text-stone-800 mt-1">
                  {new Date(userInformation.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UserSettingsPage;
