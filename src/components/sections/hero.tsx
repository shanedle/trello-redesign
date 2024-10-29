import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
};

export const Hero = ({ title, subtitle, imageSrc }: HeroProps) => {
  return (
    <section className="gradient-bg pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
            <div className="lg:py-24">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:mt-6 xl:text-6xl">
                {title}
              </h1>
              <p className="mt-3 text-base text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {subtitle}
              </p>
            </div>
          </div>
          <div className="-mb-16 mt-12 sm:-mb-48 lg:relative lg:m-0">
            <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
              <Image
                src={imageSrc}
                alt="Trello UI Collage"
                width={2720}
                height={2400}
                className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
