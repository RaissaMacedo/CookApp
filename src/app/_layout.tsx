import { Slot } from "expo-router";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium
} from "@expo-google-fonts/poppins"

// SLot:  pega todas as rotas disponivel na pasta app
export default function Layout() {
const [fontLoaded] =  useFonts({ // hook para carregar as fontes
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  })
  if (!fontLoaded) {
    return
  }
  return (
  fontLoaded ?  <Slot/> : null
  )
}