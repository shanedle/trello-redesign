type CTAProps = {
  title: string;
  subtitle: string;
};

export const CallToAction = ({ title, subtitle }: CTAProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="gradient-bg rounded-3xl px-6 py-10 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-primary-100">{subtitle}</p>
        </div>
        <div className="mt-12 sm:w-full sm:max-w-md lg:ml-8 lg:mt-0 lg:flex-1">
          <form onSubmit={handleSubmit} className="sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
              placeholder="Email"
            />
            <button
              type="submit"
              className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-3 text-base font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0"
            >
              Sign up - it's free!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
