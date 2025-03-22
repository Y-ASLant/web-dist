import { Box, useColorModeValue } from "@hope-ui/solid"
// 移除这两行引入
// import CornerBottom from "./CornerBottom"
// import CornerTop from "./CornerTop"

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
      {/* 移除以下两个 Box 组件
      <Box>
        <CornerTop />
      </Box>
      <Box>
        <CornerBottom />
      </Box>
      */}
    </Box>
  )
}

export default LoginBg
