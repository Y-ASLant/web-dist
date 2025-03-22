import { createLocalStorage } from "@solid-primitives/storage"
import { isMobile } from "~/utils/compatibility"

const [local, setLocal, { remove, clear, toJSON }] = createLocalStorage()

export const initialLocalSettings = [
  {
    key: "global_default_layout",
    default: "list",
    type: "select",
    options: ["list", "grid", "image"],
  },
  {
    key: "show_folder_in_image_view",
    default: "top",
    type: "select",
    options: ["top", "bottom", "none"],
  },
  {
    key: "show_sidebar",
    default: "none",
    type: "select",
    options: ["none", "visible"],
  },
  {
    key: "position_of_header_navbar",
    default: "static",
    type: "select",
    options: ["static", "sticky", "only_navbar_sticky"],
  },
  {
    key: "list_item_filename_overflow",
    default: "ellipsis",
    type: "select",
    options: ["ellipsis", "scrollable", "multi_line"],
  },
]

export type LocalSetting = (typeof initialLocalSettings)[number]
for (const setting of initialLocalSettings) {
  if (!local[setting.key]) {
    setLocal(setting.key, setting.default)
  }
}

export { local, setLocal, remove, clear, toJSON }