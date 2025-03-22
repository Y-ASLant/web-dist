import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@hope-ui/solid"
import { LinkWithBase } from "~/components"
import { usePath, useRouter, useT } from "~/hooks"
import { password, setPassword } from "~/store"

const Password = () => {
  const t = useT()
  const { refresh } = usePath()
  const { back } = useRouter()
  return (
    <VStack
      w={{
        "@initial": "$full",
        "@md": "$lg",
      }}
      p="$8"
      spacing="$3"
      alignItems="center"
    >
      <Heading>{t("home.input_password")}</Heading>
      <Input
        type="password"
        value={password()}
        background={useColorModeValue("$neutral3", "$neutral2")()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            refresh(true)
          }
        }}
        onInput={(e) => setPassword(e.currentTarget.value)}
      />
      <HStack w="$full" justifyContent="center" spacing="$2">
        <Button
          colorScheme="neutral"
          onClick={back}
          flex="1" // 使按钮占据一半的空间
        >
          {t("global.back")}
        </Button>
        <Button
          onClick={() => refresh(true)}
          flex="1" // 使按钮占据一半的空间
        >
          {t("global.ok")}
        </Button>
      </HStack>
    </VStack>
  )
}
export default Password