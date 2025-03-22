import { Box, useColorModeValue } from "@hope-ui/solid"
import CornerBottom from "./CornerBottom"
import CornerTop from "./CornerTop"

const LoginBg = () => {
  const overlayColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(0, 0, 0, 0.35)")
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="-1"
      w="100vw"
      h="100vh"
      style={{
        "background-image": "url('/images/login-bg.jpg')",
        "background-size": "cover",
        "background-position": "center",
      }}
    >
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgColor={overlayColor()}
      />
      <Box
        pos="absolute"
        right={{
          "@initial": "-100px",
          "@sm": "-300px",
        }}
        top={{
          "@initial": "-1170px",
          "@sm": "-900px",
        }}
      >
        <CornerTop />
      </Box>
      <Box
        pos="absolute"
        left={{
          "@initial": "-100px",
          "@sm": "-200px",
        }}
        bottom={{
          "@initial": "-760px",
          "@sm": "-400px",
        }}
      >
        <CornerBottom />
      </Box>
    </Box>
  )
}

export default LoginBg
