import { Dispatch, SetStateAction, useRef } from "react";
import { CloseMenuIcon } from "../../icons";
import classNames from "classnames";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { CategoryNav } from "../navigation";
import { Category } from "../../../helpers/types";
import { useQuery, gql } from "@apollo/client";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const Sidebar = ({ open, setOpen }: Props) => {
  const CloseMenu = ({
    setOpen,
  }: {
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <div className="flex px-4 pt-5 pb-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Close menu</span>
          <CloseMenuIcon className="size-6" />
        </button>
      </div>
    );
  };

  // const { filter, updatedFilters } = useProductFilters();

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(sidebarRef, () => setOpen(false));

  const CATEGORIES_QUERY = gql`
    {
      categories {
        id
        name
      }
    }
  `;

  const { data } = useQuery(CATEGORIES_QUERY);

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out",
          { "opacity-100": open, "opacity-0 pointer-events-none": !open }
        )}
        aria-hidden="true"
      />
      <span className="sr-only">mobile navbar view</span>
      <div
        ref={sidebarRef}
        className={classNames(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white transition-transform duration-300 ease-in-out transform lg:hidden",
          { "translate-x-0": open, "-translate-x-full": !open }
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-40 flex">
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <CloseMenu setOpen={setOpen} />
            <div className="mt-2">
              <div>
                <div
                  className="flex flex-col px-4 space-y-2"
                  aria-orientation="vertical"
                >
                  {data?.categories?.map(({ id, name }: Category) => (
                    <CategoryNav key={id} category={name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
