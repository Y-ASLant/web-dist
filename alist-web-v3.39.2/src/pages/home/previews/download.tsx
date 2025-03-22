import { Button, HStack } from "@hope-ui/solid"
import { useT } from "~/hooks"
import { objStore } from "~/store"
import { FileInfo } from "./info"

export const Download = () => {
  const t = useT()
  return (
    <FileInfo>
      <HStack spacing="$2" justifyContent="center" w="150%">
        <Button
          as="a"
          href={objStore.raw_url}
          target="_blank"
          colorScheme="accent"
          w="full" // 设置按钮宽度为100%
        >
          {t("home.preview.download")}
        </Button>
      </HStack>
    </FileInfo>
  )
}

export default Download