type Feature = {
  icon: string;
  title: string;
  description: string;
};

type FeaturesProps = {
  features: Feature[];
};

export const Features = ({ features }: FeaturesProps) => {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Features</h2>
        <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <dt>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white">
                  <i className={`bi bi-${feature.icon} section-icon`}></i>
                </div>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight">
                  {feature.title}
                </p>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
