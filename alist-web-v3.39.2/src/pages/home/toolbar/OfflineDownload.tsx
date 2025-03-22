import { Box, createDisclosure } from "@hope-ui/solid"
import { ModalInput, SelectWrapper } from "~/components"
import { useFetch, useRouter, useT } from "~/hooks"
import {
  offlineDownload,
  bus,
  handleRespWithNotifySuccess,
  r,
  handleResp,
} from "~/utils"
import { createSignal, onCleanup, onMount } from "solid-js"
import { PResp } from "~/types"

const deletePolicies = [
  "delete_on_upload_succeed",
  "delete_on_upload_failed",
  "delete_never",
  "delete_always",
] as const

type DeletePolicy = (typeof deletePolicies)[number]

export const OfflineDownload = () => {
  const t = useT()
  const [tools, setTools] = createSignal([] as string[])
  const [toolsLoading, reqTool] = useFetch((): PResp<string[]> => {
    return r.get("/public/offline_download_tools")
  })
  const [tool, setTool] = createSignal("")

  // 修改 "115 Cloud" 为 "BT" 和 "SimpleHttp" 为 "URL直链"
  const [deletePolicy, setDeletePolicy] = createSignal<DeletePolicy>(
    "delete_on_upload_succeed",
  )
  onMount(async () => {
    const resp = await reqTool()
    handleResp(resp, (data) => {
      // 修改 "115 Cloud" 为 "BT" 和 "SimpleHttp" 为 "URL直链"
      // 同时过滤掉 "transmission" 和 "qBittorrent"
      const modifiedData = data
        .filter(tool => tool !== "transmission" && tool !== "qBittorrent" && tool !== "pikpak")
        .map(tool => tool === "115 Cloud" ? "Bittorrent OR 磁链" : tool === "SimpleHttp" ? "URL直链" : tool);
      setTools(modifiedData)
      setTool(modifiedData[0])
    })
  })

  const { isOpen, onOpen, onClose } = createDisclosure()
  const [loading, ok] = useFetch(offlineDownload)
  const { pathname } = useRouter()
  const handler = (name: string) => {
    if (name === "offline_download") {
      onOpen()
    }
  }
  bus.on("tool", handler)
  onCleanup(() => {
    bus.off("tool", handler)
  })
  return (
    <ModalInput
      title="home.toolbar.offline_download"
      type="text"
      opened={isOpen()}
      onClose={onClose}
      loading={toolsLoading() || loading()}
      tips={t("home.toolbar.offline_download-tips")}
      topSlot={
        <Box mb="$2">
          <SelectWrapper
            value={tool()}
            onChange={(v) => setTool(v)}
            options={tools().map((tool) => {
              // 修改 "115 Cloud" 为 "BT" 和 "SimpleHttp" 为 "URL直链"
              const label = tool === "115 Cloud" ? "BT" : tool === "SimpleHttp" ? "URL直链" : tool;
              return { value: tool, label: label }
            })}
          />
        </Box>
      }
      bottomSlot={
        <Box mb="$2">
          <SelectWrapper
            value={deletePolicy()}
            onChange={(v) => setDeletePolicy(v as DeletePolicy)}
            options={deletePolicies.map((policy) => {
              return {
                value: policy,
                label: t(`home.toolbar.delete_policy.${policy}`),
              }
            })}
          />
        </Box>
      }
      onSubmit={async (urls) => {
        const resp = await ok(
          pathname(),
          urls.split("\n"),
          tool(),
          deletePolicy(),
        )
        handleRespWithNotifySuccess(resp, () => {
          onClose()
        })
      }}
    />
  )
}