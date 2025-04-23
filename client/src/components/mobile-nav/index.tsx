import { Dispatch, SetStateAction } from "react";
import CloseMenuIcon from "../../assets/close-menu";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const MobileNav = ({ open, setOpen }: Props) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transition-transform duration-300 ease-in-out transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-40 flex">
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
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

            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div
                  className="-mb-px flex space-x-8 px-4"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <button
                    id="tabs-1-tab-1"
                    className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    Women
                  </button>
                  <button
                    id="tabs-1-tab-2"
                    className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900"
                    aria-controls="tabs-1-panel-2"
                    role="tab"
                    type="button"
                  >
                    Men
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
