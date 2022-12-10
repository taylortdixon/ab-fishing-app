import TroutIcon from "../../static/trout.svg";
import WalleyeIcon from "../../static/walleye.svg";
import PerchIcon from "../../static/perch.svg";
import PikeIcon from "../../static/pike.svg";
import BurbotIcon from "../../static/burbot.svg";
import FishIcon from "../../static/fish.svg";
import WhitefishIcon from "../../static/whitefish.svg";
import { FishLimit } from "../../../regulations/waterbody.type";
import { SvgProps } from "react-native-svg";

export const fishLimitsIconMap: Record<FishLimit, React.FC<SvgProps>> = {
  brook_trout: TroutIcon,
  burbot: BurbotIcon,
  cisco: FishIcon,
  cutthroat_trout: TroutIcon,
  dolly_varden: TroutIcon,
  goldeye: FishIcon,
  lake_trout: TroutIcon,
  lake_whitefish: WhitefishIcon,
  mountain_whitefish: WhitefishIcon,
  northern_pike: PikeIcon,
  rainbow_trout: TroutIcon,
  trout_total: TroutIcon,
  walleye: WalleyeIcon,
  walleye_sauger: WalleyeIcon,
  yellow_perch: PerchIcon,
};
