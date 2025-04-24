const Navigation = () => {
  const navigation: string[] = ["Women", "Men", "Kids"];

  const Link = ({ name }: { name: string }) => {
    return (
      <div className="cursor-pointer hover:border-b border-primary relative flex">
        <button
          type="button"
          className="font-Raleway capitalize relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary"
          aria-expanded="false"
        >
          {name}
        </button>
      </div>
    );
  };

  return (
    <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation.map(name => (
          <Link key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
